

const express = require('express')
const cors = require('cors')

const bodyParser = require("body-parser");
const path = require("path")

require('dotenv').config()
const mongo = require("./Server/Mongo/mongodb").mongo;
const app = express()
const port = process.env.Port || 5000



const db = require("./Server/Mongo/mongodb").db
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


const userRouter = require('./Server/routes/users')

app.use('/users/:id',userRouter)


app.listen(port,async ()=>{
    console.log(`server is running on port: ${port}`)
})


app.post('/login',async  function (req, res) {

    try {
        // Get user input
        const { first_name,password ,user} = req.body ;
        console.log(148)
        console.log(user)
        // console.log(req.body)
        //check token
        if(user && user.t) {
            let t = user.t
            if(jwt.decode(t).exp<Date.now() / 1000) {
                return res.status(204).json({user:null,massage:"Invalid Token"});
            }
            else
            {

                let data =jwt.decode(t)
                console.log(data)
                const token = jwt.sign(
                    {_id: data._id, type: data.type},
                    "" + process.env.TOKEN_KEY,
                    {
                        expiresIn: "2m",
                    }
                );
                console.log(token)
                // save user token
                user.t = token;
                console.log(user)
                return res.status(200).json({user:user,massage:"welcome "+data.type});

            }

        }
        // Validate user input


        else if(first_name && password) {
            const user = await db.collection("users").findOne({first_name: first_name})
            let pass = await bcrypt.compare(password, user.password)

            if (user && pass) {
                // Create token
                const token = jwt.sign(
                    {_id: user._id, type: user.type},
                    "" + process.env.TOKEN_KEY,
                    {
                        expiresIn: "2m",
                    }
                );
                // save user token

                user.t = token;
                delete user.password
                delete user.permissions
                console.log(user)

                // user
                return res.status(200).json({user:user,massage:"login"});
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


app.get('/', function (req, res) {
    console.log(req)
    console.log(path.join(__dirname, 'src', 'App.js'))
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



