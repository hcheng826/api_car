import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { ReactMic } from 'react-mic';
class Speech extends Component {

  state = {
    transcription: '',
    socketOpen: false,
    loading: false
	}
	socket = null;
  
  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    })
  }

  handleToggle = () => {
    if(!this.state.loading) {
      this.dummyAsync(() => {
        this.setState({
          loading: false
        });
      })
    }
  }
	handleStart = () => {
		if(!this.socket) {
      this.socket = new WebSocket('ws://localhost:5000/', 'stream-protocol');
      this.socket.onmessage = (e) => {
        // console.log(e.data);
        this.setState({
          transcription: e.data
        })
      }
      this.setState({
        socketOpen: true
      })
      this.handleToggle();
    }
	}

	handleStop = () => {
		if(this.socket) {
			this.socket.close();
      this.socket = null;
      this.setState({
        socketOpen: false
      })
      this.handleToggle();
		}
		
	}
  render() {
    const { socketOpen, loading } = this.state;
	  return (
      <div className="animated fadeIn">
        <div>
          <RaisedButton label="start" onClick={this.handleStart}/>
          <RaisedButton label="stop" onClick={this.handleStop}/>
        </div>
        <ExpandTransition open={socketOpen} loading={loading}>
          <ReactMic
            record={socketOpen}
            className="oscilloscope"
            strokeColor="#FFF"
            backgroundColor="#000"/>
        </ExpandTransition>
        <span>{this.state.socketOpen && this.state.transcription}</span>
      </div>
		 )
	}
  
}

export default Speech;
