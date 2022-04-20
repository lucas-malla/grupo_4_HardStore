const fs = require('fs');
const path = require('path')
const db = require('../database/models')
const {User} = db


function remember(req, res, next){
    /*
    if(req.cookies.userName && !req.session.user){
        //a cookie was seended in the request => check cookie 
       //load user DB
        UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
        UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath))
        //FIND user
        let user = UsersdataBase.find(user => user.userName == req.cookies.userName )
        if (user){
            //cookie user name maches with a registered user
            req.session.user = req.cookies.userName
        }
        */
    
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