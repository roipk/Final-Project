

const express = require('express')
const cors = require('cors')

const bodyParser = require("body-parser");
const path = require("path")

require('dotenv').config()
const mongo = require("./Server/Mongo/mongodb").mongo;
const app = express()
const port = process.env.Port || 5000


const VerifyToken = require("./Server/middleware/user").VerifyToken
const CreateToken = require("./Server/middleware/user").CreateToken
const db = require("./Server/Mongo/mongodb").db
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


const userRouter = require('./Server/routes/users')

app.use('/users/:id',userRouter)


app.listen(port,async ()=>{
    console.log(`server is running on port: ${port}`)
})


app.get('/login',async  function (req, res) {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const {first_name,password} =  req.headers;

    if(token) {
        VerifyToken(req,res,token)
    }

    else if(first_name && password) {
        const user = await db.collection("users").findOne({first_name: first_name})
        let pass = await bcrypt.compare(password, user.password)
        if (user && pass) {
            delete user.password
            delete user.permissions
            CreateToken(user,res)
        }
    }

    else {
        return res.status(401).send("Invalid params");
    }
});


app.get('/admin',async  function (req, res) {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
        VerifyToken(req,res,token)
    }
})
app.get('/guide',async  function (req, res) {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
        VerifyToken(req,res,token)
    }
})

app.get('/', function (req, res) {
    // console.log(req)
    // console.log(path.join(__dirname, 'src', 'App.js'))
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



