const path = require('path')
const fs = require('fs')
const db = require('../database/models')
const {User, Product, Cart } = db

function locals(req, res, next){
    /*
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
    */
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
                //console.log(data)
                console.log("locals.userLocals:",locals.userLocals)
            })
            .catch(function(error){
                console.log("usuario no encontado en la base de datos")
            })
        }
next();
}
module.exports = locals
