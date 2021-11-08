import { Component } from "react";
import { Spin } from "antd";
import './style.css';

class Spinner extends Component {

  render() {
    return (
     <div className="spinner">
      <Spin className="spinner__spin" size="large" />
     </div>
    );
  }
}

export default Spinner;