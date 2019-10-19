const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sp-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

/*** First model **/

const User = mongoose.model('User', {
    name: {
        type: String
    }
})

const me = new User({ name: "jag"})
me.save()