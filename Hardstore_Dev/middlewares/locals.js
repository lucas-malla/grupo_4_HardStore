const path = require('path')
const fs = require('fs')
const db = require('../database/models')
const {User} = db

function locals(req, res, next){
    res.locals.userLocals = false;
    if (req.session.userID){
        User.findOne({                      //FIND user
            where: {
                id : req.session.userID
            }})
            .then((user)=>{
                let data = user.dataValues
                data["password"] = null     //Hiding password for user locals variable
                res.locals.userLocals = data
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
