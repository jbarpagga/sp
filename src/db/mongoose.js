//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/sp_db';

/* You can get the default Connection object with mongoose.connection. Once connected, the open event is fired on the Connection instance. */

mongoose.connect(mongoDB, { useNewUrlParser: true,  useCreateIndex: true,
    useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
Tip: If you need to create additional connections you can use mongoose.createConnection(). This takes the same form of database URI (with host, database, port, options etc.) as connect() and returns a Connection object).

*/