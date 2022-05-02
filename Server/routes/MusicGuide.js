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

router.route("/getSongsForDebug/:playlist").get(async function (req, res) {
  let playlist = req.params.playlist;
  // console.log(playlist);
  let songs = await getSongsForDebug("SongsDebug", playlist);
  res.status(200).json(songs);
});

router
  .route("/updateSongDebug/:nameCollection")
  .post(async function (req, res) {
    let updatedSong = await updateSongDebug(req.params.nameCollection, req.body);
    console.log(updatedSong);
    res.status(200).json(updatedSong);
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
  var newData = db.collection(nameCollection).find({ playlist: playlist });
  let songs = [];
  await newData.forEach((song) => {
    songs.push(song);
  });
  return songs;
}

async function updateSongDebug(nameCollection, updatedSong) {
  db.collection(nameCollection).updateOne(
    { Oid: updatedSong.Oid },
    {
      $set: {
        title: updatedSong.title,
        artistName: updatedSong.artistName,
        year: updatedSong.year,
        playlist: updatedSong.playlist,
        youtube: updatedSong.youtube,
        songComments: updatedSong.songComments,
        playlistComments: updatedSong.playlistComments,
        isBrokenLink: updatedSong.isBrokenLink,
        isNoVideo: updatedSong.isNoVideo,
        isLowQualityVideo: updatedSong.isLowQualityVideo,
        isNoSound: updatedSong.isNoSound,
        isLowQualitySound: updatedSong.isLowQualitySound,
      },
    }
  );
}
// async function createSongs(nameCollection, updatedSong){
//   db.collection(nameCollection).insertOne(updatedSong)
// }
