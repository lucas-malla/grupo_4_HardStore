const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const sequelize = require('sequelize')
const db = require('../database/models')
const {User, Product, Cart } = db
const { Op } = require("sequelize");
const { Console } = require('console')


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
        let validation = validationResult(req) //array de errores
        if (validation.errors.length > 0){
            //form data error
            res.render("login",{errors : validation.errors, old : req.body})
        }
        //NEW
        User.findOne({
            where: {
                username : req.body.userName
            }})
            .then((user)=>{
                // always throwing false
                let check = bcryptjs.compareSync(req.body.password, user.dataValues.password)

                if (req.body.password == user.dataValues.password){//provisorio
                  //login user
                  req.session.userID = user.dataValues.id
                  //remember =>  GENERATE COOCKIE
                  if (req.body.remember){
                      res.cookie('userID',req.session.userID,{maxAge:60000})
                  }
                  res.redirect('/user/' + String(req.session.userID))
                }
                res.render('login', {error: "Usuario o contraseña invalida",old : req.body})
            })
            .catch(function(error){
                console.log("catch")
                //user not found
                res.render('login', {error: "Usuario o contraseña invalida",old : req.body})
            })

        /*
        //OLD
        //load user DB
        UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
        UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath))
        //FIND user
        let user = UsersdataBase.find(user => user.userName == req.body.userName )
        if (user){
            //registeres user => check password
            let check = bcryptjs.compareSync(req.body.password, user.password)
              if (check){
                //login user
                req.session.userID = user.id
                //remember =>  GENERATE COOCKIE
                if (req.body.remember){
                    res.cookie('userID',req.session.userID,{maxAge:60000})
                }
                res.redirect('/user/' + String(req.session.userID))
            }
        }
        res.render('login', {error: "Usuario o contraseña invalida",old : req.body})
        */
    },
    logout: function(req, res){
        req.session.destroy()
        res.clearCookie('userID')
        res.redirect('/')
    },
    userCheck: function(req, res){
        res.send(req.session.userID)
    },
    registerPost: function(req, res){
        let validation = validationResult(req) //array de errores
        if (validation.errors.length > 0){
            //registry error
            res.render("register",{errors : validation.errors, old : req.body})
        }else{
            //no errors -> chech passwords maching
            if (req.body.password == req.body.password_repeat){   
                //no errors -> user register in DB
                //NEW
                let new_userSQL = {}
                new_userSQL["username"] = req.body.userName
                new_userSQL["email"] = req.body.email
                new_userSQL["password"] = bcryptjs.hashSync(req.body.password, 10)
                new_userSQL["avatar"] = req.file ? req.file.filename : "default.jpg"
                User.create(new_userSQL)

                /*
                // OLD 
                //read db
                UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
                UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath))
                //create new user
                let new_user = {}
                new_user["userName"] = req.body.userName
                new_user["email"] = req.body.email
                new_user["password"] = bcryptjs.hashSync(req.body.password, 10)
                new_user["avatar"] = req.file ? req.file.filename : "default.jpg"
                new_user["name"] = ""
                new_user["surname"] = ""
                new_user["street"] = ""
                new_user["number"] = ""
                new_user["cellphone"] = ""
                new_user['id'] = get_next_id(UsersdataBase)
                //Update DB
                UsersdataBase.push(new_user)
                UsersdataBase = JSON.stringify (UsersdataBase, null, 4);
                fs.writeFileSync (UsersdataBasePath, UsersdataBase );
                // OLD 
                */


                res.redirect("/")
            }else{
                res.render("register",{errors :[{ msg :"Las contraseñas ingresadas no coinciden"}], old : req.body})
            }
        }
    },
    profile: function(req, res){
        //restringir acceso 
        console.log(req.params.id)
        console.log(req.session.userID)

        if(req.params.id  == req.session.userID){
            
            User.findOne({
                where: {
                    id : req.session.userID
                }})
                .then((user)=>{
                    let data = user.dataValues
                    console.log(data)
                    res.render('profile',{data})
                })
                .catch(function(error){
                    console.log("sali por catch")
                })
            /*
            //load user DB
            UsersdataBasePath = path.join(__dirname, '../data_base/users.json');
            UsersdataBase = JSON.parse(fs.readFileSync(UsersdataBasePath));
            //FIND user
            let data = UsersdataBase.find(user => user.id == req.params.id )
            console.log(data)
            res.render('profile',{data})
            */
        }

        //res.redirect('/')
    },
    profileEdit: function(req, res){
        res.render('profileEdit')
    }
}

module.exports = controller
