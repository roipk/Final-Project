const jwt = require("jsonwebtoken");

const config = process.env;

const userPage = (req, res, next) => {
    // console.log("in user Page")
    // console.log(req.body)
    // console.log(req.query)
    // console.log(req.headers["x-access-token"])
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    // console.log("the token")
    // console.log(token)

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = userPage;
