import { Component } from "react";
import { Button, Input } from "antd";
import { getCars, rentCar, getUser, createCar } from "../../contract/helper";
import './style.css';

class Rent extends Component {

  constructor() {
    super();
    this.state = {
      cars: [],
      role: 0,
      createCarMileage: '',
      createCarModel: '',
    };
  }

  async componentDidMount() {
    const cars = await getCars();
    this.setState({ cars });
    const address = localStorage.getItem('address');
    const user = await getUser(address);
    console.log(user);
    const { role } = user;
    this.setState({role});
  }

  rentCar = async (idCar) => {
    const address = localStorage.getItem('address');
    await rentCar(address, idCar);
    const cars = await getCars();
    this.setState({ cars });
  }

  createCar = async() => {
    const address = localStorage.getItem('address');
    const { createCarModel, createCarMileage } = this.state;
    await createCar(address, createCarModel, createCarMileage);
    const cars = await getCars();
    this.setState({ cars });
  }

  render() {
    const { cars, role, createCarModel, createCarMileage } = this.state;
    
    return (
      <div className="rent">
        { role === '2' && 
          <div>
            <Input onChange={(e)=> { this.setState({createCarModel: e.target.value}); }} value={createCarModel} placeholder="модель"/>
            <Input onChange={(e)=> { this.setState({createCarMileage: e.target.value}); }} value={createCarMileage} placeholder="пробег"/>
            <Button onClick={this.createCar} type="primary" block>Добавить автомобиль</Button>
          </div>
        }
        {cars.map(({ model, mileage, isRent }, idCar) => {
          return (
            <div className="rent__car">
              <div>id машины: {idCar}</div>
              <div>Модель: {model}</div>
              <div>Пробег: {mileage} km.</div>
              <Button onClick={() => { this.rentCar(idCar); }} type="primary" disabled={isRent}>Арендовать</Button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Rent;