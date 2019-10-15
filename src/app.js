const path = require('path')
const app = express();
const hbs = require('hbs')

const express = require('express')
const port = process.env.PORT || 3000   //Heroku provide port through process.env.PORT

//setting up directory path
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirPath));

//setting templating engine
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: "Login Page",
        name: "Jag Barpagga"
    })
})

//setting server port
app.listen(port, () => {
    console.log("Server is running on port " + port)
})