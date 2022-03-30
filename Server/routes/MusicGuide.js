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
