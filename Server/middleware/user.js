const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_KEY;
const expiresIn="2m"


const VerifyToken = (req,res,token) => {
    let type = (req.url.split("/",2))[1]
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, "" + secret);
        if(type!==decoded.user.type)
        {
            return res.status(404).send("Invalid user");
        }
        CreateToken(decoded.user,res)

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

const CreateToken = (data,res)=>{
    const token = jwt.sign(
        {user: data},
        "" + secret,
        {
            expiresIn: expiresIn,
        }
    );
    // save user token
    return res.status(200).json({token:token,user:data});
}

module.exports = {
    CreateToken:CreateToken,
    VerifyToken:VerifyToken,
};
