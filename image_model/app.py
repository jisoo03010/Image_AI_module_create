from cProfile import label
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
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu") # GPU 여부에 따라서 사용할 디바이스 종류 자동 지정

model = models.densenet161(pretrained=True)
model.classifier = nn.Linear(2208, 3) 
model.load_state_dict(torch.load('model.pt', map_location=device))
model.eval()

imagenet_class_index = json.load(open('./static/imagenet_class_index.json'))


data_dir = './static/sample_data/'
train_dir = os.path.join(data_dir, 'train')
test_dir = os.path.join(data_dir, 'val')

@app.route("/upload", methods=['POST'])
def upload():
    file_upload = request.files['file_lo'] # 받아온 파일 
    pp = predict(file_upload)
    for p in pp:
        predd = {"eum_data" : "{:.4f}%".format(p[0]*100), "ma_data" : "{:.4f}%".format(p[1]*100), "son_data" : "{:.4f}%".format(p[2]*100)}
    return jsonify(predd)

def predict(image_bytes):
    data_transforms = transforms.Compose([transforms.Resize((230, 230)),
                                        transforms.RandomCrop(224),
                                        transforms.ToTensor()])
    #image = Image.open("./static/image/eun.jpg")  # image input 
    image = Image.open(image_bytes)
    image = data_transforms(image)
    image = image.to(device)
    image = image.reshape(1, 3, 224, 224)
    print("image=>>>", image) # tensor로 변환함 
    pred = model(image)
    #softmax(1) shape을 다 합쳤을때 1이 안되서 소프트맥스를 사용해서 1을 만들어 준뒤에 
    pred = F.softmax(pred)
    # pred = pred.max(pred.data, 1)
    for p in pred:
        print('\n =======정확도=======\n{:.4f}% : eum_data, \n{:.4f}% : ma_data, \n{:.4f}% : son_data'.format(p[0]*100, p[1]*100, p[2]*100))
        print(pred.argmax(1),"번")
    #max값 구하기 
    # 몇 번째 인덱스에 몇 퍼센트인지 수치상으로 보여주기 
    return pred

#js에서 받은 파일 을 받아와서 tensor로 변환시켜주고 업로드 하면 끝남 
# with open("{image_bytes}", 'rb') as f:
#     image_bytes = f.read()
#     print("\n", predict(image_bytes=image_bytes))
#image input 

#==서버===========================================================================


@app.route('/')
def hello():
   return "Hellooo"


@app.route('/main', methods=['GET', 'POST'])
def main():
    value = 'fdsadfdsf, python'
    return render_template("main.html", value = value)


if __name__ == "__main__":
    app.run()