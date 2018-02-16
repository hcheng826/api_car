const express = require('express');
const app = express();
const http = require('http').Server(app);
const record = require('node-record-lpcm16');
const WebSocketServer = require('websocket').server;
const transcribeFile = require('./util').transcribeFile;
const recognizeStream = require('./util').recognizeStream;

app.get('/api/file-to-text', (req, res) => {
  console.log('file transcribed');
  transcribeFile.then((text) => {
    res.send({ transcription: text });
  });
});


wsApp = new WebSocketServer({
  httpServer: http,
  autoAcceptConnections: false
})

wsApp.on('request', (req) => {
  const connection = req.accept('stream-protocol', req.origin);
  console.log((new Date()) + ' Connection accepted.');
  // Start recording and send the microphone input to the Speech API
  record.start({
    sampleRateHertz: 16000,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
  }).on('error', console.error)
    .pipe(recognizeStream(connection));
  // connection.send('lalala');
  connection.on('close', function(reasonCode, description) {
      record.stop();
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
})
module.exports = http;
