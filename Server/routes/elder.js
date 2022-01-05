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


//
// routerElder.route('/session/:id').get(async  function (req, res) {
//     var resolvedPromisesArray=[]
//     let session = await getData("UserSessions",req.params.id)
//     if(!session.playList ||!session.playList[session.currentAlgorithm.toString()] )//first time
//     {
//     if(!session.playList)
//         session.playList={}
//     if(!session.playList[session.currentAlgorithm.toString()])
//         session.playList[session.currentAlgorithm.toString()]=[]
//
//
//         // console.log("on user Session")
//         var songs={
//             songsView:[],
//             songsBlock:[]
//         }
//         songs = await getSongs(session,songs)
//         // console.log(session)
//
//         return res.status(200).json(songs.songsView.slice(0,session.Cognitive))
//     }
//     else
//     {
//         var songs={
//             songsView:[],
//             songsBlock:[]
//         }
//         songs = await getSongs(session,songs)
//         //
//         // if(!session.sessions)
//         //     session.sessions = []
//         // var songs=session.playList[session.currentAlgorithm].slice(
//         //     (session.Cognitive*(session.sessions.length))%session.maxSongs,
//         //     (session.Cognitive*(session.sessions.length+1))%session.maxSongs
//         // )
//         //
//         var songSession = []
//         await songs.forEach(song=>{
//             songSession.push({date:new Date(),RecordDisplayId:song,score:0})
//         })
//
//         session.sessions.push(
//             songSession
//         )
//         // await updateData("UserSessions",session.Oid,session)
//         // songs = await getSongsById(songs)
//         songs.songsView=songs.songsView.slice(0,session.Cognitive)
//         console.log( songs.songsView)
//         return res.status(200).json(songs.songsView)
//
//     }
//
//
//
//    async function getSongs(session,songs)
//     {
//         var filters={
//             maxSongs:session.maxSongs,
//             languages:session.LanguageAtTwenty,
//             genres:session.Geners ,
//             fromYear:session.yearAtTwenty-10,
//             toYear:session.yearAtTwenty+10,
//         }
//         var keys = Object.keys(filters)
//         while (keys.length>1)
//         {
//             if(songs.songsView.length<session.maxSongs)
//                 songs = await createFilter(songs,filters,1)
//             var p = keys.pop()
//             delete filters[p]
//         }
//         console.log(session.currentAlgorithm)
//
//         if(!session.playList[session.currentAlgorithm.toString()])
//             session.playList.push({[session.currentAlgorithm.toString()]:[]})
//
//
//         console.log(session.playList)
//         session.playList[session.currentAlgorithm]=songs.songsBlock
//         await updateData("UserSessions",session.Oid,session)
//         return songs
//     }
//
//
//
//
//
//
//
//
//     // let y = await getDataFilter("playlists",session.playlistUser.genre[0])
//     //
//     // console.log(session.playlistUser.genre[0])
//     // session.playlistUser.playlists.forEach(item=>{
//     //     item.forEach(lan=>{
//     //         let p = new Promise((data)=>
//     //             setTimeout(data, 100,  getDataFilter("playlists",lan)));
//     //         resolvedPromisesArray.push(p)
//     //     })
//     //
//     // })
//     // session.playlistUser.genre.forEach(item=>{
//     //     // console.log(item)
//     //     let p = new Promise((data)=>
//     //         setTimeout(data, 100,  getDataFilter("playlists",item)));
//     //     resolvedPromisesArray.push(p)
//     // })
//     //
//     // // console.log(item)
//     // console.log("start")
//     // let prom = await Promise.all(resolvedPromisesArray);
//     // console.log("end")
//     // console.log(songs)
//     // // var songs =await getSongs()
//     // // var songs =await createFilter(105,[],[],1800,2021)
//     //
//
//     // res.status(200).json(songs)
//     // res.status(200)
// });


