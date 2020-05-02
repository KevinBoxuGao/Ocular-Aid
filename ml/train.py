import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets, models
from collections import OrderedDict

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


model = models.densenet121(pretrained = True)
for parameter in model.parameters():
    parameter.requires_grad = False
model.classifier = nn.Sequential(OrderedDict([
    ("fc1", nn.Linear(1024, 500)),
    ("relu", nn.ReLU()),
    ("fc2", nn.Linear(500, 2)),
    ("output", nn.LogSoftmax(dim = 1))
]))
model.to(DEVICE)

criterion = nn.NLLLoss()
optimizer = torch.optim.Adam(model.parameters(), lr = LEARN_RATE)

for epoch in range(N_EPOCHS):
    model.train()
    train_loss = 0

    step = 0
    for images, labels in train_loader:
        # Training run
        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        optimizer.zero_grad()

        logits = model(images)

        loss = criterion(logits, labels)
        train_loss += loss.item()

        loss.backward()
        optimizer.step()

        step += 1
        print("\rEpoch", epoch + 1, "    Step", step, end = "")

    # Validation run
    model.eval()
    with torch.no_grad():
        accuracy = 0
        test_loss = 0
        for images, labels in test_loader:
            images = images.to(DEVICE)
            labels = labels.to(DEVICE)
            
            logits = model(images)

            top_p, top_class = logits.topk(1, dim = 1)
            equals = top_class == labels.view(*top_class.shape)

            accuracy += torch.mean(equals.type(torch.cuda.FloatTensor)).item()
            test_loss += criterion(logits, labels).item()
        test_loss /= len(test_loader)
        accuracy /= len(test_loader)
    print("Epoch", epoch + 1)
    print("-----------")
    print("Train Loss:", train_loss / len(train_loader))
    print("Test Loss:", test_loss)
    print("Validation Accuracy:", accuracy)
    print()
    torch.save(model.state_dict(), "model.pth")
