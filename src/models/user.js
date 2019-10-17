const mongoose = require('mongoose')
const validator = require('validator')
/*
connect to mongoose, use same url as mongodb but specify database name in the url.
mongoose db name is going to be different then mongodb, exp we called it sp-api

*/

mongoose.connect('mongodb://127.0.0.1:27017/sp-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

//create user mondel. Model name starts with upper case
/* 
    in the exp below word validate represent a function that takes a parameter. Whereas "validator" is a library
    that has functions like isEmail etc.
*/

const User = mongoose.model('User', {
    displayName: {
        type: String,
        required: true
    },
    loginName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase() == 'password' || (!validator.isAlphanumeric(value) || value.length < 6)) {
                throw new Error('Password should contain letters & digits, it cannot be password and less then 6 characters')
            }
        }

    },

    comment: {
        type: String,
    },
    
    emailAdd: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }

    },
    active: {
        type: Boolean,
        required: true,
    },
    lockedOut: {
        type: Boolean,
        required: true,
        default: true
    },
})


module.exports = User;