//This is starting point for our app.  Initially it was app.js.
const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const User = require('./models/user')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 3000

//setting up directory path
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting templating engine
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Use methods go after set methods
app.use(express.static(publicDirPath));

//parse incoming json request
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json())

app.get('/usermanager', (req, res) => {
    User.find().then((users) => {
        res.send(users)
        // res.render('usermanager', {
        //     //dp: users[0].displayName
        //     })
    }).catch(() => {

    })
})


//For later use
app.get('/usermanager/:id', (req, res) => {
    const _id = req.params.id;
    console.log(_id)
    User.findById(_id).then((result) => {
        if (!result) {
            return res.status(404).send()
        }
        res.send(result)
    }).catch((e) => {
        return res.status(500).send()
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: "Login Page",
        name: "Jag Barpagga"
    })
})

app.get('/users', (req, res) => {
    res.render('users', {
        title: "Add User...",
        name: "Jag Barpagga"
    })
})

app.post('/users', (req, res) => {
    // res.render('usermanager', {
    //     title: "User Manager",
    //     name: "Jag Barpagga"
    // } )
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log(__dirname)
    console.log("Server is running on port " + port)
})