const  router = require('express').Router()
let User = require('../models/Authentication.model')



router.route('/add').post((req,res)=>{
    const userName = req.body.userName
    // console.log(userName)
    const newUser = new User({ userName : userName })
    newUser.save()
        .then(()=>res.json('User Add'))
        .catch(err=>res.status(400).json('Error: '+err))
})

module.exports = router
