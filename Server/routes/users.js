

const db= require("../Mongo/mongodb").db

const router = require('express').Router()
let User = require('../models/users.model')
var CryptoJS = require("crypto-js");
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const VerifyToken = require("../middleware/user").VerifyToken
const CreateToken = require("../middleware/user").CreateToken

router.route('/login').get(async  function (req, res) {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const {user_name,password} =  req.headers;


    if(token) {
        VerifyToken(req,res,token)
    }

    else if(user_name && password) {
        const user = await db.collection("Authentication").findOne({user_name: user_name})
        // console.log(user)
        if(!user)
            return res.status(400).send("USER_NOT_FOUND");
        let pass = await bcrypt.compare(password, user.password)
        if(!pass)
            return res.status(400).send("INVALID_PASSWORD");


        delete user.password
        delete user.permissions
        return CreateToken(user, res)

    }

    else {
        return res.status(401).send("Invalid params");
    }
});

router.route('/:user').get(async  function (req, res) {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
        VerifyToken(req,res,token)
    }
});

// router.route('admin/createUser').post(async  function (req, res) {
//     let user =  await addUser(req,'users')
//     console.log("create user")
//     console.log("user")
//     res.status(200).json('create user:'+user)
// });
// router.route('/user').get(async  function (req, res) {

//     const token = req.body.token || req.query.token || req.headers["x-access-token"];

//     if (token) {
//         VerifyToken(req,res,token)
//     }
// });





async function getUser(userId){
    // return await db.collection("users").findOne({_id:ObjectId(userId)})
    return await db.collection("users").findOne()

}

async function addUser(req,nameCollection){
    await db.collection(nameCollection).insertOne(req.body)
    var newUser =await db.collection(nameCollection).insertOne(req.body)
    return newUser;
}

async function updateUser(req) {
    // const userData = {$set: {
    //         userName: req.body.userName,
    //         password: "1234qqq",
    //         test:"in1"
    //         // userName: req.body.userName,
    //         // tamaringaId: req.body.userName.toString(),
    //     }};
    //
    // // db.collection("users").find(ObjectId("4ecc05e55dd98a436ddcc47c"))
    // const query = {"_id":ObjectId("616225d0d1f8f8060b33ae3c")};
    // const options = {"upsert": true};
    // // UserData.
    // var update = await db.collection("users").updateOne(query, userData, options)
    //
    //
    // // res.send(id)
    // console.log("update")
}

async function DeleteUser(req) {

}




module.exports = router
