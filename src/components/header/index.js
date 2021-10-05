import { Component } from "react";
import logo from '../../static/logo.png';
import { Menu, Button } from 'antd';
import { MailOutlined, AppstoreOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.css';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 'cabinet',
    }
  }

  setCurrent = (current) => {
    this.setState({ current });
  }

  logout = () => {
    window.localStorage.setItem('address', '');
    window.location.href = 'authorization';
  }

  render() {
    const { current } = this.state;

    return (
      <div className="header">
        <div className="header__logo">
          <img className="header__logo_img" src={ logo } alt=""></img>
          Carchering
        </div>
        <div className="header__menu">
          <Link className="header__link" to="/cabinet">Личный кабинет</Link>
          <Link className="header__link" to="/rent">Аренда</Link>
        </div>
        <Button onClick={this.logout} type="dashed" icon={<LoginOutlined />} size="large">
          Logout
        </Button>
      </div>
    );
  }
}

export default Header;