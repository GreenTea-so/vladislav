import { Component, Fragment } from "react";
import { Button, Modal, Select, Input, Calendar } from "antd";
import { getUser, endRent, driveAdd } from "../../contract/helper";
import Spinner from '../Spinner/index';
import './style.css';

const { Option } = Select;

class Cabinet extends Component {

  constructor() {
    super();
    const date = new Date();
    const driveAddSrok = Number(date.getTime()/1000).toFixed();

    this.state = {
      login: '',
      name: '',
      balance: '',
      address: '',
      trip: {},
      trips: [],
      timeTrip: 0,
      license: {},
      visible: false,
      confirmLoading: false,
      driveAddNumber: 0,
      driveAddCategory: 'A',
      driveAddSrok,
      spin: false,
    };
    setInterval(() => { this.getTimeTrip() }, 1000);
  }

  async componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const address = localStorage.getItem('address');
    const user = await getUser(address);
    const { login, name, balance, trip, trips, license } = user;
    const newBalance = Math.floor((balance / 1000000000000000000) * 100) / 100;
    this.setState({ login, name, address, balance: newBalance, trip, trips, license });
  }

  endRent = async (address, idCar) => {
    this.setState({spin: true});
    await endRent(address, idCar);
    this.getUser();
    this.setState({spin: false});
  }

  getTimeTrip = () => {
    const { trip } = this.state;
    const { startTrip } = trip;
    const date = new Date();
    const time = ((date.getTime()/1000) - Number(startTrip)).toFixed();
    this.setState({ timeTrip: time });
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = async (address, driveNumber, driveCategory, driveSrok) => {
    this.setState({ confirmLoading: true });
    setTimeout(() => {
      this.setState({ visible: false });
      this.setState({ confirmLoading: false });
    }, 2000);
    await driveAdd(address, driveNumber, driveCategory, Number(driveSrok));
    this.getUser();
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {

    const { 
      login, 
      name, 
      address, 
      balance, 
      trip, 
      trips, 
      timeTrip, 
      license,
      visible,
      confirmLoading,
      driveAddNumber,
      driveAddCategory,
      driveAddSrok,
      spin,
    } = this.state;

    const { isTrip, startTrip, idCar } = trip;
    const { drive_number, category, srok } = license;

    const startDateTrip = new Date(startTrip * 1000);
    const srokDate = new Date(srok * 1000);

    return (
      <div className="cabinet">
        <div  className="cabinet__profil-title">Ваш профиль</div>
        <div className="cabinet__profil">
          <div className="cabinet__profil-data">
            <div>Адрес кошелька: {address}</div>
            <div>ФИО: {name}</div>
            <div>Логин: {login}</div>
            <div>Баланс: {balance}</div>
            {isTrip && <div>
              <div className="cabinet__trip-title">Текущая поездка</div>
              <div>id машины: {idCar}</div>
              <div>Время начала поездки: {`${startDateTrip.getFullYear()}.${startDateTrip.getUTCMonth() + 1}.${startDateTrip.getDate()} ${startDateTrip.getHours()}:${startDateTrip.getMinutes()}`}</div>
              <div>Время поездки: {timeTrip} s.</div>
              <Button className="cabinet__trip-out" onClick={() => { this.endRent(address, idCar); }} type="primary" danger>Закончить поездку</Button>
            </div>}
            <div className="cabinet__liccense">
              {drive_number === '' ? 
                <Button className="cabinet__liccense-add" type="primary" onClick={this.showModal}>
                  Добавить водительское удостоверение
                </Button>
                : <Fragment>
                    <div className="cabinet__licsense-title">Водительское удостоверение</div>
                    <div>Номер водительского удостоверения: {drive_number}</div>
                    <div>Категория: {category}</div>
                    <div>Срок: {`${srokDate.getFullYear()}.${srokDate.getUTCMonth() + 1}.${srokDate.getDate()}`}</div>
                  </Fragment>
              }
            </div>
          </div>
          <div>
            <div className="cabinet__history-title">История поездок</div>
            {trips.map(({ idCar, startTrip, endTrip }) => {
              const newStartTrip = new Date(startTrip * 1000);
              const newEndtTrip = new Date(endTrip * 1000);
              return (
                <div className="cabinet__history-data">
                  <div>id машины: {idCar}</div>
                  <div>начало поездки: {`${newStartTrip.getFullYear()}.${newStartTrip.getUTCMonth() + 1}.${newStartTrip.getDate()} ${newStartTrip.getHours()}:${newStartTrip.getMinutes()}`}</div>
                  <div>конец поездки: {`${newEndtTrip.getFullYear()}.${newEndtTrip.getUTCMonth() + 1}.${newEndtTrip.getDate()} ${newEndtTrip.getHours()}:${newEndtTrip.getMinutes()}`}</div>
                  <div>Время поездки: {endTrip - startTrip} s.</div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          title="Добавить водительское удостоверение"
          visible={visible}
          onOk={() => this.handleOk(address, driveAddNumber, driveAddCategory, driveAddSrok)}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div className="cabinet__popup-body">
            <Input onChange={(e) => { this.setState({ driveAddNumber: e.target.value }); }} placeholder="Номер водительского удостоверения" style={{ width: '55%' }} />
              <div className="cabinet__popup-body-category-block">
                <div className="cabinet__popup-body-category">Категория: </div>
                <Select defaultValue="A" style={{ width: 120 }} allowClear onChange={(e) => { this.setState({ driveAddCategory: e }); }}>
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="C">C</Option>
              </Select>
            </div>
            <div className="site-calendar-demo-card">
              Дата выдачи:
              <Calendar fullscreen={false} onChange={(e) => { this.setState({ driveAddSrok: Number(e._d.getTime()/1000).toFixed() }); }} />
            </div>
          </div>
        </Modal>
        {spin && <Spinner />}
      </div>
    );
  }
}

export default Cabinet;