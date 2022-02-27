

const express = require('express')
const cors = require('cors')

const bodyParser = require("body-parser");
const path = require("path")
const Config = require("../src/ConfigServer.json")

require('dotenv').config()
const mongo = require("./Mongo/mongodb").mongo;
const app = express()
const port = Config.Port|| 5000



const db = require("./Mongo/mongodb").db
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


const adminRouter = require('./routes/Admin')
const userRouter = require('./routes/users')
const elderRouter = require('./routes/elder')
const researcherRouter = require('./routes/researcher')

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/user',elderRouter)
app.use('/researcher',researcherRouter)




app.listen(port,async ()=>{
    console.log(`server is running on port: ${port}`)
})



// app.get('/', function (req, res) {
//     // console.log(req)
//     // console.log(path.join(__dirname, 'src', 'App.js'))
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });



