const path = require('path')
const fs = require('fs')

function locals(req, res, next){
    res.locals.userLocals = false;
    if (req.session.userID){
        //read DB
        UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
        UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath))
        //FIND user
        let user = UsersdataBase.find(user => user.id == req.session.userID)
        user["password"] = null
        res.locals.userLocals = user
    }
    next();
}

module.exports = locals
