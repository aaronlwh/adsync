if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const mongoose = require("mongoose")
const registerUser = require('./controllers/usersController')
require('./config/passport-config.js')

try{
    mongoose.connect(process.env.MONGODB_CONNECTION_URI)
    console.log("Connected to database")
} catch(e){
    console.log(e)
}


app.set('view-engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated, (req,res) => {
    res.render('index.ejs')
})

app.get('/login', checkNotAuthenticated, (req,res) => {
    res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req,res) => {
    res.render('register.ejs')
})


// add user to mongoDB
app.post('/register', checkNotAuthenticated, registerUser)

app.post('/login',passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/logout', (req,res) => {
    req.logOut(function(err) {
        if (err) { 
            return next(err)
        }
            res.redirect('/login')
    })
})

function checkAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
       return res.redirect('/')
    }

    next()
}

app.listen(3000)