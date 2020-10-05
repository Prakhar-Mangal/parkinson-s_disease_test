from flask import Flask, request,jsonify
from flask_cors import CORS
from datauri import DataURI
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'application/json'

from script import *

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/get/eight',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
        img_data=request.json['data']
        uri=DataURI(img_data)
     
        fd=open("tmp.png",'wb')
        fd.write(uri.data)
        fd.close()
        res=pre('tmp.png')
        print(res)
        return jsonify({'p':str(res[0]),'np':str(res[1])})
   else:
        return "GET Eight"

if __name__ == '__main__':
     app.run(host='0.0.0.0', port=5000)