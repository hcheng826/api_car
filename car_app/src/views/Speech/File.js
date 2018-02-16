import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends Component {

  state = {
    transcription: ''
  }
  
  handleClick = () => {
    fetch('/api/file-to-text')
      .then(res => res.json())
      .then(data => {
        this.setState({
          transcription: data.transcription
        });
      })

  }
  render() {
    return (
      <div className="animated fadeIn">
        <RaisedButton label="transcribe" onClick={this.handleClick}/>
        <p>Transcription: <span>{this.state.transcription}</span></p>
      </div>
    )
  }
}