const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')

function get_next_id(data_base){
    //devuelve el proximo id de producto a crear
    return ((data_base.slice(-1))[0].id)+1
}


const controller = {
    login: function(req, res){
        res.render("login")
    },
    register: function(req, res){
        res.render("register")
    },
    loginPost: function(req, res){
        console.log(req.body);
        console.log("post de login")
        res.render("login")
    },
    registerPost: function(req, res){
        let validation = validationResult(req) //array de errores
        if (validation.errors.length > 0){
            //registry error
            res.render("register",{errors : validation.errors, old : req.body})
        }else{
            //no errors -> user register in DB
            //read db
            UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
            UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath))
            console.log(UsersdataBase)
            //create new user
            let new_user = {}
            new_user = {...req.body}
            new_user['id'] = get_next_id(UsersdataBase)
            //Update DB
            UsersdataBase.push(new_user)
            UsersdataBase = JSON.stringify (UsersdataBase, null, 4);
            fs.writeFileSync (UsersdataBasePath, UsersdataBase );
            res.redirect("/")
        }
    }
}

module.exports = controller
