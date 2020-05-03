import cv2
import os
import sys
import numpy as np

video_path = "./clips/" + sys.argv[1]

# Load the Haar cascades
face_cascade = cv2.CascadeClassifier('./haar_cascades/haarcascade_frontalface_default.xml')
eyes_cascade = cv2.CascadeClassifier('./haar_cascades/haarcascade_eye.xml')

def detect(gray, frame):
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    eye_exists = False
  
    for (x,y,w,h) in faces:
        cv2.rectangle(frame, (x,y), (x+w, y+h), (255,0,0), 2)
    
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]

        eyes = eyes_cascade.detectMultiScale(roi_gray, 1.1, 3)
        eyex = []
        eyey = []
        eyew = []
        eyeh = []

        for (ex, ey, ew, eh) in eyes:
            eye_exists = True
            eyex.append(ex)
            eyey.append(ey)
            eyew.append(ew)
            eyeh.append(eh)
        try:  
            frame = roi_color[eyey[0]:eyey[0] + eyeh[0] , eyex[0]:eyex[0] + eyew[0]]
        except ValueError:
            pass
        except IndexError:
            pass
    if eye_exists:
        return frame
    else:
        return np.array([False])


capture = cv2.VideoCapture(video_path)
imgs = []

while capture.isOpened():
    ret, frame = capture.read()
    if ret == False:
        break

    frame = cv2.resize(frame, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
    gray  = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    f = detect(gray, frame)
    if f.all():
        print(f)
        cv2.imwrite("./model_inputs/input/" + str(len(os.listdir("./model_inputs/"))) + ".jpg", f)

capture.release()
cv2.destroyAllWindows()

os.remove(video_path)

sys.stdout.write("1\n")