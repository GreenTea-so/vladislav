import { Component } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { registration } from '../../contract/helper';
import "./style.css";

const schema = Yup.object().shape({
  login: Yup.string()
    .required()
    .min(3),
});


class Registration extends Component {

  onSubmit = async (values) => {
    const { login, FIO, password } = values;
    await registration(login, FIO, password);
    window.location.href = './authorization';
  }

  render() {
    return (
      <Formik
        isSubmitting 
        initialValues={{
          login: '',
          FIO: '',
          password: '',
          againPassword: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          this.onSubmit(values);
        }}
        render={({
          values,
          errors,
          handleSubmit,
          handleChange,
          isSubmitting,
          setFieldValue
        }) => (
          <Form>
          <div className="registration">
            <Input 
              onChange={(e)=> { setFieldValue('login', e.target.value); }} 
              value={values.login} 
              size="large" 
              placeholder="login" 
              prefix={<UserOutlined />}
            />
            <Input 
              onChange={(e)=> { setFieldValue('FIO', e.target.value); }}
              value={values.FIO} 
              placeholder="ФИО"
            />
            <Input.Password
              onChange={(e)=> { setFieldValue('password', e.target.value); }}
              value={values.password} 
              placeholder="input password"
            />
            <Input.Password
              onChange={(e)=> { setFieldValue('againPassword', e.target.value); }}
              value={values.againPassword} 
              placeholder="input password" 
            />
            <Button
              type="primary" 
              block
              htmlType="submit"
            >
              Registation
            </Button>
            <Link to="authorization">Авторизоваться</Link>
            {errors.login && <div>{errors.login}</div>}
          </div>
          </Form>
        )}
      />
    );
  }
}

export default Registration;