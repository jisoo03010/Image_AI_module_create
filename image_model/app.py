from flask import Flask, render_template, jsonify, request
import io
import json
import os
from numpy import reshape
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import torch.nn as nn
import requests
import torch
from torch.utils.data import Dataset, DataLoader
from torchvision import  utils
import torchvision.datasets as datasets
import splitfolders
import torch.nn.functional as F
#모델 가져오기
# model.load_state_dict(torch.load('model.pt'))

# 이미지 나누기 
# splitfolders.ratio('./static/dataset2/', output="./static/sample_data/", seed=1337, ratio=(0.8, 0.2))

#모델 저장하기 
# model = torch.save(model.state_dict(), 'model.pt')
# print(model)

app = Flask(__name__)

num_classes = 3
batch_size = 32
num_workers = 0 
lr = 0.001
test_accu = []

model = models.densenet161(pretrained=True)
model.classifier = nn.Linear(2208, 3) 
model.load_state_dict(torch.load('model.pt'))
model.eval()

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu") # GPU 여부에 따라서 사용할 디바이스 종류 자동 지정
imagenet_class_index = json.load(open('./static/imagenet_class_index.json'))


data_dir = './static/sample_data/'
train_dir = os.path.join(data_dir, 'train')
test_dir = os.path.join(data_dir, 'val')

def transform_image(image_bytes):
    data_transforms = transforms.Compose([transforms.Resize((230, 230)),
                                        transforms.RandomCrop(224),
                                        transforms.ToTensor()])
    image = Image.open("./static/image/madongseak.jpg")
    image = data_transforms(image)
    image = image.to(device)
    image = image.reshape(1, 3, 224, 224)
    #softmax(1) shape을 다 합쳤을때 1이 안되서 소프트맥스를 사용해서 1을 만들어 준뒤에 
    # 정확도 구하기 하면 끝 pred.argmax(1)
    #max값 구하기 
    # 몇 번째 인덱스에 몇 퍼센트인지 수치상으로 보여주기 
    pred = model(image)
    return pred




with open("./static/image/madongseak.jpg", 'rb') as f:
    image_bytes = f.read()
    print("\n", transform_image(image_bytes=image_bytes))

#=============================================================================
@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/main')
def main():
    return render_template("main.html")

@app.route('/predict', methods=['GET'])
def predict():
    return 
     

if __name__ == "__main__":
    app.run()
