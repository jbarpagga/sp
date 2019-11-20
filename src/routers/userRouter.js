const express = require('express')
const router = new express.Router()
const User = require('../models/userMod')
const auth = require('../middleware/auth')


router.get('/usermanager', (req, res) => {
    User.find().then((users) => {
        res.render('usermanager', {
            title: "Users List",
            name: "Jag Barpagga",
            user: users
        })
    }).catch(() => {

    })
})

//For later use. code displayed with both async await and regular way.
router.get('/addedituser/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        res.render('addedituser', {
            name: "Jag Barpagga",
            title: "Edit User",
            user: user
        })
    } catch (e) {
        res.status(500).send("No user found with id " + _id)
    }

})

router.get('/deluser/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        res.render('deluser', {
            name: "Jag Barpagga",
            title: "Edit User",
            user: user
        })
    } catch (e) {
        res.status(500).send("No user found with id " + _id)
    }

})

router.get('/addedituser', (req, res) => {
    res.render('addedituser', {
        title: "Add User...",
        name: "Jag Barpagga"
    })
})

router.post('/addeditUser', async (req, res) => {
    const id = req.body.idField
    if (id === '') {
        const user = new User(req.body)
        try {
            await user.generateAuthToken()
            await user.save()
            res.status(200).redirect('/usermanager')
        } catch (e) {
            res.status(400).send(e.message)
        }
    } else {
        updateUser(id, req.body)
        res.status(200).redirect('/usermanager')
    }

})

router.post('/deluser', async (req, res) => {
    
    User.findOneAndRemove({ _id: req.body.idField }, (err, doc) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).send(doc.displayName + ' is deleted')
    })

})


const updateUser = async (id, body) => {
    await User.findByIdAndUpdate({ _id: id }, { new: true }, (err, doc) => {
        try {
            doc.displayName = body.displayName,
                doc.loginName = body.loginName,
                doc.comment = body.comment
            doc.emailAdd = body.emailAdd,
                doc.active = body.active,
                doc.lockedOut = body.lockedOut,
                doc.save()
        } catch (err) {
            throw new Error("Error: " + err)
        }

    })
}

router.post('/login', async (req, res) => {
    if (req.body.emailAdd == '') {
        return res.send('Please provide email address')
    } else if (req.body.password == '') {
        return res.send('Please provide password')
    }
    try {
        const user = await User.findByCredentials(req.body.emailAdd, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('auth', token)
        res.redirect(`clients`)
    } catch (e) {
        res.status(400).send("Error " + e)
    }
})

module.exports = router;