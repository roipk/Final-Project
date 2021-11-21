const db= require("../Mongo/mongodb").db

const router = require('express').Router()
let User = require('../models/users.model')
var CryptoJS = require("crypto-js");
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt")
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const VerifyToken = require("../middleware/user").VerifyToken
const CreateToken = require("../middleware/user").CreateToken

router.route('/createUser').post(async  function (req, res) {
   let user =  await addUser(req,'Authentication')
    // console.log("create user")
    res.status(200).json('create user:'+user)
});
router.route('/getUser').get(async  function (req, res) {
    console.log("this is user")
});
router.route('/editUser').post(async  function (req, res) {
    console.log("update user")
});
router.route('/DeleteUser').post(async  function (req, res) {
    console.log("delete user")
});

module.exports = router



async function addUser(req,nameCollection){
    // await db.collection("users").insertOne(req.body)
    req.body.password = await bcrypt.hash(req.body.password,saltRounds)
    var newUser =await db.collection(nameCollection).insertOne(req.body)
    return newUser;
}
