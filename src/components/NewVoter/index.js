import { Component } from 'react';
import { Input, Button, Modal, Switch } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/index';
import { newVoting } from '../../contract/helper';
import "./style.css";

class NewVoter extends Component {

 constructor(props) {
  super(props);
  this.state = {
    isVisibleNewVoter: false,
    openVoiting: false,
    quastions: '',
    days: 0,
  }
}

  handleOk = async () => {
    const address = localStorage.getItem('address');
    const { openVoiting, quastions, days } = this.state;
    await newVoting(address, quastions, openVoiting, Number(days));
  }

  render() {
    const { isVisible, handleCancel } = this.props;

    const { openVoiting, quastions, days } = this.state;

    return (
      <div className="new-voter">
        <Modal title="Новое голосование" visible={isVisible} onOk={this.handleOk} onCancel={handleCancel}>
         <Input value={quastions} onChange={(e) => { this.setState({quastions: e.target.value}) }}/>
         <Switch checked={openVoiting} onChange={() => this.setState({openVoiting: !openVoiting})} />
         <Input
           onChange={(e) => { this.setState({ days: e.target.value }); }}
           placeholder="Input a number"
           maxLength={1}
           value={days}
          />
       </Modal>
      </div>
    );
  }
}

export default NewVoter;