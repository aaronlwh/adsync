const User = require("../models/users.js")
const bcrypt = require("bcrypt")

const registerUser = async (req,res) => {
    try {
        const hashedPassword =  await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: hashedPassword,
        })
        await newUser.save()
        console.log(newUser)
        res.redirect("/login")
    } catch (e) {
        res.redirect("/register")
        console.log(e)
    }
}

module.exports = registerUser