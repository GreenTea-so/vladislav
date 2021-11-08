import { Component } from "react";
import { getTrips, endRent } from "../../contract/helper";
import { Button } from 'antd';
import Spinner from '../Spinner/index';
import './style.css';

class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      spin: false,
    }
  }

  async componentDidMount() {
    await this.getTrips();
  }

  getTrips = async () => {
    const address = localStorage.getItem('address');
    const trips = await getTrips(address);
    this.setState({ trips });
  }

  endRent = async (idCar) => {
    this.setState({spin: true});
    console.log(idCar);
    const address = localStorage.getItem('address');
    await endRent(address, idCar);
    await this.getTrips();
    this.setState({spin: false});
  }

  render() {
    const { trips, spin } = this.state;
    console.log(trips);

    return (
      <div className="admin">
        <div className="admin__content">
          { trips.map((trip) => {
            const startDateTrip = new Date(Number(trip.startTrip * 1000));
            return trip.isTrip && (
              <div className="admin__trip">
                <div>Адрес арендателя:  { trip.renter }</div>
                <div>Начало поездки: {`${startDateTrip.getFullYear()}.${startDateTrip.getUTCMonth() + 1}.${startDateTrip.getDate()} ${startDateTrip.getHours()}:${startDateTrip.getMinutes()}`}</div>
                <div>ID автомобиля: { trip.idCar }</div>
                <div className="admin__trip-button">
                  <Button className="admin__trip-btn" onClick={() => { this.endRent(trip.idCar) }}>Закончить поездку</Button>
                </div>
              </div>
            );
          })}
        </div>
        { spin && <Spinner />} 
      </div>
    );
  }
}

export default Admin;