from flask import Flask,request,render_template, jsonify
import numpy as np
import pandas
import sklearn
import requests
import pickle
from flask_cors import CORS

# importing model
model = pickle.load(open('model.pkl','rb'))

# creating flask app
app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5000"}})
CORS(app)
@app.route("/")
def home():
    return {"message": "Hello from backend"}

@app.route("/predict", methods=['POST'])
def predict():
    data = request.json  # Accept JSON data from the request
    
    N = data['Nitrogen']
    P = data['Phosphorus']
    K = data['Potassium']
    temp = data['Temperature']
    humidity = data['Humidity']
    ph = data['pH']
    rainfall = data['Rainfall']
    id = data['id']


    features = np.array([[N,P,K,temp,humidity,ph,rainfall]])

    crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
                 8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
                 14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
                 19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"}

    prediction = model.predict_proba(features)

    top5_classes = np.argsort(prediction[0])[-5:]
    top5_crops = [crop_dict[idx + 1] for idx in top5_classes]
    top5_crops.reverse()
    # print("Top 5 best crops to be cultivated:", top5_crops)

    # Create JSON response
    result = {
        "message": "Prediction successful",
        "id": id,
        "Crop1": top5_crops[0],
        "Crop2": top5_crops[1],
        "Crop3": top5_crops[2],
        "Crop4": top5_crops[3],
        "Crop5": top5_crops[4],
    }

     # Making a POST request to your Crop API to save the data
    crop_api_url = "http://localhost:4999/crop"
    crop_data = {
        "id": id,
        "Crop1": top5_crops[0],
        "Crop2": top5_crops[1],
        "Crop3": top5_crops[2],
        "Crop4": top5_crops[3],
        "Crop5": top5_crops[4]
    }
    crop_response = requests.post(crop_api_url, json=crop_data)

    # Check if the data was saved successfully
    if crop_response.status_code == 200:
        print("Crop data saved successfully")
    else:
        print( crop_response.text)


    # Return JSON response
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)