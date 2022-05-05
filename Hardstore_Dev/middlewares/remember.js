const fs = require('fs');
const path = require('path')
const db = require('../database/models')
const {User} = db


function remember(req, res, next){   
    if(req.cookies.userID && !req.session.userID){
        console.log("detecte una cookie")
        //a cookie was seended in the request => check cookie 
        //FIND user
        User.findOne({
            where: {
                id : req.cookies.userID
            }})
            .then((user)=>{
                console.log(user.dataValues)
                console.log(req.cookies.userID)
                req.session.userID = req.cookies.userID
                console.log("loguie al usuario:" + req.session.userID)
            })
            .catch(function(error){
                console.log("usuario no encontado en la base de datos")
            })
        
    }
    return next();
}

module.exports = remember