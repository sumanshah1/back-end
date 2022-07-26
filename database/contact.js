const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    message:String,
    subject:String
})



module.exports = mongoose.model("contacts", userSchema)