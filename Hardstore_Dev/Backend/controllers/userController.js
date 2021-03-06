const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const {User} = require('../database/models')
const {logInUser} = require('../services/userServices.js')


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
            logInUser(req.body.userName, req.body.remember, req, res)
        }
    },
    logout: function(req, res){
        req.session.destroy()
        res.clearCookie('userCookie')
        res.redirect('/')
    },
    registerPost: function(req, res){
        let validation = validationResult(req)                                          //array de errores
        if (validation.errors.length > 0){
            res.render("register",{errors : validation.errors, old : req.body})
        }else{                                                                          //no errors -> chech passwords maching
            let new_userSQL = {}
            new_userSQL["username"] = req.body.userName
            new_userSQL["email"] = req.body.email
            new_userSQL["password"] = bcryptjs.hashSync(req.body.password, 10)
            new_userSQL["avatar"] = req.file ? req.file.filename : "default.jpg"
            User.create(new_userSQL)
                .then((newUser)=>{
                    console.log(newUser.dataValues)
                    logInUser(newUser.dataValues.username, true, req, res)  //user log after registration
                })
        }
    },
    profile: function(req, res){
        if(req.params.id  == req.session.userID){   //access restiction
            User.findOne({
                where: {
                    id : req.session.userID
                }})
                .then((user)=>{
                    let data = user.dataValues
                    res.render('profile',{data})
                })
                .catch(function(error){
                    console.log("User not found!")
                    res.redirect('/login')
                })
        }else{
            res.redirect('/') 
        }
    },
    profileEdit: function(req, res){
        if(req.params.id  == req.session.userID){       //access restiction
            User.findOne({
                where: {
                    id : req.session.userID
                }})
                .then((user)=>{
                    let data = user.dataValues
                    res.render('profileEdit',{data})
                })
                .catch(function(error){
                    console.log("error")
                })
        }else{
            res.redirect('/') 
        }
    },
    profileEditPost: function(req,res){
        let validation = validationResult(req)          //array de errores
        if (validation.errors.length > 0){
            req.body["id"] = req.session.userID
            res.render("profileEdit",{errors : validation.errors, data : req.body})
        } else {
        if(req.params.id  == req.session.userID){       //access restiction
            newData =  req.body
            if (req.file){
                newData["avatar"] =  req.file.filename
            }
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
        }}
    }
}

module.exports = controller
