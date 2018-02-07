# api_car
MakeNTU workshop project

## Overview
We want to create a car that can
- be controlled by speech command
- recognize the sign on the road and make decision
using AI cloud cognitives APIs.

## Hardware Components
- toy car
- Raspberry Pi
- Picamera
- microphone
- RFID cards and sensor
- map(street model)

## Map(street model) and Operation
The map defines the scenario a car may encounter on the road. Basic component is a T-shaped crossroad with road sign saying "right" or "left" on the front wall and an RFID card placed on the floor. The car would stop at each crossroad, triggered by sensing the RFID card. It decides to turn right or left either from speech instruction or by recognition of the sign(2 individual modes).
