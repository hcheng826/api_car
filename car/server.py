import sys
if len(sys.argv) != 2 or not (sys.argv[1] != 'text' or sys.argv[1] != 'speech'):
  print('Usage: python3 {} speech/text'.format(sys.argv[0]))
  exit(-1)
import RPi.GPIO as gpio
from flask import Flask
from flask import jsonify
#from modules.camera import Camera
from modules.controller import Controller
from rfid_thread import rfid_thread

mode = sys.argv[1]

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
  controller.left(3)
  return jsonify(success=True)

@app.route('/right')
def right():
  controller.right(3)
  return jsonify(success=True)
    
@app.route('/stop')
def stop():
  controller.stop()
  return jsonify(success=True)

@app.route('/rfid')
def on_rfid():
  controller.stop()
  if mode == 'text':
    pass
  return jsonify(success=True)
    

if __name__ == '__main__':
  gpio.setmode(gpio.BCM)
  rfid = rfid_thread('makentu')
  try:
    rfid.start()
    app.run(host='0.0.0.0', threaded=True, debug=False)
  except KeyboardInterrupt:
    print('Exiting...')
  finally:
    print('Exiting...')
    gpio.cleanup()
    exit(-1)

