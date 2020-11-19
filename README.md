###Examination System Documentation###

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
