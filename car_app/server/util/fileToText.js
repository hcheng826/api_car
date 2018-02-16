const fs = require('fs');
const speech = require('@google-cloud/speech'); 
// Detects speech in the audio file
const transcribe = new Promise((resolve, reject) => {

  // Creates a client
  const client = new speech.SpeechClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  const filename = 'src/assets/audio/mono.wav';
  const encoding = 'LINEAR16';
  const sampleRateHertz = 44100;
  const languageCode = 'zh-TW';

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };
  const audio = {
    content: fs.readFileSync(filename).toString('base64'),
  };

  const request = {
    config: config,
    audio: audio,
  };
  client
    .recognize(request)
    .then(data => {
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      // console.log(`Transcription: `, transcription);
      resolve(transcription);
    })
    .catch(err => {
      console.error('ERROR:', err);
    })
});

module.exports = transcribe;
