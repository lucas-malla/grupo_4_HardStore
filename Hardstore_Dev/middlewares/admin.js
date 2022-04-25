const req = require("express/lib/request");
const path = require('path')
const fs = require('fs')
const sequelize = require('sequelize')
const db = require('../database/models')
const {User, Product, Cart } = db

function adminMiddleware(req, res, next){


    User.findOne({
        where: {
            username : "admin"
        }})
        .then((user)=>{
            console.log("admin acsess: GRANTED")
            return next();
        })
        .catch(function(error){
            console.log("sali por catch")
            res.send('NOT ADMIN USER')
        })




    /*
    //load user DB
    UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
    UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath))
    //FIND user
    let user = UsersdataBase.find(user => user.id == req.session.userID)
    //check is user is admin
    if (true){
        //is admin
        return next();
    }else{
        res.send('NOT ADMIN USER')
    }  
    */
}

module.exports = adminMiddleware