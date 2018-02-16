export default {
  items: [
    {
       name: 'Speech Mode',
       url: '/speech',
       icon: 'icon-microphone',
       badge: {
         variant: 'info',
         text: 'NEW'
       },
      //  children: [
      //    {
      //      name: 'File to text',
      //      icon: 'icon-microphone'
      //    },
      //    { 
      //      name: 'Stream to text',
      //      icon: 'icon-microphone'
      //    }
      //  ]
    },
    { 
      name: 'Text Mode',
      url: '/text',
      icon:'icon-camrecorder',
      badge: {
        variant: 'info',
      }
    }
  ]
};
