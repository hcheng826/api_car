from RPi import GPIO as gpio


class Controller(object):
  def __init__(self, motor_pin, servo_pin):
    if gpio.getmode() != gpio.BCM:
      gpio.setmode(gpio.BCM)
     self.motor = motor_pin
     gpio.setup(self.motor, gpio.OUT)
     self.servo = gpio.PWM(servo_pin, 50)

  def forward(self):
    pass

  def left(self):
    pass

  def right(self):
    pass

  def stop(self):
    pass


