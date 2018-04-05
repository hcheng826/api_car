import React, { Component } from 'react';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-upward';
import LeftArrow from 'material-ui/svg-icons/navigation/arrow-back';
import RightArrow from 'material-ui/svg-icons/navigation/arrow-forward';
import StopIcon from 'material-ui/svg-icons/notification/do-not-disturb';
import io from 'socket.io-client';
import '../../css/common.css';
import '../../css/text.css';
import rfid from '../../assets/img/rfid.png';
import { PI_URL } from '../../constants';
class Text extends Component {
  
  state = {
    url: '',
    start: false,
    rfid: false,
    cmd: ''
  }
  socket = null;
  
  
  componentDidMount() {
    if(!this.socket) {
      
      this.socket = io(PI_URL);
      this.socket.on('connect_error', (error) => {
        console.log('error, closing socket');
        this.socket.close();
      })
      this.socket.on('connect', () => {
        console.log('connected')
      });
      this.socket.on('rfid', () => {
        this.setState({
          rfid: true,
          cmd: null
        });
      });
      this.socket.on('cmd', (data) => {
        this.setState({
          cmd: data.cmd,
          rfid: false
        })
      });
      this.socket.on('disconnect', () => {
        console.log('disconnected');
        this.socket.close();
      });
    }
  }

  renderCmd = (cmd) => {
    const cmdStyle = {width: '15vw', height: '15vw'};
    switch(cmd) {
      case 'left': return <LeftArrow style={cmdStyle}/>;
      case 'right': return <RightArrow style={cmdStyle}/>;
      case 'forward': return <UpArrow style={cmdStyle}/>;
      case 'stop': return <StopIcon style={cmdStyle}/>;
      default: return null;
    }
  }
	render() {
    const rfidClass = 'rfid' + (this.state.rfid ? '' : ' invert');
    return (
      <div className="animated fadeIn row-flex-container">
        <div style={{marginRight: 20, flex: 1}}>
          <img src={PI_URL + '/video_feed'} alt="error" style={{height: '70vh'}}/>
        </div>
        <div className="col-flex-container img-container">
          <img src={rfid} className={rfidClass} alt='rfid'/>
          {this.renderCmd(this.state.cmd)}
        </div>
        
      </div>
    )
  }

}


export default Text;
