from camera import Camera

SUB_KEY = 'a497b7daa7724908a63cec0ccf94a6f7'

cam = Camera(SUB_KEY)
result = cam.recognize()
print('Result:')
if not result:
  print('Not detected')
else:
  print(result)
