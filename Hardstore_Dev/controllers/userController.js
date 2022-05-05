const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const {User} = require('../database/models')
const logInUser = require('../services/userServices.js')


const controller = {
    login: function(req, res){
        res.render("login")
    },
    register: function(req, res){
        res.render("register")
    },
    loginPost: function(req, res){
        let validation = validationResult(req)                                  //array de errores
        if (validation.errors.length > 0){
            res.render("login",{errors : validation.errors, old : req.body})
        }else{
            logInUser(req.body.userName, true, req, res)
        }
    },
    logout: function(req, res){
        req.session.destroy()
        res.clearCookie('userID')
        res.redirect('/')
    },
    registerPost: function(req, res){
        let validation = validationResult(req)                                          //array de errores
        if (validation.errors.length > 0){
            console.log(validation.errors)
            res.render("register",{errors : validation.errors, old : req.body})
        }else{                                                                          //no errors -> chech passwords maching
            let new_userSQL = {}
            new_userSQL["username"] = req.body.userName
            new_userSQL["email"] = req.body.email
            new_userSQL["password"] = bcryptjs.hashSync(req.body.password, 10)
            new_userSQL["avatar"] = req.file ? req.file.filename : "default.jpg"
            User.create(new_userSQL)
                .then((send)=>{
                    console.log(send.dataValues)
                    logInUser(send.dataValues.username, true, req, res)                 //user log after registration
                })
        }
    },
    profile: function(req, res){
        //restringir acceso 
        if(req.params.id  == req.session.userID){
            User.findOne({
                where: {
                    id : req.session.userID
                }})
                .then((user)=>{
                    let data = user.dataValues
                    res.render('profile',{data})
                })
                .catch(function(error){
                    console.log("sali por catch")
                })
        }else{
            res.redirect('/') 
        }
    },
    profileEdit: function(req, res){
        //restringir acceso 
        if(req.params.id  == req.session.userID){
            User.findOne({
                where: {
                    id : req.session.userID
                }})
                .then((user)=>{
                    let data = user.dataValues
                    console.log(data)
                    res.render('profileEdit',{data})
                })
                .catch(function(error){
                    console.log("sali por catch")
                })
        }else{
            res.redirect('/') 
        }
    },
    profileEditPost: function(req,res){
        //restringir acceso 
        if(req.params.id  == req.session.userID){
            newData = req.body
        User.update(newData,{
                where: {
                    id : req.session.userID
                }})
                .then(()=>{
                    res.redirect('/user/' + String(req.params.id))
                })
                .catch(function(error){
                    console.log("profileEditPost - sali por catch")
                })
        }else{
            res.redirect('/') 
        }
    }
}

module.exports = controller
