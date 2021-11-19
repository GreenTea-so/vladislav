import { Component, Fragment } from "react";
import { Button, Modal, Select, Input, Calendar } from "antd";
import { getUser, endRent, driveAdd } from "../../contract/helper";
import Spinner from '../Spinner/index';
import './style.css';

const { Option } = Select;

class Cabinet extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const address = localStorage.getItem('address');
    const user = await getUser(address);
    this.setState({ user });
  }

  

  render() {
    const { user } = this.state;
    console.log(user);

    const { email, login, name } = user;

    return (
      <div className="cabinet">
        <div>e-mail: {email}</div>
        <div>логин: {login}</div>
        <div>ФИО: {name}</div>
      </div>
    );
  }
}

export default Cabinet;