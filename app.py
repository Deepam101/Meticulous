
from analyser import analyser, percentage_text_to_image, data
import flask
import numpy as np
from flask_pymongo import PyMongo
import pymongo
import gridfs
import base64
import io
from flask import Flask, request, jsonify, render_template
from flask import send_file



app = Flask(__name__)

app.config["MONGO_URI"]  = "mongodb://localhost:27017/file_materials"
mongodb_client = PyMongo(app)
db = mongodb_client.db
fs = gridfs.GridFS(db)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'fileUpload' in request.files:
        file = request.files['fileUpload']
        encoded_string = base64.b64encode(file.read())
        # mongodb_client.save_file(file.filename, file)
        with fs.new_file(
        chunkSize=800000,
        filename=file.filename) as fp:
            fp.write(encoded_string)
        runanalyser(file.filename)
        return "Upload Succesful"
    return "Unable to upload file"

@app.route('/file/<filename>')
def file(filename):
    data = fs.find_one(filter=dict(filename=filename))
    with open(filename, "wb") as f:
        f.write(base64.b64decode(data.read()))
    print("sending file...")
    try:
        return send_file(filename)
    except Exception as e:
	    return str(e)

@app.route('/analysis/<filename>')
def analysis(filename):
    return render_template('analysis.html', pdf = filename, rating = 90 )

@app.route('/analysis/getdata', methods=['GET'])
def getsdata():
    getdata = data()
    return getdata

def runanalyser(filename):
    
    data_grid = fs.find_one(filter=dict(filename=filename))
    with open(filename, "wb") as f:
        f.write(base64.b64decode(data_grid.read()))
    with open(filename,'rb') as file:
        page_list = analyser(file)
        data_fetched = data()

if __name__ == "__main__":
    app.run(debug=True)