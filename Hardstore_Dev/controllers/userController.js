const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const sequelize = require('sequelize')
const db = require('../database/models')
const {User, Product, Cart } = db
const { Op } = require("sequelize");


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
                bcryptjs.compare(req.body.password, user.dataValues.password)
                .then((check)=>{
                    console.log(check)
                })
                if (req.body.password == user.dataValues.password){//provisorio
                  //login user
                  req.session.userID = user.dataValues.id
                  //remember =>  GENERATE COOCKIE
                  if (req.body.remember){
                      console.log("se ha creado la cookie")
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
                res.redirect("/")
            }else{
                res.render("register",{errors :[{ msg :"Las contraseñas ingresadas no coinciden"}], old : req.body})
            }
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
