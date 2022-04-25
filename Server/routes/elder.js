const db = require("../Mongo/mongodb").db;

const routerElder = require("express").Router();
let User = require("../models/users.model");
var CryptoJS = require("crypto-js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const VerifyToken = require("../middleware/user").VerifyToken;
const CreateToken = require("../middleware/user").CreateToken;

routerElder
  .route("/currentSession/:id/:algorithm?")
  .post(async function (req, res) {
    let id = req.params.id;
    let session = await getData("UserSessions", id);
    session.currentSession = req.body.currentSession;
    await updateData("UserSessions", id, session);
    return res.status(200);
  });

routerElder.route("/session/:id/:algorithm?").post(async function (req, res) {
  let id = req.params.id;
  let algorithm = req.params.algorithm;
  let session = await getData("UserSessions", id);

  if (
    algorithm &&
    Array.isArray(session.sessions[algorithm].sessions) &&
    session.sessions[algorithm].sessions.length > 0
  ) {
    var found = false;
    await session.sessions[algorithm].sessions[
      session.sessions[algorithm].sessions.length - 1
    ].forEach((item) => {
      if (item.youtube.videoId === req.body.youtube.videoId) {
        found = true;
        return res.status(200).json({ massage: "the song exist" });
      }
    });

    if (!found)
      session.sessions[algorithm].sessions[
        session.sessions[algorithm].sessions.length - 1
      ].push(req.body);
  } else if (session.sessions[algorithm].sessions.length === 0) {
    session.sessions[algorithm].sessions.push([req.body]);
  }

  let t = await updateData("UserSessions", id, session);
  return res.status(200).json({ massage: "success" });
});

routerElder.route("/session/:id/:algorithm?").get(async function (req, res) {
  console.log(req.params);
  let id = req.params.id;
  let algorithm = req.params.algorithm;
  let session = await getData("UserSessions", id);
  var songs = {
    songsView: [],
    songsBlock: [],
  };
  // console.log(session)

  if (algorithm === undefined) {
    let keys = [];
    Object.entries(session.sessions).forEach(([key, value]) => {
      if (value.isActive) keys.push(key);
    });
    let data = { keys: keys, currentSession: session.currentSession };
    return res.status(200).json(data);
  } else if (
    algorithm &&
    session.sessions[algorithm] &&
    Array.isArray(session.sessions[algorithm].sessions) &&
    session.sessions[algorithm].sessions.length > 0
  ) {
    songs.songsView =
      session.sessions[algorithm].sessions[
        session.sessions[algorithm].sessions.length - 1
      ];

    songs = {
      sessionNumber: session.sessions[algorithm].sessions.length,
      list: songs.songsView,
    };
    return res.status(200).json(songs);
  } else if (
    session.sessions[algorithm].sessions &&
    session.sessions[algorithm].sessions.length === 0
  ) {
    songs = {
      sessionNumber: session.sessions[algorithm].sessions.length,
      list: songs.songsView,
    };
    return res.status(200).json(songs);
  }

  return res.status(404);
});

routerElder.route("/allSession/:id/:algorithm").get(async function (req, res) {
  let id = req.params.id;
  let algorithm = req.params.algorithm;
  let session = await getData("UserSessions", id);
  var songs = {
    songsView: [],
    songsBlock: [],
  };
  songs.songsView = session.sessions[algorithm].sessions;

  songs = {
    sessionNumber: session.sessions[algorithm].sessions.length,
    list: songs.songsView,
  };
  return res.status(200).json(songs);
});

routerElder
  .route("/Create/session/:id/:algorithm")
  .get(async function (req, res) {
    let id = req.params.id;
    let algorithm = req.params.algorithm;
    let session = await getData("UserSessions", id);
    if (session.sessions[algorithm]) {
      if (
        algorithm != ("personal" || "family") &&
        session.sessions[algorithm].isActive == false
      ) {
        await setSessionIsActive(session, algorithm);
      }
    }

    var songs = await CreateSession(session, algorithm);
    await setUserCurrentSession(id, algorithm)

    return res.status(200).json(songs.songsView);
  });

routerElder
  .route("/update/session/:id/:algorithm")
  .get(async function (req, res) {
    let id = req.params.id;
    let algorithm = req.params.algorithm;
    let session = await getData("UserSessions", id);
    // var songs = await CreateSession(session, algorithm);
    var updated = await setSessionIsActive(session, algorithm);
    return res.status(200).json(updated);
  });

async function setSessionIsActive(session, algorithm) {
  session.sessions[algorithm].isActive = !session.sessions[algorithm].isActive;
  await updateData("UserSessions", session.Oid, session);
}

async function CreateSession(session, algorithm) {
  // console.log(session)
  var songs = {
    songsView: [],
    songsBlock: [],
    songsViewBefor: [],
  };
  if (!session.sessions[algorithm]) {
    session.sessions[algorithm] = { isActive: true, sessions: [] };
  }
  console.log(session.sessions[algorithm]);
  if (
    session.sessions[algorithm] &&
    session.sessions[algorithm].sessions.length > 0
  ) {
    var prevSong = await getBestsongPrevSessions(
      session.sessions[algorithm].sessions,
      3,
      4,
      3
    );
    songs.songsBlock = prevSong.block;
    songs.songsViewBefor = prevSong.view.map((s) => {
      if (s.RecordDisplayId) return s.RecordDisplayId.toString();
      else return;
    });
    songs.songsView = prevSong.view;
  }
  songs = await getSongs(session, songs);
  var songSession = [];
  await songs.songsView.forEach((song) => {
    songSession.push({
      date: new Date(),
      RecordDisplayId: song._id || song.RecordDisplayId,
      originTitle: song.originTitle,
      youtube: song.youtube,
      originArtistName: song.originArtistName,
      score: -1 || song.score,
    });
  });
  session.sessions[algorithm].sessions.push(songSession);
  await updateData("UserSessions", session.Oid, session);
  return songs;
}

routerElder.route("/getUserSessions/:id").get(async function (req, res) {
  let sessions = await getData("UserSessions", req.params.id);
  res.status(200).json(sessions);
});

routerElder
  .route("/setUserCurrentSession/:id/:sessionName")
  .post(async function (req, res) {
    db.collection("UserSessions").updateOne(
      { Oid: req.params.id },
      {
        $set: {
          currentSession: req.params.sessionName,
        },
      }
    );
    // let sessions = await getData("UserSessions", req.params.id);
    console.log(req.params);
    // res.status(200).json(sessions);
  });

routerElder
  .route("/RateSession/:id/:algorithm")
  .post(async function (req, res) {
    let id = req.params.id;
    let algorithm = req.params.algorithm;
    var userSession = await getData("UserSessions", id);
    var rate = req.body;
    userSession.sessions[algorithm].sessions[rate.sesionNumber - 1][
      rate.songNumber
    ].score = rate.score;
    userSession.sessions[algorithm].sessions[rate.sesionNumber - 1][
      rate.songNumber
    ].date = new Date();
    var userSession = await updateData("UserSessions", id, userSession);
    if (userSession) {
      return res.status(200).json(userSession);
    } else {
      return res.status(400);
    }
  });

async function setUserCurrentSession(id, sessionName){
  db.collection("UserSessions").updateOne(
    { Oid: id },
    {
      $set: {
        currentSession: sessionName,
      },
    }
  );
}

async function getSongs(session, songs) {
  var filters = {
    playlists: session.playlists,
    Cognitive: session.Cognitive,
  };
  songs = await createFilter(songs, filters, 1);

  // if(!session.playList[session.currentSession.toString()])
  //     session.playList.push({[session.currentSession.toString()]:[]})

  // console.log(session.playList)
  // session.playList[session.currentSession]=songs.songsBlock
  // await updateData("UserSessions",session.Oid,session)
  // songs.songsView =songs.songsView.sort((a, b) => 0.5 - Math.random());
  return songs;
}

async function updateData(nameCollection, doc, data) {
  // console.log(doc)
  var newData = await db
    .collection(nameCollection)
    .replaceOne({ Oid: doc }, data);
  return newData;
}

async function createFilter(songs = {}, filters, sort) {
  // songsView:[],
  //     songsBlock:[]
  // console.log(filters.playlists)
  var filter = {
    $and: [
      filters.playlists && filters.playlists.length > 0
        ? { name: { $in: filters.playlists } }
        : {},
    ],
  };

  // var allSong = await getAllDataFilter("Playlists", filter, sort);//college pc
  var allSong = await getAllDataFilter("NewPlaylists", filter, sort);
  // allSong.slice(0,filters.Cognitive)
  var randomized = [];

  await allSong.forEach((item) => {
    var newItemRecord = [];

    item.records.forEach((song) => {
      if (
        !songs.songsBlock.includes(
          song._id.toString() &&
            !songs.songsViewBefor.includes(song._id.toString())
        )
      ) {
        newItemRecord.push(song);
      } else {
        console.log(song);
      }
    });

    randomized.push({ name: item.name, record: newItemRecord });
  });
  console.log("-----------------------------------");
  // console.log(randomized)
  // console.log(randomized)
  randomized = randomized.sort(() => Math.random() - 0.5);
  console.log((filters.Cognitive / randomized.length).toFixed());

  var counter = songs.songsView.length;
  while (counter < filters.Cognitive) {
    randomized.forEach((item) => {
      console.log(item.record.length);
      if (
        item.record.length > 0 &&
        songs.songsView.length < filters.Cognitive
      ) {
        var song = item.record[Math.floor(Math.random() * item.record.length)];
        // console.log(song._id.toString())
        var index = item.record.indexOf(song);
        if (index > -1) {
          item.record.splice(index, 1);
        }

        songs.songsView.push(song);
        songs.songsBlock.push(song._id.toString());
        index = randomized.indexOf(item);
        randomized[index] = item;
      }
    });
    if (counter === songs.songsView.length) counter = filters.Cognitive;
    else counter = songs.songsView.length;
  }
  console.log(counter);

  songs.songsView = songs.songsView.sort(() => Math.random() - 0.5);
  console.log("len " + songs.songsView.length);

  // tempSong.sort( () => Math.random() - 0.5)
  // tempSong.slice(0,filters.Cognitive)
  // console.log("tempSong.length")
  // console.log(tempSong.length)

  // console.log("------")
  // console.log(count1)
  // console.log("------")
  // console.log(songs.songsView.length)
  // console.log(songs.songsView.length)
  return songs;
}

async function getSongsById(songs) {
  var filter = { _id: { $in: songs } };
  var songData = [];
  var tester = await testgetAllDataFilter("RecordDisplay", filter);
  await tester.forEach((item) => {
    songData.push(item);
  });
  return songData;
}

async function getData(nameCollection, Oid) {
  return await db.collection(nameCollection).findOne({ Oid: Oid });
}
async function getDataFilter(nameCollection, filter) {
  return await db.collection(nameCollection).findOne({ name: filter });
}

async function getAllDataFilter(nameCollection, filter, sort = 1) {
  return await db.collection(nameCollection).find(filter).sort({ name: sort });
}

async function getBestsongPrevSessions(
  AllSessions,
  numSessionPrev,
  minScore,
  maxSong = 2
) {
  var prevSong = { view: [], block: [] };

  // for(var i=1;i<=numSessionPrev && AllSessions.length-i>=0 ;i++)
  for (var i = 1; i <= 2 && AllSessions.length - i >= 0; i++) {
    console.log(i);
    var arr = AllSessions[AllSessions.length - i];

    prevSong.view = prevSong.view.concat(
      arr.filter((s) => s.score >= minScore)
    );
    prevSong.block = prevSong.block
      .concat(arr.filter((s) => s.score < minScore && s.score > -1))
      .map((s) => {
        if (s.RecordDisplayId) return s.RecordDisplayId.toString();
        else return;
      });
  }
  prevSong.block = prevSong.block.filter((e) => e != null);
  prevSong.block = prevSong.block.filter(function (item, pos) {
    return prevSong.block.indexOf(item) == pos;
  });
  if (prevSong.view.length > 1) {
    prevSong.view = prevSong.view.sort((a, b) => {
      if (a.RecordDisplayId === b.RecordDisplayId) return b.date - a.date;
    });
    // .map(s => s.RecordDisplayId)
    let tempsong = { id: [], items: [] };
    await prevSong.view.forEach((item) => {
      if (
        !tempsong.id.includes(
          item.RecordDisplayId.toString() &&
            !prevSong.block.includes(item.RecordDisplayId.toString())
        )
      ) {
        tempsong.id.push(item.RecordDisplayId.toString());
        tempsong.items.push(item);
      }
    });
    prevSong.view = tempsong.items;
    prevSong.view = prevSong.view.sort((a, b) => b.score - a.score);
    // console.log( prevSong.view)
    //  prevSong.view =  prevSong.view.filter((item, index) =>  prevSong.view.indexOf(item) === index)
    // console.log( prevSong.view)
    var allSong = [];
    var maxScore = 5;
    for (var i = maxScore; i >= minScore; i--) {
      tempsong = prevSong.view.filter((item) => item.score === i);
      allSong = allSong.concat(tempsong.sort((a, b) => 0.5 - Math.random()));
    }

    prevSong.view = allSong.slice(
      0,
      maxSong > allSong.length ? allSong.length : maxSong
    );
    console.log(prevSong.view);
  }

  // console.log( prevSong.view)
  // session.sessions[session.sessions.length-1].
  return prevSong;
}

module.exports = routerElder;

//
//
// async function getSongsOldWork(session, songs)
// {
//     var filters={
//         maxSongs:session.maxSession,
//         Cognitive:session.Cognitive,
//         languages:session.LanguageAtTwenty,
//         genres:session.Geners ,
//         fromYear:session.yearAtTwenty-10,
//         toYear:session.yearAtTwenty+10,
//     }
//     var keys = Object.keys(filters)
//     while (keys.length>1)
//     {
//         if(songs.songsView.length<session.Cognitive)
//             songs = await createFilter(songs,filters,Math.random() - 0.5)
//         var p = keys.pop()
//         delete filters[p]
//     }
//     console.log(session.currentSession)
//
//     // if(!session.playList[session.currentSession.toString()])
//     //     session.playList.push({[session.currentSession.toString()]:[]})
//
//
//     // console.log(session.playList)
//     // session.playList[session.currentSession]=songs.songsBlock
//     // await updateData("UserSessions",session.Oid,session)
//     songs.songsView =songs.songsView.sort((a, b) => 0.5 - Math.random());
//     return songs
// }

//
// async function createFilterOldWork(songs={},filters,sort)
// {
//
//     // songsView:[],
//     //     songsBlock:[]
//     var filter =
//         {$and: [
//                 filters.genres && filters.genres.length > 0 ?{genre:{$in:filters.genres}}:{} ,
//                 filters.languages && filters.languages.length>0? { language:  { $in: filters.languages } }:{},
//                 {year:{ $gte: filters.fromYear?filters.fromYear:1800}},
//                 {year:{ $lte: filters.toYear?filters.toYear:new Date().getFullYear()}},
//                 songs.songsBlock.length>0? {_id:{$nin:songs.songsBlock}}:{},
//             ]}
//
//     var tester  = await testgetAllDataFilter("RecordDisplay",filter,sort,filters.maxSongs - songs.songsView.length);
//     // tester.slice(0,filters.Cognitive)
//     var randomized=[]
//     await tester.forEach(item=>{
//         randomized.push(item)
//     })
//
//     randomized = randomized.sort((a, b) => 0.5 - Math.random());
//     randomized = randomized.slice(0,filters.Cognitive-songs.songsView.length)
//     randomized.forEach(item=>{
//         songs.songsView.push(item)
//         songs.songsBlock.push(item._id)
//     })
//     // tempSong.sort( () => Math.random() - 0.5)
//     // tempSong.slice(0,filters.Cognitive)
//     // console.log("tempSong.length")
//     // console.log(tempSong.length)
//
//     // console.log("------")
//     // console.log(count1)
//     // console.log("------")
//     // console.log(songs.songsView.length)
//     // console.log(songs.songsView.length)
//     return songs
//
// }

// async function testgetAllDataFilter(nameCollection,filter,sort=1,max=35,offset=0){
//     return await db.collection(nameCollection).find(filter).skip(offset).limit(max)
//
// }
