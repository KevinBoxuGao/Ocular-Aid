import cv2
import sys

# Load the Haar cascades
face_cascade = cv2.CascadeClassifier('./haar_cascades/haarcascade_frontalface_default.xml')
eyes_cascade = cv2.CascadeClassifier('./haar_cascades/haarcascade_eye.xml')

capture = cv2.VideoCapture(0)
_, image = capture.read()
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

capture.release()
cv2.destroyAllWindows()

faces = face_cascade.detectMultiScale(gray, 1.3, 5)
if len(faces) >= 1:
    sys.stdout.write("1")
else:
    sys.stdout.write("0")
