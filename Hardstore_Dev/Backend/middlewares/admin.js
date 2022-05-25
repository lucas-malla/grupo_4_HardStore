const {User} = require('../database/models')

function adminMiddleware(req, res, next){
    User.findOne({
        where: {
            username : "admin"
        }})
        .then((user)=>{
            if(req.session.userID == user.dataValues.id){
                console.log("#####################")
                console.log("Admin acsess: GRANTED")
                console.log("#####################")
                return next();
            }else{
                console.log("###################################################")
                console.log("Not admin user tried to enter to admin/controlpanel")
                console.log("###################################################")
                res.redirect('/')
            }
        })
        .catch(function(error){
            res.send('NOT ADMIN USER ON HARDSTORE DB')
        })
}

module.exports = adminMiddleware