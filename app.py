from flask import Flask, request, json, Response, jsonify
from pymongo import MongoClient
### to read data format
### database:"name",
### collection:"name"

##### to write data format
##{
##    "database": "ExaminationSystem",
##    "collection": "users",
##    "Document": {
##        
##    }
##}

###to login
### database:"name",
### collection:"name",
### username:"username",
### password:"password"

class MongoAPI:
    def __init__(self, data):
        self.client = MongoClient("mongodb+srv://allplayertest:qwerty1234@examinationsystem.sqwfq.mongodb.net/Examinatipn?retryWrites=true&w=majority")
        database = data['database']
        collection = data['collection']
        cursor = self.client.get_database(database)
        print(cursor)
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
    def readUsers(self):
        print(self.data)
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def login(self):
        print(self.data)
        documents = self.collection.find({"email": self.data['username'],"password":self.data['password'],"isActive":1},{'createdBy':0,'createdOn':0,'isActive':0,'password':0,'email':0,'contact':0,'fname':0,'lname':0})
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
@app.route('/login', methods=['POST'])
def login_class():
    data = request.json
    if data is None or data == {}:
        print("No data")
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.login()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/createSubject', methods=['POST'])
def create_subject():
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
@app.route('/createTest', methods=['POST'])
def create_test():
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
@app.route('/getSubjects', methods=['POST'])
def get_subjects():
    data = request.json
    if data is None or data == {}:
        print("No data")
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.read()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json') 
if __name__ == '__main__':
    data={}
    app.run(use_reloader=False, debug=True, port=5001, host='127.0.0.1')
