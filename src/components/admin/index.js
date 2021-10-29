import { Component } from "react";
import { getTrips } from "../../contract/helper";
import './style.css';

class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      trips: [],
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

  render() {
    const { trips } = this.state;
    console.log(trips);

    return (
      <div>
        { trips.map((trip) => {
          return (
            <div>
              { trip.renter }
            </div>
          );
        })}
      </div>
    );
  }
}

export default Admin;