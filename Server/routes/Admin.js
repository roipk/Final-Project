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

router.route('/createUser').post(async  function (req, res) {
  console.log("create user")
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
