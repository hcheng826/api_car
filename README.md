# api_car
MakeNTU workshop project

## Overview
We want to create a car that can
- be controlled by speech command
- recognize the sign on the road and make decision
using AI cloud cognitives APIs.

## Operation
There are 2 modes: speech mode and text recognition mode. In both mode, the car would stop at each crossroad, triggered by sensing the RFID card.

### speech mode
the car decides to turn right or left base on the speech instruction sent from user, which is trancripted using speech API.

### text recognition mode
the car uses camera to read the sign with text recognition API and turn.

 Basically the car switches between 2 states, "forward state" and "listen and turn state". In the beginning it's in "forward state". When the RFID card is sensed, it turns to "listen and turn state" and turns back to "forward state" after the turn finished.

## Hardware Requirements
### Hardware Components
- toy car
- Raspberry Pi
- Picamera
- microphone(laptop)
- RFID cards and sensor
- map(street model)

### Map(Street Model)
The map defines the scenario a car may encounter on the road. Basic component is a T-shaped crossroad with
- road sign saying "right" or "left" on the wall
- an RFID card placed on the floor

## Pi Requirements
A python server capable of:
- streaming image from pi camera
- posting http request for text recognition
- handling request from pc about the response from speech API(the command)
- detecting RFID card and response correctly
- driving motor and servo based on the commands from text recognition or speech, RFID, etc.

## Software Requirements(Basic)
### Speech API
A Python script recording audio stream from microphone and getting transcript from [Google Cloud Speech API](https://cloud.google.com/speech/). Then the script send the command to the server on pi via http request.

### Text Recognition API
### Streaming
Users simply open the browser with an URL to view the streaming image, without further interaction.

## Software Requirements(Advanced)
A web app integrating:
- Speech API
- Text Recognition API
- Streaming

together to give users more interactions and fancy experience.



