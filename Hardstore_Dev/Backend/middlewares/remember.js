const {User} = require('../database/models')


function remember(req, res, next){   
    if(req.cookies.userCookie && !req.session.userID){      //a cookie was seended in the request (and not logged) => check cookie
        User.findOne({                                      //FIND user
            raw: true,
            where: {
                id : req.cookies.userCookie.userID
            }})
            .then((user)=>{
                let {userID, userName, userEmail} = req.cookies.userCookie
                //Extra layer of security, user id, username and email have to match (cookie- database) to log in the user correctly
                if(userID == user.id && userName == user.username && userEmail == user.email){ 
                   req.session.userID = user.id             //log in user from cookie
                   return next();
                }else{
                    console.log("Corrupted cookie detected: ", req.cookies.userCookie)
                    res.clearCookie('userCookie')  //cleaning corrupted cookie
                    res.redirect('/login')
                }
            })
            .catch(function(error){
                console.log("usuario no encontado en la base de datos", req.cookies.userCookie)
                res.send("Do not manipulate our cookies!!!!!Catch")
            })
    }else{
        return next();
    }
}

module.exports = remember
