
const express = require('express')
const cors = require('cors')

const bodyParser = require("body-parser");
const path = require("path")

require('dotenv').config()

const mongo = require("./Server/Mongo/mongodb").mongo;
const app = express()
const port = process.env.Port || 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// const url = 'mongodb://localhost:27017/FinalProject'

// mongodb.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//
// }, err => {
//     if(err) throw err;
//     // console.log('Connected to MongoDB!!!')
// });



// const connection = mongoose.connection
// connection.once('open',()=>{
//     console.log("MongoDB connection successfully")
// })


const exerciseRouter = require('./Server/routes/exercise')
const userRouter = require('./Server/routes/users')
// const db = require('./Server/Mongo/mongodb')

app.use('/admo',exerciseRouter)
app.use('/users',userRouter)



app.listen(port,async ()=>{
    console.log(`server is running on port: ${port}`)
    // await mongo.connect()
})



app.get('/', function (req, res) {
    console.log(path.join(__dirname, 'src', 'App.js'))
    res.sendFile(path.join(__dirname, 'src', 'App.js'));
});

app.get('/admin', function (req, res) {
    console.log(path.join(__dirname, 'src', 'App.js'))
    // res.sendFile(path.join(__dirname, 'src', 'App.js'));
});


// const debug = require('debug');
// const path = require('path');
// // const db = require('./db');
// const PLAYLISTSIZE = 50;
//
// var CryptoJS = require("crypto-js");


