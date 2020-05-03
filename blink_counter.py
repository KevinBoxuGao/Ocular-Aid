import torch
import torch.nn as nn
from torchvision import transforms, datasets, models
from collections import OrderedDict
import cv2
import os
import sys

# Take frames of 60 second video and find number of blinks.
if len(os.listdir("./model_inputs/input")) == 0:
    sys.stdout.write("0")
    quit()

transform = transforms.Compose([
    transforms.Resize(224),
    transforms.Grayscale(),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])
inputs = datasets.ImageFolder("./model_inputs/", transform = transform)
loader = torch.utils.data.DataLoader(inputs, batch_size = 1)

model = models.densenet121(pretrained = True)
model.classifier = nn.Sequential(OrderedDict([
    ("fc1", nn.Linear(1024, 500)),
    ("relu", nn.ReLU()),
    ("fc2", nn.Linear(500, 2)),
    ("output", nn.LogSoftmax(dim = 1))
]))
model.load_state_dict(torch.load("model.pth", map_location = "cpu"))

n_blinks = 0
i = 0
j = 1
for image, _ in loader:
    image = torch.stack([image.clone().view(224, 224) for _ in range(3)]).view(1, 3, 224, 224)
    out = torch.exp(model(image)).view(-1)
    
    if out[i] > out[j]:
        i, j = j, i
        if i == 0:
            n_blinks += 1

for file in os.listdir("./model_inputs/input"):
    os.remove("./model_inputs/input/" + file)

sys.stdout.write(str(n_blinks))
