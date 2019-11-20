const jwt = require('jsonwebtoken')
const User = require('../models/userMod')


const auth = async (req, res, next) => {
    try{
        const token = req.cookies.auth;
        console.log(req.cookies)
        //const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewProject')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user) {
            return 'Error getting token'
        }
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }

}

module.exports = auth;