const db = require("../Mongo/mongodb").db;

const router = require("express").Router();
let User = require("../models/users.model");
var CryptoJS = require("crypto-js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const VerifyToken = require("../middleware/user").VerifyToken;
const CreateToken = require("../middleware/user").CreateToken;




router.route("/getAllPlaylists").get(async function (req, res) {
  // console.log(req.params);
  let playlists = await getAllPlaylists("NewPlaylists");
  res.status(200).json(playlists);
});

router.route("/getSongsByPlaylist/:playlist").get(async function (req, res) {
  let playlist = req.params.playlist;
  // console.log(playlist);
  let songs = await getSongsByPlaylist("NewPlaylists", playlist);
  res.status(200).json(songs);
});


router.route("/getAllSongsForDebug").get(async function (req, res) {
  // console.log(playlist);
  let songs = await getSongsForDebug("SongsDebug");
  res.status(200).json(songs);
});

router.route("/getSongsForDebug/:playlist").get(async function (req, res) {
  let playlist = req.params.playlist;
  // console.log(playlist);
  let songs = await getSongsForDebug("SongsDebug", playlist);
  res.status(200).json(songs);
});

router.route("/updateSongDebug/:nameCollection")
    .post(async function (req, res) {
      let updatedSong = await updateSongDebug(req.params.nameCollection, req.body);
      res.status(200).json(updatedSong);
    });

router.route("/updatePlaylist/:playlistName")
    .post(async function (req, res) {
      // console.log(req.body)
      let updatedPlaylist = await updatedSongInPlaylist(req.params.playlistName, req.body);
      res.status(200).json(updatedPlaylist);
    });

router.route("/addSong")
    .post(async function (req, res) {
        let addnewSong = await db.collection("records").insertOne(req.body)
        res.status(200).json(addnewSong);
    });



module.exports = router;

async function getAllPlaylists(nameCollection) {
  var newData = await db.collection(nameCollection).find();
  let playlists = [];
  await newData.forEach((playlist) => {
    playlists.push(playlist);
  });
  return playlists;
}

async function getSongsByPlaylist(nameCollection, playlist) {
  var newData = db.collection(nameCollection).find({ name: playlist });
  let songs = [];
  await newData.forEach((song) => {
    songs.push(song);
  });
  return songs[0].records;
}

async function getSongsForDebug(nameCollection, playlist) {
  var newData
  if(playlist)
    newData = await db.collection(nameCollection).find({ playlist: playlist }).toArray();
  else
    newData = await db.collection(nameCollection).find({}).toArray()
  let songs = [];
  await newData.forEach((song) => {
    songs.push(song);
  });

  return songs;
}

async function updatedSongInPlaylist(playlistName,objReplace)
{
  var playlist = await db.collection("NewPlaylists").find({ name: playlistName })

      await playlist.forEach((item) => {
          var records = []
          // records.push(item)
          // console.log(item)

          item.records.forEach((song) => {
              let index = objReplace.findIndex(object => {
                  return object.Oid == song._id;
              });
              if (index > -1 && !objReplace[index].isDuplicate) {

                  if (objReplace[index].changeLink && objReplace[index].changeLink.length > 0) {
                      song.youtube.videoFullId = objReplace[index].changeLink
                      let id = objReplace[index].changeLink.split("?v=")[1] ?? ""
                      song.youtube.videoId = id.split("&")[0] ?? ""
                  }
                  records.push(song)
              }

          })
          item.records = records;

          db.collection("NewPlaylists").replaceOne({_id: item._id}, item,
              {upsert: true,})


  });

  return playlist
}



async function updateSongDebug(nameCollection, updatedSong) {
  var update  = await db.collection(nameCollection).updateOne(
      { Oid: updatedSong.Oid },
      {
        $set: {
          title: updatedSong.title??false,
          artistName: updatedSong.artistName??false,
          year: updatedSong.year??false,
          playlist: updatedSong.playlist??false,
          youtube: updatedSong.youtube??false,
          songComments: updatedSong.songComments??"",
          playlistComments: updatedSong.playlistComments??"",
          isGoodLink: updatedSong.isGoodLink??false,
          isDuplicate: updatedSong.isDuplicate??false,
          isBrokenLink: updatedSong.isBrokenLink??false,
          isNoVideo: updatedSong.isNoVideo??false,
          isLowQualityVideo: updatedSong.isLowQualityVideo??false,
          isNoSound: updatedSong.isNoSound??false,
          isLowQualitySound: updatedSong.isLowQualitySound??false,
        },
      }
  );

  return update




}
// async function createSongs(nameCollection, updatedSong){
//   db.collection(nameCollection).insertOne(updatedSong)
// }
