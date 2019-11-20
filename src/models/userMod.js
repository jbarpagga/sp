const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
/*
another example:
/ Define schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  a_string: String,
  a_date: Date
});

*/
let userSchema = new mongoose.Schema({
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
            if (value.toLowerCase() == 'password' || value.length < 6) {
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
        unique: true,
        uniqueCaseInsensitive: true,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    {
        timestamps: true
    })

/*
Methods functions are available on instances. This this function needs to bind "this". It has to be
a standard function 
*/

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewProject', {
        expiresIn:
            '15 minutes'
    })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

//setting up function for login.  Static functions are available on Models
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ emailAdd: email })
    if (!user) {
        throw new Error('Sorry invalid email')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Sorry invalid password')        
    }
    return user
}


//Setting up password hashing
userSchema.pre('save', async function (next) {
    const user = this //this is not required, instead this can be used
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;