routerElder.route('/session/:id').get(async  function (req, res) {
    var resolvedPromisesArray = []
    let session = await getData("UserSessions", req.params.id)
    if(Array.isArray(session.sessions))
    {
        var songs = {
            songsView: [],
            songsBlock: []
        }

        songs.songsView = session.sessions[session.sessions.length-1]
        // songs.songsView = session.sessions[session.sessions.length-2].filter(x => x.score < 3);
        var OriginSongId=[]
        var OriginSongListView=[]
        var songListView=[]
        var songList=[]

        songs.songsView.forEach(item=>{
            OriginSongId.push(item.RecordDisplayId)
            OriginSongListView.push(item)
        })
        // console.log(OriginSongListView)
        songListView = await db.collection("RecordDisplay").find({_id:{$in:OriginSongId}})
        await songListView.forEach(item=>{
            songList.push(item)
        })
        songListView=[]
        await OriginSongListView.forEach(item=>
        {
            var t= songList.findIndex(x => x._id.toString() === item.RecordDisplayId.toString())
            songList[t].score = item.score
            songListView.push(songList[t])
        })

        songs = {sessionNumber:session.sessions.length,
        list:songListView
        }
        return res.status(200).json(songs)
    }

    // console.log("on user Session")
    var songs = {
        songsView: [],
        songsBlock: []
    }
    songs = await getSongs(session, songs)
    var songSession = []
    await songs.songsView.forEach(song => {
        songSession.push({date: new Date(), RecordDisplayId: song._id, score: 0})
    })
    session.sessions.push(songSession)
    // console.log(session)
    await updateData("UserSessions",session.Oid,session)
    return res.status(200).json(songs.songsView)


});

routerElder.route('/Create/session/:id').get(async  function (req, res) {
    var resolvedPromisesArray = []
    let session = await getData("UserSessions", req.params.id)


    // console.log("on user Session")
    var songs = {
        songsView: [],
        songsBlock: []
    }
    songs = await getSongs(session, songs)
    var songSession = []
    await songs.songsView.forEach(song => {
        songSession.push({date: new Date(), RecordDisplayId: song._id, score: 0})
    })
    session.sessions.push(songSession)
    // console.log(session)
    await updateData("UserSessions",session.Oid,session)
    return res.status(200).json(songs.songsView)


});

routerElder.route('/RateSession/:id').post(async  function (req, res) {
    var userSession = await getData("UserSessions",req.params.id)
    var rate = req.body
    userSession.sessions[rate.sesionNumber-1][rate.songNumber].score =rate.score
    var userSession = await updateData("UserSessions",req.params.id,userSession)
    if(userSession) {
        return res.status(200).json(userSession)
    }else {
        return res.status(400)
    }
});





async function getSongs(session, songs)
{
    var filters={
        maxSongs:session.maxSession,
        Cognitive:session.Cognitive,
        languages:session.LanguageAtTwenty,
        genres:session.Geners ,
        fromYear:session.yearAtTwenty-10,
        toYear:session.yearAtTwenty+10,
    }
    var keys = Object.keys(filters)
    while (keys.length>1)
    {
        if(songs.songsView.length<session.Cognitive)
            songs = await createFilter(songs,filters,Math.random() - 0.5)
        var p = keys.pop()
        delete filters[p]
    }
    console.log(session.currentAlgorithm)

    // if(!session.playList[session.currentAlgorithm.toString()])
    //     session.playList.push({[session.currentAlgorithm.toString()]:[]})


    // console.log(session.playList)
    // session.playList[session.currentAlgorithm]=songs.songsBlock
    // await updateData("UserSessions",session.Oid,session)
    songs.songsView =songs.songsView.sort((a, b) => 0.5 - Math.random());
    return songs
}






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

    var tester  = await testgetAllDataFilter("RecordDisplay",filter,sort,filters.maxSongs - songs.songsView.length);
    // tester.slice(0,filters.Cognitive)
    var randomized=[]
    await tester.forEach(item=>{
        randomized.push(item)
    })

    randomized = randomized.sort((a, b) => 0.5 - Math.random());
    randomized = randomized.slice(0,filters.Cognitive-songs.songsView.length)
    randomized.forEach(item=>{
        songs.songsView.push(item)
        songs.songsBlock.push(item._id)
    })
    // tempSong.sort( () => Math.random() - 0.5)
    // tempSong.slice(0,filters.Cognitive)
    // console.log("tempSong.length")
    // console.log(tempSong.length)

    // console.log("------")
    // console.log(count1)
    // console.log("------")
    // console.log(songs.songsView.length)
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



