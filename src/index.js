//This is starting point for our app.  Initially it was app.js.
const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const bodyParser = require('body-parser')
const userRouter = require("./routers/user")
const clientRouter = require('./routers/clientsRouter')
const ticketsRouter = require('./routers/ticketsRouter')
const timelogRouter = require('./routers/timelogRouter')
const kbRouter = require('./routers/kbRouter')
const reportsRouter = require('./routers/reportsRouter')
const settingsRouter = require('./routers/settingsRouter')
const cookieParser= require('cookie-parser')




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
hbs.registerHelper("dateFormat", function(date) {
    return (date.getMonth() > 9 ? (date.getMonth() + 1) : (0  + date.getMonth() + 1)) + '/'
    + (date.getDate() > 9 ? date.getDate(): (0 + getDate())) + '/'
    + date.getFullYear() 
})

//Use methods go after set methods
app.use(express.static(publicDirPath));

//parse incoming json request
app.use(express.json())
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.urlencoded({extended: false})
//this is needed to route from routers folder using router
app.use(userRouter)
app.use(clientRouter)
app.use(ticketsRouter)
app.use(timelogRouter)
app.use(kbRouter)
app.use(reportsRouter)
app.use(settingsRouter)
app.use(cookieParser())

app.get('', (req, res) => {
    res.render('login', {
        title: 'Login Page',
        name: "Jag Barpagga"
    })
})

app.listen(port, () => {
    console.log(__dirname)
    console.log("Server is running on port " + port)
})