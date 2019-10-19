const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sp1', {
    useNewUrlParser: true,
    useCreateIndex: true
})

/*** First model **/

const User = mongoose.model('User', {
    name: {
        type: String
    },

    age: {
        type: Number
    }
})

const me = new User({
    name: 'Jag',
    age: 26
})

me.save().then(() => {
    console.log(me)
}).catch((e) => {
    console.log('Error', e)
})

/*** Second model **/

const Cat = mongoose.model('Cat', {
    name: {
        type:String
    },

    age: {
        type: Number
    }

})

const cat = new Cat({
    name: 'Kitty',
    age:2
})

cat.save().then().catch();