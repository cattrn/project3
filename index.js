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


// import data from data.js module 

const data = require('./data.js')


//‘/users’, which returns the list of users

app.get('/users', (req, res) => {

    res.json(data.users) 
})


//‘/schedules’, which returns the list of schedules

app.get('/schedules', (req, res) => {

    res.json(data.schedules) 
})


// the URL '/users/2' will return the information of user n°2

app.get('/users/:userName', (req, res) => {

    res.json(data.users[req.params.userName])

})


// the URL '/users/2/schedules' will return a list of all schedules for user n°2


app.get('/users/:userId/schedules', (req, res) => {
    const schedulesUserId = data.schedules.filter(info => {
        return info.user_id === parseInt(req.params.userId)
    })

    res.json(schedulesUserId)

})

//install midleware 
app.use(express.urlencoded({ extended: false}));
app.use(express.json())

// ‘/schedules’ to add a new schedule. It will return the newly created schedule.

app.post('/schedules', (req, res) => {
    const newSchedule = {
        user_id: +req.query.user_id,
        day: +req.query.day,
        start_at: req.query.start_at,
        end_at: req.query.end_at,
    }
    data.schedules.push(newSchedule);

    res.send(data.schedules)
})

//import crypto library 
const crypto = require('crypto');


// ‘/users’ (this time in POST!) to add a new user. It will return the newly created user. The user's password must be encrypted in SHA256.

app.post('/users', (req, res) => {

const hash = crypto.createHash('sha256').update(req.query.password).digest('hex');

const newUser = {
    firstname: req.query.firstname,
    lastname: req.query.lastname,
    email: req.query.email,
    password: hash,
}

data.users.push(newUser);

res.send(data.users)

})




/*
// template file 

const morgan = require('morgan')
app.use(morgan('dev'))

app.set('view engine', 'ejs')


// getting data from the index.ejs file and printing on browser 
app.get ('/juliette', function(req,res) {
    res.render('pages/index', {
        myName: myName
    })
})

*/