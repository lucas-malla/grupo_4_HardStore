const path = require('path')
const fs = require('fs')
const db = require('../database/models')
const {User} = db

function locals(req, res, next){
    res.locals.userLocals = false;
    console.log("req.session.userID:" + req.session.userID)
    if (req.session.userID){
        //FIND user
        User.findOne({
            where: {
                id : req.session.userID
            }})
            .then((user)=>{
                let data = user.dataValues
                data["password"] = null
                res.locals.userLocals = data
                // console.log("#############################################")
                // console.log("res.locals.userLocals:",res.locals.userLocals)
                // console.log("#############################################")
                next();
            })
            .catch(function(error){
                console.log("usuario no encontado en la base de datos")
            })
    }else{
        next();
    }
}
module.exports = locals
