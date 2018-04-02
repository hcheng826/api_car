import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import '../../css/common.css';


class Text extends Component {
  
  state = {
    url: '',
    start: false,
    text: ''
  }
  
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      url: e.target.value,
      start: false
    })
  }

  handleClick = () => {
    this.setState({
      start: true
    })
    this.getTranscription();
  }

  getTranscription = () => {
    const FETCH_URL = 'http://10.42.0.15:5000/rfid';
    fetch(FETCH_URL, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'GET',
    }).then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({text: data['cmd']})
    }).catch(err => {
      console.log(err)
      this.setState({text: 'Error. Please start the pi server.'})
    });
  }
	render() {
    return (
      <div className="animated fadeIn">
        <img src="http://10.42.0.15:5000/video_feed" alt="error" style={{height: '70vh'}}/>
        <RaisedButton label="start" onClick={this.handleClick}/>
        <span>cmd: </span>
        <span>{this.state.start && this.state.text}</span>
      </div>
    )
  }

}


export default Text;
