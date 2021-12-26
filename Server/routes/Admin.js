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

   let user =await CreatData('Authentication',req.body,)
    console.log("create new Data")
    res.status(200).json(user)
});

router.route('/createUserInfo').post(async  function (req, res) {
    let user =await CreatData('UserInfo',req.body)
    console.log("create userInfo")
    res.status(200).json(user)
});

router.route('/createUserPlaylist').post(async  function (req, res) {

    let user =await CreatData('UserPlaylist',req.body)
    // console.log("create user")
    res.status(200).json(user)
});

router.route('/updateUserPlaylist/:Oid').post(async  function (req, res) {

    // console.log(req)
    let doc = req.params.Oid
    let data = req.body
    let userPlaylist = await updateData("UserPlaylist",doc,data)
    res.status(200).json(userPlaylist)
});


router.route('/getAllUserByType/:type').get(async  function (req, res) {

    let users = await getAllAuthType("Authentication",req.params.type)
    res.status(200).json(users)
});

router.route('/getUserById/:Oid').get(async  function (req, res) {
    let user = await getData("UserInfo",req.params.Oid)
    res.status(200).json(user)
});


router.route('/updateUserInfo/:Oid').post(async  function (req, res) {
    console.log("update user")
    let doc = req.params.Oid
    let data = req.body
    let userInfo = await updateData("UserInfo",doc,data)
    res.status(200).json(userInfo)

});



router.route('/DeleteUser/:id').get(async  function (req, res) {
    console.log("delete user")
    await deleteData("Authentication",req.params.id)
    await deleteData("UserInfo",req.params.id)
    await deleteData("UserPlaylist",req.params.id)
    res.status(200).json()
});

module.exports = router




async function CreatData(nameCollection,data){
    if( data.password)
        data.password = await bcrypt.hash(data.password,saltRounds)
    var newData = await db.collection(nameCollection).insertOne(data)
    return newData;
}

async function getData(nameCollection,Oid){
        return await db.collection(nameCollection).findOne({Oid:Oid})
}

async function updateData(nameCollection,doc,data){
    console.log(doc)
    var newData = await db.collection(nameCollection).replaceOne({Oid: doc}, data);
    return newData;
}

async function deleteData(nameCollection,Oid) {
    if(nameCollection == "Authentication")
        db.collection(nameCollection).deleteOne({_id: ObjectId(Oid)})
    else
        db.collection(nameCollection).deleteOne({Oid:Oid})
}

async function getAllAuthType(nameCollection,type){
    var newData = await db.collection(nameCollection).find({ type: type })
    let users=[]
    await newData.forEach(user=>{
        user.password=""
        users.push(user)
    })
    return users;
}
//
// {
//     Oid: {
//         data: {
//             _id: '61b5331bb5ca171bcdf8a462',
//                 Oid: '61b5331bb5ca171bcdf8a461',
//                 Geners: [Array],
//                 LanguageAtTwenty: [Array],
//                 birthYear: 1991,
//                 countryAtTwenty: 'Israel',
//                 countryOrigin: 'Israel',
//                 department: '11',
//                 entrance: 0,
//                 firstLangAtTwenty: 'he',
//                 first_name: '11',
//                 group: 'IsraelHE2011',
//                 languageOrigin: 'Hebrew',
//                 last_name: '11',
//                 medicalProfile: '11',
//                 nursingHome: '11',
//                 secondLangAtTwenty: 'en',
//                 userName: '11',
//                 yearAtTwenty: 2011,
//                 yearOfImmigration: 1991
//         },
//     },
//     Geners: [ 'cla', 'mid' ],
//         LanguageAtTwenty: [ 'Hebrew', 'English' ],
//     birthYear: 2021,
//     countryAtTwenty: 'Israel',
//     countryOrigin: 'Israel',
//     department: '11',
//     entrance: 0,
//     firstLangAtTwenty: 'he',
//     first_name: '11',
//     group: 'IsraelHebrew2041',
//     languageOrigin: 'Hebrew',
//     last_name: '11',
//     medicalProfile: '11',
//     nursingHome: '11',
//     secondLangAtTwenty: 'en',
//     userName: '11',
//     yearAtTwenty: 2041,
//     yearOfImmigration: 1991
// }

// {
//     "_id": "61bfa29b9a31bb0f05142047",
//     "Oid": "61bfa29b9a31bb0f05142046",
//     "Geners": [
//     "cla",
//     "mid"
// ],
//     "LanguageAtTwenty": [
//     "he",
//     "en"
// ],
//     "birthYear": 1991,
//     "countryAtTwenty": "IL",
//     "countryOrigin": "IL",
//     "department": "11",
//     "entrance": 0,
//     "firstLangAtTwenty": "he",
//     "first_name": "11",
//     "group": "ILhe2011",
//     "languageOrigin": "he",
//     "last_name": "11",
//     "medicalProfile": "11",
//     "nursingHome": "11",
//     "secondLangAtTwenty": "en",
//     "userName": "11",
//     "yearAtTwenty": 2011,
//     "yearOfImmigration": 1991
// }
