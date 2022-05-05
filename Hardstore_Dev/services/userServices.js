const {User} = require('../database/models')


const logInUser =  function(userName, remember, req, res,){
    User.findOne({
        raw: true,
        where: {
            username : userName
        }})
        .then((user)=>{    
            console.log('user desde services: ', user)
            req.session.userID = user.id                            //user login
            if (remember){                                          // if remember =>  GENERATE COOCKIE
                console.log("se ha creado la cookie")
                res.cookie('userID', user.id, {maxAge:60000})
            }
            if(user.username == "admin"){                           //admin or user
                res.redirect('/admin/controlpanel')
            }else{
                res.redirect('/')
            }
        })
}

module.exports = logInUser
