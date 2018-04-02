import cv2
import requests

from datetime import datetime

class Helper(object):
  def __init__(self, sub_key):
    self.sub_key = sub_key # subcription key

  def recognize_frame(self, frame):
    if bytes is type(frame):
      return self.handwritten_request(frame)
    else:
      _, img = cv2.imencode('.jpg', frame)
      cv2.imwrite('test.jpg', frame)
      return self.handwritten_request(frame.tostring())

  def process_request(self, req_type, url, headers=None, params=None, data=None):
    retries = 0
    result = None
    max_retries = 5
    while True:
      if req_type == 'get':
        res = requests.get(url, headers=headers, params=params)
      elif req_type == 'post':
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
        result = res.json()
      break

    return result

  def ocr_request(self, data):
    url = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr'
    headers = {'Ocp-Apim-Subscription-Key': self.sub_key, 'Content-Type': 'application/octet-stream'}
    params = {'language': 'unk', 'detectOrientation': 'false'}
    result = self.process_request('post', url=url, headers=headers, params=params, data = data)
    return self.extract_ocr_json(result)
  
  def handwritten_request(self, data):
    url = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/RecognizeText'
    headers = {'Ocp-Apim-Subscription-Key': self.sub_key, 'Content-Type': 'application/octet-stream'}
    params = { 'handwriting': True }
    r = requests.post(url, headers=headers, params=params, data=data)
    result_url = r.headers['Operation-Location']
    result = self.process_request('get', url=result_url, headers=headers)
    print(result)
    return self.extract_handwritten_json(result)
    
  def extract_handwritten_json(self, data):
    if len(data['recognitionResult']) > 0:
      result = ''
      lines = data['recognitionResult']['lines']
      for obj in lines:
        result += ' '.join(list(map(lambda box: box['text'], obj['words'])))
        result += '\n'
      return result
    else:
      return None 

  def extract_ocr_json(self, data):
    print(data)
    if len(data['regions']) > 0:
      result = ''
      lines = data['regions'][0]['lines']
      for obj in lines:
        result += ' '.join(list(map(lambda box: box['text'], obj['words'])))
        result += '\n'
      return result
    else:
      return None

