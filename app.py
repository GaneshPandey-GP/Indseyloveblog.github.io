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
        self.collection = cursor[collection]
        self.data = data
    def write(self, data):
        new_document = data['document']
        response = self.collection.insert_one(new_document)
        output = {'Status': '1',
                  'Document_ID': str(response.inserted_id)}
        return output
    def read(self):
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def readWithFilter(self):
        filt = self.data['Filter']
        documents = self.collection.find(filt)
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def readUsers(self):
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def login(self):
        documents = self.collection.find({"email": self.data['username'],"password":self.data['password'],"isActive":1},{'createdBy':0,'createdOn':0,'isActive':0,'password':0,'email':0,'contact':0,'fname':0,'lname':0})
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
    def update(self):
        filt = self.data['Filter']
        updated_data = {"$set": self.data['DataToBeUpdated']}
        response = self.collection.update_one(filt, updated_data)
        output = {'Status': '1' if response.modified_count > 0 else "Nothing was updated."}
        return output
    def getSequences(self):
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output
app = Flask(__name__)
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    data2=json.loads('{"database":"ExaminationSystem","collection":"sequences"}')
    obj2 = MongoAPI(data2)
    print(obj2.getSequences()[0].get('userSequence'))
    cid=(obj2.getSequences()[0].get('userSequence'))
    print(cid)
    
    data['document']['uid']=cid
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.write(data)
    cid2=cid+1
    data3=json.loads('{"database":"ExaminationSystem","collection":"sequences","Filter":{"userSequence":'+str(cid)+'},"DataToBeUpdated":{"userSequence":'+str(cid2)+'}}')
    obj3 = MongoAPI(data3)
    obj3.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/readUsers', methods=['POST'])
def read_users():
    data = request.json
    if data is None or data == {}:
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
    data2=json.loads('{"database":"ExaminationSystem","collection":"sequences"}')
    obj2 = MongoAPI(data2)
    print(obj2.getSequences()[0].get('subjectSequence'))
    cid=(obj2.getSequences()[0].get('subjectSequence'))
    print(cid)
    data['document']['subid']=cid
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.write(data)
    cid2=cid+1
    data3=json.loads('{"database":"ExaminationSystem","collection":"sequences","Filter":{"subjectSequence":'+str(cid)+'},"DataToBeUpdated":{"subjectSequence":'+str(cid2)+'}}')
    obj3 = MongoAPI(data3)
    obj3.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
    
@app.route('/createTest', methods=['POST'])
def create_test():
    data = request.json
    print(data)
    data4=json.loads('{"database":"ExaminationSystem","collection":"subjects","Filter":{"subid":'+data["document"]["subjectid"]+'}}')
    obj4 = MongoAPI(data4)
    subname=(obj4.readWithFilter()[0].get('subname'))
    data['document']['subname']=subname
    print(data)
    data2=json.loads('{"database":"ExaminationSystem","collection":"sequences"}')
    obj2 = MongoAPI(data2)
    print(obj2.getSequences()[0].get('testSequence'))
    cid=(obj2.getSequences()[0].get('testSequence'))
    print(cid)
    data['document']['testid']=cid
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.write(data)
    cid2=cid+1
    data3=json.loads('{"database":"ExaminationSystem","collection":"sequences","Filter":{"testSequence":'+str(cid)+'},"DataToBeUpdated":{"testSequence":'+str(cid2)+'}}')
    obj3 = MongoAPI(data3)
    obj3.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/getSubjects', methods=['POST'])
def get_subjects():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.readWithFilter()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/updateSubject', methods=['POST'])
def update_subject():
    data = request.json
    if data is None or data == {} or 'DataToBeUpdated' not in data:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/getTests', methods=['POST'])
def get_tests():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.readWithFilter()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/updateTest', methods=['POST'])
def update_test():
    data = request.json
    if data is None or data == {} or 'DataToBeUpdated' not in data:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/createQuestion', methods=['POST'])
def create_question():
    data = request.json
    data2=json.loads('{"database":"ExaminationSystem","collection":"sequences"}')
    obj2 = MongoAPI(data2)
    print(obj2.getSequences()[0].get('questionSequence'))
    cid=(obj2.getSequences()[0].get('questionSequence'))
    print(cid)
    data['document']['qid']=cid
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.write(data)
    cid2=cid+1
    data3=json.loads('{"database":"ExaminationSystem","collection":"sequences","Filter":{"questionSequence":'+str(cid)+'},"DataToBeUpdated":{"questionSequence":'+str(cid2)+'}}')
    obj3 = MongoAPI(data3)
    obj3.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/updateQuestion', methods=['POST'])
def update_question():
    data = request.json
    if data is None or data == {} or 'DataToBeUpdated' not in data:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/viewQuestions', methods=['POST'])
def get_questions():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.readWithFilter()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/createCategory', methods=['POST'])
def create_category():
    data = request.json
    data2=json.loads('{"database":"ExaminationSystem","collection":"sequences"}')
    obj2 = MongoAPI(data2)
    print(obj2.getSequences()[0].get('categorySequence'))
    cid=(obj2.getSequences()[0].get('categorySequence'))
    print(cid)
    data['document']['categoryid']=cid
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.write(data)
    cid2=cid+1
    data3=json.loads('{"database":"ExaminationSystem","collection":"sequences","Filter":{"categorySequence":'+str(cid)+'},"DataToBeUpdated":{"categorySequence":'+str(cid2)+'}}')
    obj3 = MongoAPI(data3)
    obj3.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/updateCategory', methods=['POST'])
def update_category():
    data = request.json
    if data is None or data == {} or 'DataToBeUpdated' not in data:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.update()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
@app.route('/viewCategory', methods=['POST'])
def get_category():
    data = request.json
    if data is None or data == {}:
        return Response(response=json.dumps({"Error": "Please provide connection information"}),
                        status=400,
                        mimetype='application/json')
    obj1 = MongoAPI(data)
    response = obj1.readWithFilter()
    return Response(response=json.dumps(response),
                    status=200,
                    mimetype='application/json')
if __name__ == '__main__':
    data={}
    app.run(use_reloader=False, debug=True, port=5001, host='127.0.0.1')
