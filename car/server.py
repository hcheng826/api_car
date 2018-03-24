import sys
if len(sys.argv) != 2 or not (sys.argv[1] != 'text' or sys.argv[1] != 'speech'):
  print('Usage: python3 {} speech/text'.format(sys.argv[0]))
  exit(-1)

import RPi.GPIO as gpio
from flask import Flask
from flask import jsonify
from modules.camera import Camera
from modules.controller import Controller
from rfid_thread import rfid_thread

mode = sys.argv[1]
SUBSCRIPTION_KEY = 'PUT SUBSCRIPTION KEY HERE'
if mode == 'text':
  camera = Camera(SUBSCRIPTION_KEY)

app = Flask(__name__)
controller = Controller(23, 18) # motor_pin, servo_pin

@app.route('/')
def root():
  return 'woooow'

@app.route('/forward')
def forward():
  controller.forward()
  return jsonify(success=True)

@app.route('/left')
def left():
  controller.left(6)
  return jsonify(success=True)

@app.route('/right')
def right():
  controller.right(6)
  return jsonify(success=True)
    
@app.route('/stop')
def stop():
  controller.stop()
  return jsonify(success=True)

@app.route('/rfid')
def on_rfid():
  controller.stop()
  if mode == 'text':
    result = camera.recognize().lower().rstrip()
    cmd = result2cmd(result)
    if cmd == 'left':
      controller.left(4)
    elif cmd == 'right':
      controller.right(4)

  return jsonify(success=True)

def result2cmd(result):
  res_list = result.split('\n')
  for item in res_list:
    if item in 'left':
      return 'left'
    elif item in 'right':
      return 'right'
  return None

if __name__ == '__main__':
  gpio.setmode(gpio.BCM)
  rfid = rfid_thread('makentu')
  try:
    rfid.start()
    app.run(host='0.0.0.0', threaded=True, debug=False)
  except KeyboardInterrupt:
    print('Interrupt, Exiting...')
  finally:
    print('Exiting...')
    controller.stop()
    gpio.cleanup()
    exit(-1)

