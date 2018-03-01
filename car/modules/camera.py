import cv2
import requests

class Camera(object):
  def __init__(self, sub_key):
    self.cam = cv2.VideoCapture(0)
    self.sub_key = sub_key

  def capture(self):
    if self.cam.isOpened():
      isCaptured, frame = self.cam.capture()
      return isCaptured, frame
    else:
      return False, None
  
  def recognize_frame(self, frame):
    _, img = cv2.imencode('.jpg', frame)
    cv2.imwrite('test.jpg', frame)
    return self.process_request(img.tostring())

  def recognize(self):
    ret, frame = self.cam.read()
    if ret:
      return self.recognize_frame(frame)
    else:
      return None
  
  def process_request(self, data):
    retries = 0
    result = None
    url = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr'
    headers = {'Ocp-Apim-Subscription-Key': self.sub_key, 'Content-Type': 'application/octet-stream'}
    params = {'language': 'unk', 'detectOrientation': 'true'}
    max_retries = 5
    while True:
      res = requests.post(url, headers=headers, params=params, data=data)
      if res.status_code == 429:
        print( "Message: %s" % ( res.json() ) )
        if retries <= max_retries: 
          time.sleep(1) 
          retries += 1
          continue
        else: 
          print( 'Error: failed after retrying!' )
          break
      else:
        # print( "Message: %s" % ( res.json() ) )
        result = self.extract_json(res.json())
      break

    return result
      
  def extract_json(self, data):
    if len(data['regions']) > 0:
      result = ''
      lines = data['regions'][0]['lines']
      for obj in lines:
        result += ' '.join(list(map(lambda box: box['text'], obj['words'])))
        result += '\n'
      return result
    else:
      return None

  def release(self):
    self.cam.release()
