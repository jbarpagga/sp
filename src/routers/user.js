const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


router.get('/usermanager', (req, res) => {
    User.find().then((users) => {
        res.render('usermanager', {
            title: "Users List",
            name: "JB",
            user: users
        })
    }).catch(() => {

    })
})

//For later use. code displayed with both async await and regular way.
router.get('/adduser/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        res.render('adduser', {
            name: "Jag Barpagga",
            title: "Edit User",
            user: user
        }) 
    } catch (e) {
        res.status(500).send("No user found with id " + _id)
    }
    
})

router.get('/adduser', (req, res) => {
    res.render('adduser', {
        title: "Add User...",
        name: "Jag Barpagga"
    })
})

router.get('/addOrEdit', (req, res) => {
    res.render('addOrEdit', {
        title: "Add User...",
        name: "Jag Barpagga"
    })
})

router.post('/addOrEdit', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.generateAuthToken()
        await user.save()
        //res.send(req.body)
        res.status(200).redirect('usermanager')
    }catch(e){
        res.status(400).send(e.message)
    }
})


//async await way of doing things
router.post('/adduser', async (req, res) => {
    const user = new User(req.body);
   try {
        await user.generateAuthToken()
        await user.save()
        res.status(200).redirect('usermanager')
    } catch (e) {
        res.status(400).send(e.message)
    }
})


router.post('/login', async (req, res) => {
    if(req.body.emailAdd == '') {
       return res.send('Please provide email address')
    }else if(req.body.password == '') {
        return res.send('Please provide password')
    }
    try{
        const user = await User.findByCredentials(req.body.emailAdd, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('auth', token)
        res.redirect(`clients`)
    }catch(e) {
        res.status(400).send("Error " + e)
    }
})


module.exports = router;