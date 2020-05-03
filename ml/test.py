import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets, models
from collections import OrderedDict
import cv2

N_EPOCHS = 100
BATCH_SIZE = 32
LEARN_RATE = 0.003
ON_CUDA = torch.cuda.is_available()

if ON_CUDA:
    print("Training on CUDA")
    DEVICE = "cuda:0"
else:
    print("Training on CPU")
    DEVICE = "cpu"

train_transform = transforms.Compose([
    transforms.Resize(224),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(20),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])
test_transform = transforms.Compose([
    transforms.Resize(224),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

train_data = datasets.ImageFolder("./data/train", transform = train_transform)
test_data  = datasets.ImageFolder("./data/test", transform = train_transform)

train_loader = torch.utils.data.DataLoader(train_data, batch_size = BATCH_SIZE, shuffle = True, drop_last = True)
test_loader = torch.utils.data.DataLoader(test_data, batch_size = BATCH_SIZE)

for img, label in train_loader:
    print(img.mean())
    cv2.imshow(str(label[0]), img[0].permute(1, 2, 0).numpy())
    cv2.waitKey(0)


"""
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models, transforms
from collections import OrderedDict
import cv2
import os
import random


model = models.densenet121(pretrained = True)
for parameter in model.parameters():
    parameter.requires_grad = False
model.classifier = nn.Sequential(OrderedDict([
    ("fc1", nn.Linear(1024, 500)),
    ("relu", nn.ReLU()),
    ("fc2", nn.Linear(500, 2)),
    ("output", nn.LogSoftmax(dim = 1))
]))

model.load_state_dict(torch.load("model.pth", map_location = "cpu"))

imgs = [os.listdir("./data/test/open"), os.listdir("./data/test/closed")]
for _ in range(10):
    if random.randint(0, 1) == 1:
        path = "./data/test/closed/" + imgs[1][random.randint(0, len(imgs[1]) - 1)]
    else:
        path = "./data/test/open/" + imgs[0][random.randint(0, len(imgs[0]) - 1)]
    img = cv2.imread(path)
    img = cv2.resize(img, (224, 224), interpolation = cv2.INTER_LINEAR)
    timg = torch.Tensor(img).permute(2, 1, 0).view(1, 3, 224, 224)
    timg = (timg - 0.5) / 0.5
    print(timg.mean())

    out = torch.exp(model(timg)).view(-1)
    if out[0] >= out[1]:
        label = "closed"
    else:
        label = "open"

    cv2.imshow(label, img)
    cv2.waitKey(0)
"""