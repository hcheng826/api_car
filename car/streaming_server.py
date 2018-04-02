import sys
if len(sys.argv) != 2 or not (sys.argv[1] != 'text' or sys.argv[1] != 'speech'):
  print('Usage: python3 {} speech/text'.format(sys.argv[0]))
  exit(-1)

import RPi.GPIO as gpio
from flask import Flask, jsonify, Response
from modules.api_helper import Helper
from modules.camera_opencv import Camera
from modules.controller import Controller
from rfid_thread import rfid_thread

mode = sys.argv[1]
SUBSCRIPTION_KEY = '1b8a0bc45d9842f5a6446ea51f133cde'
if mode == 'text':
  helper = Helper(SUBSCRIPTION_KEY)
  frame = None

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

def gen(camera):
  """Video streaming generator function."""
  global frame
  while True:
    frame = camera.get_frame()
    yield (b'--frame\r\n'
           b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/rfid')
def on_rfid():
  global frame
  controller.stop()
  cmd = ''
  if mode == 'text' and frame:
    result = helper.recognize_frame(frame).lower().rstrip()
    cmd = result2cmd(result)
    if cmd == 'left':
      controller.left(4)
    elif cmd == 'right':
      controller.right(4)
    elif cmd == 'stop':
      controller.stop()
  return jsonify(cmd=cmd)

def result2cmd(result):
  res_list = result.split('\n')
  for item in res_list:
    if item in 'left':
      return 'left'
    elif item in 'right':
      return 'right'
    elif item in 'stop':
      return 'stop'
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

