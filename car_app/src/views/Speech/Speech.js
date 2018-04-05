import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { ReactMic } from 'react-mic';
import { validateTranscription } from '../../util';
import '../../css/speech.css';
import '../../css/common.css';
import { PI_URL } from '../../constants';

class Speech extends Component {

  state = {
    transcription: '',
    socketOpen: false,
    loading: false,
	}
	socket = null;
  
  componentWillUpdate(props, state) {
    const api = validateTranscription(state.transcription);
    console.log(api);
      // if(api) {
      //   fetch(PI_URL + api)
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log(data);
      //   }) 
      // }
  }


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
        socketOpen: false,
        transcription: ''
      })
      this.handleToggle();
		}
		
	}
  render() {
    const { socketOpen, loading } = this.state;
	  return (
      <div className="animated fadeIn speech-container">
        <div>
          <RaisedButton label="start" onClick={this.handleStart}/>
          <RaisedButton label="stop" onClick={this.handleStop}/>
        </div>
        <ExpandTransition open={socketOpen} loading={loading}>
          <div className="column-flex-container mic-container">
            <ReactMic
              record={socketOpen}
              className="oscilloscope visual-graph"
              strokeColor="#FFF"
              backgroundColor="#000"/>
            <span className="transcription">
              {this.state.socketOpen && this.state.transcription}
            </span>
          </div>
        </ExpandTransition>
              
      </div>
		 )
	}
  
}

export default Speech;
