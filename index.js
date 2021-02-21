//store express into a variable to use in file
const express = require ('express')

const PORT = 9000

//create an app out of express 
const app = express()

//start listening for network activity 
app.listen(PORT, ()=> {
    console.log('server is listening on localhost', PORT)
})

/*
//‘/', which returns the message "Welcome to our schedule website".
app.get('/', (req, res) => {

    const message = "Welcome to our schedule website"
    res.render('pages/content_welcome_message', {
        message: message
    })
})
*/

// import data from data.js module 

const data = require('./data.js')


//‘/users’, which returns the list of users

const users = data.users
app.get('/users', (req, res) => {
    res.render('pages/content_users', {
        users: users

    })

    
})



//‘/schedules’, which returns the list of schedules

const schedules = data.schedules
app.get('/schedules', (req, res) => {
    res.render('pages/content_schedules', {
        schedules: schedules

    })

    
})



// the URL '/users/2' will return the information of user n°2

/*
app.get('/users/:userName', (req, res) => {
    const givenUser = data.users[req.params.userName]
    res.render('pages/content_given_user', {
        givenUser: givenUser

    })
    
})

*/


// the URL '/users/2/schedules' will return a list of all schedules for user n°2


app.get('/users/:userId/schedules', (req, res) => {
    const schedulesUserId = data.schedules.filter(info =>
        info.user_id === parseInt(req.params.userId))

    res.render('pages/content_user_schedule', {
        schedulesUserId: schedulesUserId

    })

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

// import crypto library 
const crypto = require('crypto');


// ‘/users’ (this time in POST!) to add a new user. It will return the newly created user. The user's password must be encrypted in SHA256.

/*
app.post('/users/new', (req, res) => {

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

*/


// template file 

const morgan = require('morgan')
app.use(morgan('dev'))

app.set('view engine', 'ejs')


//A '/users/new' route that displays a form to create a new user

app.get('/users/new', (req, res) => {
    res.render('pages/content_users_new', {
        
    })

    
})

app.post('/users/new', (req, res) => {
    res.render('pages/content_users_new', {
    })
    
const hash = crypto.createHash('sha256').update(req.body.password).digest('hex');

const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash
}

data.users.push(newUser);
console.log(data.users)
    
})

// post the new user to data.users above 

//get form 

//A '/schedules/new' route that displays a form to create a new schedule.


//datatbase stuff

const database = require('./database')

app.get('/', (req, res) => {

    database.any('SELECT * from schedules;')

    //promise 

    .then((response) => {
        console.log(response)
    })
    
    .catch((err) => {
        console.log(err)
    })

    })

    

//C - step 2 

//Create a route "/" that will retrieve the list of existing schedules from the database and display them.



