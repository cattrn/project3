//store express into a variable to use in file
const express = require ('express')

const PORT = 3000

//create an app out of express 
const app = express()

//start listening for network activity 
app.listen(PORT, ()=> {
    console.log('server is listening on localhost', PORT)
})

//‘/', which returns the message "Welcome to our schedule website".
app.get('/', (req, res) => {

    res.send("<h1>Welcome to our schedule website</h1>")
})


// import users object from data.js module 

const users = require('./data.js')


//‘/users’, which returns the list of users

app.get('/users', (req, res) => {

    res.json(users) 
})


// import shedules object from data.js module

const schedules = require('./data.js')


//‘/schedules’, which returns the list of schedules

app.get('/schedules', (req, res) => {

    res.json(schedules) 
})

