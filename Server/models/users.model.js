const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    password:{
        type: String,
        required: true,
        select:false,
        hidden:true

    }

},{
    timestamps:true,
})


const User = mongoose.model('User',userSchema)
module.exports = User
