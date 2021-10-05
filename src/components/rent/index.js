import { Component } from "react";
import { Button } from "antd";
import { getCars, rentCar } from "../../contract/helper";
import './style.css';

class Rent extends Component {

  constructor() {
    super();
    this.state = {
      cars: [],
    };
  }

  async componentDidMount() {
    const cars = await getCars();
    console.log(cars);
    this.setState({ cars });
  }

  rentCar = async (idCar) => {
    const address = localStorage.getItem('address');
    await rentCar(address, idCar);
    const cars = await getCars();
    this.setState({ cars });
  }

  render() {
    const { cars } = this.state;
    
    return (
      <div className="rent">
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