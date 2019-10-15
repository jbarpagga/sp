/* 
- sp database was created to understand the connection.  It's not used to store anything.  It's no longer there.
- Going forward this file has no value.
- In production sp-api database is used through mongoose.
- running this file will create sp database again.  
- database doesnt need to be created in advance. const db = client.db(databaseName) creates on fly.
*/


const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'sp'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to Database')
    }
    console.log('Connected Correctly!!')
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        name: 'Jag',
        age: 23
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert data')
        }

        console.log(result.ops)
    })
})

/* ***************
Following code is coming from the model file.
*/
//create instance of the mondel and pass the parameters
const me = new User({
    displayName: "John Sina",
    loginName: 'John',
    emailAdd: 'john@wn.com',
    active:true,
    password: 'abc123'
})

/*
To save to database, we use methods on our instance. Save method doesn't take any parameters.
Save returns a promise.
*/

me.save().then(() => {
    console.log(me)
}).catch((err) => {
    console.log('Error: ', err)
})
