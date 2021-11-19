import { Component } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/index';
import NewVoter from '../NewVoter';
import "./style.css";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisibleNewVoter: false,
    }
  }

  openPopup = () => {
    this.setState({ isVisibleNewVoter: true });
  }

  cancelPopup = () => {
    this.setState({ isVisibleNewVoter: false });
  }

  render() {
    const { isVisibleNewVoter } = this.state;

    return (
      <div className="home">
        <Button type="primary" onClick={this.openPopup}>Новое голосование</Button>
        <NewVoter isVisible={isVisibleNewVoter} handleCancel={this.cancelPopup}/>
      </div>
    );
  }
}

export default Home;