### Examination System Documentation

This currently the rough documentation for examination system.

19 Nov- Create Registration for user as well as login for user and admin
      
        Columns required while registration are
        First Name
        Last Name
        Phone Number
        Email
        Password
        Re Password
        
        While uploading the JSON Object details you will put in json are
        {
        "contact": "7017239393",
        "createdBy": -1,
        "createdOn": get.Date(),
        "email": "test@gmail.com",
        "fname": "test",
        "isActive": 1,
        "level": 2,
        "lname": "AdminL",
        "password": "1234",
        "username": "Testusername"
        }
        Primary field is contact and email
        Cant be duplicate
        
        API- Created
          /readUsers
          /register
          
        After successful user validation user redirect to dashboard
        After successful registration user redirects to login

20 Nov- Create SubAdmin Dashboard

            Sub Admin
            Note that subadmin dashboard can only be accessed by users having level 1
            Create Subjects
            View Subjects
            Edit Subjects
            Create Test for specific subject
            View Test for specific subjects
            View All Tests
            Edit Test for specific subjects
            After Test Creation Add Questions to tests
            Question Format
                  Question (Type text or insert image button)
                  choice 1
                  choice 2
                  choice 3
                  choice 4
                  correct
            View Test Submissions(Subject Wise and Test Wise)
            
            API's created
            
            /createSubject
            {
                "database": "ExaminationSystem",
                "collection": "subjects",
                "document": {
                    "createdBy": CurrentUserID,
                    "isActive": 1,
                    "subid": 2,
                    "subname": "Test Subject2"
                }
            }
            
            /getSubjects
            {
                "database":"ExaminationSystem",
                "collection":"subjects"
            }
            
            /updateSubject
            {
                "database": "ExaminationSystem",
                "collection": "subjects",
                "Filter":{
                    "subid":2
                },
                "DataToBeUpdated": {
                    "createdBy": 1,
                    "isActive": 1,
                    "subid": 2,
                    "subname": "Test Subject2"
                }
            }
            
            /createTest
            {
                "database": "ExaminationSystem",
                "collection": "tests",
                "document": {
                    "testid":1,
                    "testname":"testname",
                    "subid":2,
                    "createdBy":currentUserID,
                    "isActive":1
                }
            }
            
            /viewTests
                  {
                      "database": "ExaminationSystem",
                      "collection": "tests",
                      "Filter":{
                          "subid":1 (If no filter exists it will return all indexes)(filter is the complete '"subid":1' and can be anything according to requirement)
                      }
                  }
                  
            /updateTest
            {
                "database": "ExaminationSystem",
                "collection": "subjects",
                "Filter":{
                    "testid":test id to be updated
                },
                "DataToBeUpdated": {
                      "testid":1,
                          "testname":"testname",
                          "subid":2,
                          "createdBy":currentUserID,
                          "isActive":1
                }
            }

### Pages till now..
 - login (/login)
 - register (/register)
 - subadminlogin (/sub-admin-login)
 - subadmindashboard (/sub-admin-dashboard)  ------> view subjects

                                              ------> create subjects

                                              -------> create test
 - 404 page not found (/*) 
 - createtest (/createtest)  
 - viewtest (/test)           
