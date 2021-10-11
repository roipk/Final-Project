const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthenticationSchema = new Schema({
    userName:{type:String, unique:true, required:true},
    id:{type:String},
    name:{type:String},
    lastName:{type:String},
    nikeName:{type:String},
    phone:{type:String},
    logout:{type:Boolean},
    lastLogin:{type:Date},

},{
    timestamps:true,
})


const Auth = mongoose.model('Exercise',AuthenticationSchema)
module.exports = Auth
