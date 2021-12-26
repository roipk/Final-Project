const db= require("../Mongo/mongodb").db

const routerElder = require('express').Router()
let User = require('../models/users.model')
var CryptoJS = require("crypto-js");
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt")
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const VerifyToken = require("../middleware/user").VerifyToken
const CreateToken = require("../middleware/user").CreateToken



routerElder.route('/session/:id').get(async  function (req, res) {
    var resolvedPromisesArray=[]
    let session = await getData("UserPlaylist",req.params.id)
    // let y = await getDataFilter("playlists",session.playlistUser.genre[0])
    console.log(session.playlistUser.genre[0])

    session.playlistUser.genre.forEach(item=>{
        let p = new Promise((data)=>
            setTimeout(data, 100,  getDataFilter("playlists",item)));
        resolvedPromisesArray.push(p)
    })

    // console.log(item)
    console.log("start")
    let prom = await Promise.all(resolvedPromisesArray);
    console.log("end")
// immediately logging the value of p
    let songs =[]
    prom.forEach(item=>{
        item.records.forEach(song=>{
                songs.push(song)
        })

    })

    songs = songs.slice(0,8)
    console.log(songs)
   // console.log("elder")
   // console.log(req.params.id)
   // console.log(session)
   //  res.status(200)
    res.status(200).json(songs)
});


async function getData(nameCollection,Oid){
    return await db.collection(nameCollection).findOne({Oid:Oid})
}
async function getDataFilter(nameCollection,filter){
    return await db.collection(nameCollection).findOne({name: filter})
}
module.exports = routerElder



