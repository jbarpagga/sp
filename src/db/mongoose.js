const mongoose = require('mongoose')
/*
connect to mongoose, use same url as mongodb but specify database name in the url.
mongoose db name is going to be different then mongodb, exp we called it sp-api

*/

mongoose.connect('mongodb://127.0.0.1:27017/sp', {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
