const {User} = require('../database/models')


const logInUser =  function(userName, remember, req, res){
    User.findOne({
        raw: true,
        where: {
            username : userName
        }})
        .then((user)=>{    
            req.session.userID = user.id                        //user login
            if (remember){                                      // if remember =>  GENERATE COOCKIE
                let cookieData = {
                    userID: user.id,
                    userName: user.username,
                    userEmail: user.email
                }
                res.cookie('userCookie', cookieData, {maxAge:60000})
            }
            if(user.username == "admin"){                       //admin or user
                res.redirect('/admin/controlpanel')
            }else{
                res.redirect('/')
            }
        })
}

module.exports = logInUser
