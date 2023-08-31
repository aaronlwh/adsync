const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const User = require("../models/users.js")

passport.use(new LocalStrategy
    (
        {
          usernameField: 'email',
          passwordField: 'password'
        }, 
        async (email, password, done) => {
          
            try {
              const user = await User.findOne({ email: email });
      
              if (!user) {
                return done(null, false, { message: 'User not found' });
              }
      
              const passwordMatches = await bcrypt.compare(password, user.hashedPassword);
              console.log(password)
              console.log(user.hashedPassword)
              
              if (!passwordMatches) {
                return done(null, false, { message: 'Incorrect password' });
              }
              console.log("Login success")
              return done(null, user)
              

            } catch (error) {
              return done(error);
            }
        }
    )
)

passport.serializeUser((user,done) => done(null, user.id))
passport.deserializeUser((id,done) => {
  User.findById(id)
  return done(null, id)
})
