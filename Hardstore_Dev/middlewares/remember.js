const fs = require('fs');
const path = require('path')


function remember(req, res, next){
    if(req.cookies){
        //a cookie was seended in the request => check cookie 
       //load user DB
        UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
        UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath))
        //FIND user
        console.log(req.cookies.userName);
        let user = UsersdataBase.find(user => user.userName == req.cookies.userName )
        if (user){
            //cookie user name maches with a registered user
            req.session.user = req.cookies.userName
        }
    }
    next();
}

module.exports = remember