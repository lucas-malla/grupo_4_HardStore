const req = require("express/lib/request");
const path = require('path')
const fs = require('fs')

function adminMiddleware(req, res, next){
    //load user DB
    UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
    UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath))
    //FIND user
    let user = UsersdataBase.find(user => user.id == req.session.userID)
    //check is user is admin
    if (user.admin){
        //is admin
        return next();
    }else{
        res.send('NOT ADMIN USER')
    }  
}

module.exports = adminMiddleware