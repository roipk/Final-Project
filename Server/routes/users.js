

// const db = require("../Mongo/mongodb").getDB
const db= require("../Mongo/mongodb").db
const router = require('express').Router()
let User = require('../models/users.model')
var CryptoJS = require("crypto-js");
const {ObjectId} = require("mongodb");



router.route('/add').post(async (req,res)=>{

    // const userName = .userName
    var encryptedPass = CryptoJS.AES.encrypt(req.body.password, 'Password');
    req.body.password = encryptedPass.toString()
    console.log(encryptedPass.toString())



    // const user = new User();

    try {

        console.log("in")
       // var id = await db.collection("users").insertOne(req.body)
       //  console.log(id)
        let user = await getUser("616225d0d1f8f8060b33ae3c")
        user = await getUser(user._id)

        // await db.createCollection("user2")
        // await User.create("users",{"userName":"ttr","password":"werwer"});
        // await user.save();
        // db.collection('users').createIndex(req.body).then(()=>{
        //     console.log("add")
        // });
        // const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
        // console.log('Inserted documents =>', insertResult);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).send('Error: '+ err.message);
    }
    // console.log(req.body)
    // User.create("users", req.body)
    //     .then(res.json(req.body))
    //     .catch(err=>res.status(400).send('Error: '+ err.message));

    // const newUser = new User({ userName:userName})
    // newUser.save()
    //     .then(()=>{
    //         res.json(req.body);
    //     })
    //     .catch(err=>res.status(400).json('Error: '+err))
})

router.route('/get').post(async (req,res)=>{

    var key = "2e35f242a46d67eeb74aabc37d5e5d05";
    var key1 = "Password";
    var data = CryptoJS.AES.encrypt("Message", key); // Encryption Part
    var data1 = "U2FsdGVkX1/hY22h2WPJcUO8UGZPR+pARZMmyIB6WAM="; // Encryption Part
    var decrypted = CryptoJS.AES.decrypt(data1, key1).toString(CryptoJS.enc.Utf8);

    // var bytes = CryptoJS.AES.decrypt(req.password, 'Password');
    // var decrypted1 = bytes.toString(CryptoJS.enc.Utf8)
    // // var bytes2 = CryptoJS.AES.decrypt(req.password, 'password');
    // // var decrypted2 = bytes2.toString(CryptoJS.enc.Utf8);
    // console.log("decrypted1 - "+decrypted1)
    // console.log("decrypted2 - "+decrypted2)
    console.log("data - "+data)
    console.log("decrypted - "+decrypted)

})
async function getUser(userId){
    // return await db.collection("users").findOne({_id:ObjectId(userId)})
    return await db.collection("users").findOne()

}

async function addUser(req,to){
    await db.collection("users").insertOne(req.body)

}

async function updateUser(req)
{
    const userData = {$set: {
            userName: req.body.userName,
            password: "1234qqq",
            test:"in1"
            // userName: req.body.userName,
            // tamaringaId: req.body.userName.toString(),
        }};

    // db.collection("users").find(ObjectId("4ecc05e55dd98a436ddcc47c"))
    const query = {"_id":ObjectId("616225d0d1f8f8060b33ae3c")};
    const options = {"upsert": true};
    // UserData.
    var update = await db.collection("users").updateOne(query, userData, options)


    // res.send(id)
    console.log("update")

}


module.exports = router
