export const validateTranscription = (transcription) => {
  const valids = ['前進', '停' , '左轉', '右轉'];
  const apis = ['forward', 'stop', 'left', 'right'];
  for(let i = 0; i < valids.length; i++) {
    if(transcription.includes(apis[i])) {
      return apis[i];
    }
  }
  return null;
}

