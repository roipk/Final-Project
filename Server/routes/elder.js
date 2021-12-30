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
    let session = await getData("UserSessions",req.params.id)
    if(!session.playList || session.playList.length<=0)//first time
    {
        // console.log("on user Session")
        var songs={
            songsView:[],
            songsBlock:[]
        }

        // console.log(session)
        var filters={
            maxSongs:session.maxSongs,
            languages:session.LanguageAtTwenty,
            genres:session.Geners ,
            fromYear:session.yearAtTwenty-10,
            toYear:session.yearAtTwenty+10,
        }
        var keys = Object.keys(filters)
        while (keys.length>1)
        {
            if(songs.songsView.length<session.maxSongs)
                songs = await createFilter(songs,filters,1)
            var p = keys.pop()
            delete filters[p]
        }

        session.playList=songs.songsBlock
        await updateData("UserSessions",session.Oid,session)
        return res.status(200).json(songs.songsView.slice(0,session.Cognitive))
    }
    else
    {


        if(!session.sessions)
            session.sessions = []
        var songs=session.playList.slice(
            (session.Cognitive*(session.sessions.length))%session.maxSongs,
            (session.Cognitive*(session.sessions.length+1))%session.maxSongs
        )

        var songSession = []
        await songs.forEach(song=>{
            songSession.push({date:new Date(),RecordDisplayId:song,score:0})
        })

        session.sessions.push(
            songSession
        )
        await updateData("UserSessions",session.Oid,session)
        songs = await getSongsById(songs)
        return res.status(200).json(songs)

    }












    // let y = await getDataFilter("playlists",session.playlistUser.genre[0])
    //
    // console.log(session.playlistUser.genre[0])
    // session.playlistUser.playlists.forEach(item=>{
    //     item.forEach(lan=>{
    //         let p = new Promise((data)=>
    //             setTimeout(data, 100,  getDataFilter("playlists",lan)));
    //         resolvedPromisesArray.push(p)
    //     })
    //
    // })
    // session.playlistUser.genre.forEach(item=>{
    //     // console.log(item)
    //     let p = new Promise((data)=>
    //         setTimeout(data, 100,  getDataFilter("playlists",item)));
    //     resolvedPromisesArray.push(p)
    // })
    //
    // // console.log(item)
    // console.log("start")
    // let prom = await Promise.all(resolvedPromisesArray);
    // console.log("end")
    // console.log(songs)
    // // var songs =await getSongs()
    // // var songs =await createFilter(105,[],[],1800,2021)
    //

    // res.status(200).json(songs)
    // res.status(200)
});

async function updateData(nameCollection,doc,data){
    // console.log(doc)
    var newData = await db.collection(nameCollection).replaceOne({Oid: doc}, data);
    return newData;
}

async function createFilter(songs={},filters,sort)
{

    // songsView:[],
    //     songsBlock:[]
    var filter =
        {$and: [
                filters.genres && filters.genres.length > 0 ?{genre:{$in:filters.genres}}:{} ,
                filters.languages && filters.languages.length>0? { language:  { $in: filters.languages } }:{},
            {year:{ $gte: filters.fromYear?filters.fromYear:1800}},
                {year:{ $lte: filters.toYear?filters.toYear:new Date().getFullYear()}},
                songs.songsBlock.length>0? {_id:{$nin:songs.songsBlock}}:{},
            ]}

    var tester  = await testgetAllDataFilter("RecordDisplay",filter,sort,filters.maxSongs-songs.songsView.length);
    // console.log("filter")
    // console.log(filter)
    // var count1 = 0
    await tester.forEach(item=>{
        // count1++
       songs.songsView.push(item)
       songs.songsBlock.push(item._id)
    })
    // console.log("------")
    // console.log(count1)
    // console.log("------")
    // console.log(songs.songsView.length)
    return songs

}


async function getSongsById(songs){
    var filter =  {_id:{$in:songs}}
    var songData=[]
    var tester  = await testgetAllDataFilter("RecordDisplay",filter);
    await tester.forEach(item=>{
        songData.push(item)
    })
    return songData
}

async function getData(nameCollection,Oid){
    return await db.collection(nameCollection).findOne({Oid:Oid})
}
async function getDataFilter(nameCollection,filter){
    return await db.collection(nameCollection).findOne({name: filter,})
}

async function getAllDataFilter(nameCollection,filter,sort=1,max=2,offset=0){
            max = max<2 ? 2 : max
        if(await db.collection(nameCollection).find(filter).skip(offset).count()<max)
            return await db.collection(nameCollection).find(filter).skip(0).limit(max).sort(sort)
        return await db.collection(nameCollection).find(filter).skip(offset).limit(max).sort(sort)
}

async function testgetAllDataFilter(nameCollection,filter,sort=1,max=35,offset=0){
    return await db.collection(nameCollection).find(filter).skip(offset).limit(max)

}
module.exports = routerElder



