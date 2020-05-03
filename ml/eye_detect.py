import cv2

# Load the Haar cascades
face_cascade = cv2.CascadeClassifier('./haar_cascades/eye_detect/haarcascade_frontalface_default.xml')
eyes_cascade = cv2.CascadeClassifier('./haar_cascades/Downloads/eye_detect/haarcascade_eye.xml')


cap = cv2.VideoCapture(0)

# Define function that will do detection
def detect(gray, frame):
  """ Input = greyscale image or frame from video stream
      Output = Image with rectangle box in the face
  """
  # Now get the tuples that detect the faces using above cascade
  faces = face_cascade.detectMultiScale(gray, 1.3, 5)
  # faces are the tuples of 4 numbers
  # x,y => upperleft corner coordinates of face
  # width(w) of rectangle in the face
  # height(h) of rectangle in the face
  # grey means the input image to the detector
  # 1.3 is the kernel size or size of image reduced when applying the detection
  # 5 is the number of neighbors after which we accept that is a face
  
  # Now iterate over the faces and detect eyes
  for (x,y,w,h) in faces:
    # h = int(h/2)
    cv2.rectangle(frame, (x,y), (x+w, y+h), (255,0,0), 2)
    # Arguements => image, top-left coordinates, bottomright coordinates, color, rectangle border thickness
    
    # we now need two region of interests(ROI) grey and color for eyes one to detect and another to draw rectangle
    roi_gray = gray[y:y+h, x:x+w]
    roi_color = frame[y:y+h, x:x+w]
    # Detect eyes now
    eyes = eyes_cascade.detectMultiScale(roi_gray, 1.1, 3)
    # Now draw rectangle over the eyes
    eyex = []
    eyey = []
    eyew = []
    eyeh = []

    for (ex, ey, ew, eh) in eyes:
      eyex.append(ex)
      eyey.append(ey)
      eyew.append(ew)
      eyeh.append(eh)

    try:  
      cv2.rectangle(roi_color, (min(eyex),min(eyey)), (max(eyex)+max(eyew), max(eyey)+max(eyeh)), (0, 255, 0), 2)
    except ValueError:
      pass
  return frame

while True:
    ret, frame = cap.read()
    frame = cv2.resize(frame, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
    gray  = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    f = detect(gray, frame)
    cv2.imshow('Input', f)

    c = cv2.waitKey(1)
    if c == 27:
        break

cap.release()
cv2.destroyAllWindows()