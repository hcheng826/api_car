from flask import Flask
from modules.camera import Camera
from modules.controller import Controller
from rfid_thread import rfid_thread

app = Flask(__name__)

@app.route('/')
def root():
  return 'woooow'


if __name__ == '__main__':
  app.run(host='0.0.0.0', threaded=True, debug=False)
