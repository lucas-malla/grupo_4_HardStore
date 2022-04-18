const req = require("express/lib/request");
const path = require('path')
const fs = require('fs')

function userMiddleware(req, res, next){
    if(req.params.id  == req.session.userID){
        return next();
    }else{
        res.redirect('/login')
    }
}

module.exports = userMiddleware