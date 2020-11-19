from flask import Flask, request, json, Response, jsonify
from pymongo import MongoClient
### to read data format
### database:"name",
### collection:"name"

##### to write data format
##{
##    "database": "hostelManagementSystem",
##    "collection": "users",
##    "Document": {
##        "name": "TestF TestL",
##        "email": "testemail@test.com",
##        "phone": "987543210",
##        "fPhone": "1234567890",
##        "aadharNo": 111111111111,
##        "faadharNo": 222222222222,
##        "fname": "fTestF fTestL",
##        "college": "Test College Name",
##        "address": "Test Address name",
##        "price": 12000,
##        "security": 1000,
##        "startdate": "2020-07-13T00:00:00.000+00:00",
##        "isActive": 1,
##        "assigned": [1,2,1,18]
##    }
##}
class MongoAPI:
    def __init__(self, data):
        self.client = MongoClient("mongodb://localhost:27017/")
        database = data['database']
        collection = data['collection']
        cursor = self.client[database]
        self.collection = cursor[collection]
        self.data = data
    def write(self, data):
        new_document = data['document']
        response = self.collection.insert_one(new_document)
        output = {'Status': '1',
                  'Document_ID': str(response.inserted_id)}
        return output
    def read(self):
        print(self.data)
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def aadharCheck(self):
        print(self.data)
        documents = self.collection.find({"aadharNo":self.data['aadharNo']})
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def getRooms(self):
        print(self.data)
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def readUsers(self):
        print(self.data)
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
app = Flask(__name__)
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.write(data)
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/aadharCheck', methods=['POST'])
def aadhar_check():
    data = request.json
    if data is None or data == {}:
        print("No data")
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.aadharCheck()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/getRooms', methods=['POST'])
def get_rooms():
    data = request.json
    if data is None or data == {}:
        print("No data")
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.getRooms()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/readUsers', methods=['POST'])
def read_users():
    data = request.json
    if data is None or data == {}:
        print("No data")
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.readUsers()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json') 

if __name__ == '__main__':
    data={}
    app.run(use_reloader=False, debug=True, port=5001, host='127.0.0.1')
