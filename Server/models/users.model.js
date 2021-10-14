const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongo= require("../Mongo/mongodb")

const userSchema = new Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    // email: { type: String, unique: true },
    password:{type: String, required: true},




},{
    timestamps:true,
})


module.exports = mongoose.model('User',userSchema)

