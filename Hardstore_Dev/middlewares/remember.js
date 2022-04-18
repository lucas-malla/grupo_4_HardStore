const fs = require('fs');
const path = require('path')


function remember(req, res, next){
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
    }
    return next();
}

module.exports = remember