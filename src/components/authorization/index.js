import { Component } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { authorization } from '../../contract/helper';
import Spinner from '../Spinner/index';
import "./style.css";

class Authorization extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      spin: false,
    }
  }

  onSubmit = async () => {
    try {
      this.setState({spin: true});
      window.location.href = '/home';
      this.setState({spin: false});
    }
    catch(e) {
      console.log(e);
    }
  }

  render() {
    const { login, password, spin } = this.state;

    return (
      <div className="authorization">
        <Input 
          onChange={(e)=> { this.setState({login: e.target.value}); }} 
          value={login} 
          size="large" 
          placeholder="Логин" 
          prefix={<UserOutlined />}
          className="authorization__login"
        />
        <Input.Password
          onChange={(e)=> { this.setState({password: e.target.value}); }}
          value={password} 
          placeholder="Пароль"
          className="authorization__password"
        />
        <Button 
          onClick={this.onSubmit}
          type="primary"
          block
          className="authorization__btn"
        >
          Авторизоваться
        </Button>
        <Link to="registration">Зарегистрироваться</Link>
        {spin && <Spinner />}
      </div>
    );
  }
}

export default Authorization;