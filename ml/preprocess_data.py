import os
import shutil
import random

os.mkdir("./data_metadata")
os.mkdir("./temp")

shutil.move("./data/annotation.txt", "./data_metadata/annotation.txt")
shutil.move("./data/stats_2018_01.ods", "./data_metadata/stats_2018_01.ods")

for folder in os.listdir("./data"):
    for img in os.listdir("./data/" + folder):
        shutil.move("./data/" + folder + "/" + img, "./temp")

for folder in os.listdir("./data"):
    os.rmdir("./data/" + folder)


# Split into training and testing
os.makedirs("./data/train/open")
os.makedirs("./data/train/closed")
os.makedirs("./data/test/open")
os.makedirs("./data/test/closed")

imgs = os.listdir("./temp")
random.shuffle(imgs)

n_training = int(len(imgs) * 0.8)
for img in imgs[:n_training]:
    if img[-12] == "1":
        shutil.move("./temp/" + img, "./data/train/open")
    elif img[-12] == "0":
        shutil.move("./temp/" + img, "./data/train/closed")
    
for img in imgs[n_training:]:
    if img[-12] == "1":
        shutil.move("./temp/" + img, "./data/test/open")
    elif img[-12] == "0":
        shutil.move("./temp/" + img, "./data/test/closed")

os.rmdir("./temp")