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
      const { login, password } = this.state;
      const address = await authorization(login, password);
      window.localStorage.setItem('address', address);
      window.location.href = '/cabinet';
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
          placeholder="login" 
          prefix={<UserOutlined />}
        />
        <Input.Password
          onChange={(e)=> { this.setState({password: e.target.value}); }}
          value={password} 
          placeholder="input password"
        />
        <Button onClick={this.onSubmit} type="primary" block>Authorization</Button>
        <Link to="registration">Зарегистрироваться</Link>
        {spin && <Spinner />}
      </div>
    );
  }
}

export default Authorization;