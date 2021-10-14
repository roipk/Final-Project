

const db= require("../Mongo/mongodb").db

const router = require('express').Router()
let User = require('../models/users.model')
var CryptoJS = require("crypto-js");
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();




// Register
router.route('/register').post( async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, password } = req.body;

        // Validate user input
        if (!(password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }


        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await db.collection("users").findOne({first_name:first_name})
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
       let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        req.body.password = encryptedPassword
        const user = await db.collection("users").insertOne(req.body)
        delete user.password
        delete user.permissions

        // return new user
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

router.route('/login').get( async (req, res,next) => {
    console.log("in")
    console.log(req.headers)
    return res.status(200).send(req.headers)
})
// Login
router.route('/login').post( async (req, res,next) => {
    // Our register logic ends here
    try {
        // Get user input
        const { first_name,password ,t} = req.body;
        // console.log(req.body)
        //check token
        if(t) {
            if(jwt.decode(t).exp<Date.now() / 1000) {

                return res.status(204).json({massage:"Invalid Token"});
            }
            else
            {

                let data =jwt.decode(t)
                const token = jwt.sign(
                    {user_id: req.body._id, type: data.type},
                    "" + process.env.TOKEN_KEY,
                    {
                        expiresIn: "2m",
                    }
                );
                console.log(token)
                // save user token
                req.body.t = token;

                return res.status(200).json({item:req.body,massage:"welcome "+data.type});

            }

        }
        // Validate user input


         else if(first_name && password) {
            const user = await db.collection("users").findOne({first_name: first_name})
            let pass = await bcrypt.compare(password, user.password)

            if (user && pass) {
                // Create token
                const token = jwt.sign(
                    {user_id: user._id, type: user.type},
                    "" + process.env.TOKEN_KEY,
                    {
                        expiresIn: "2m",
                    }
                );
                // save user token
                req.body =user
                req.body.t = token;
                delete req.body.password
                delete req.body.permissions

                // user
                return res.status(200).json({item:req.body,massage:"login"});
            }

            else {
                return res.status(400).send("Invalid Credentials");
            }
        }

        else {
            return res.status(200).json({massage:"need Login"})
        }

    }

    catch (err) {
        console.log(err)
        return res.status(400).send("Error "+err);
    }
});



async function getUser(userId){
    // return await db.collection("users").findOne({_id:ObjectId(userId)})
    return await db.collection("users").findOne()

}

async function addUser(req,to){
    await db.collection("users").insertOne(req.body)

}

async function updateUser(req)
{
    // const userData = {$set: {
    //         userName: req.body.userName,
    //         password: "1234qqq",
    //         test:"in1"
    //         // userName: req.body.userName,
    //         // tamaringaId: req.body.userName.toString(),
    //     }};
    //
    // // db.collection("users").find(ObjectId("4ecc05e55dd98a436ddcc47c"))
    // const query = {"_id":ObjectId("616225d0d1f8f8060b33ae3c")};
    // const options = {"upsert": true};
    // // UserData.
    // var update = await db.collection("users").updateOne(query, userData, options)
    //
    //
    // // res.send(id)
    // console.log("update")
}

async function DeleteUser(req)
{

}
module.exports = router
