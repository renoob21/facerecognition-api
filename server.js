// * NPM Packages Imports
const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors')
const knex = require('knex')


const db = knex({
    client:'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'facerecognition'
    }
})

// * Import controller modules
const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const clarifai = require('./controllers/clarifai')
const image = require('./controllers/image')

// db.select('*').from('users').then(data => console.log(data))

app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send('success')
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.post('/imageurl', (req, res) => {clarifai.handleAPICall(req, res)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})



app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})
