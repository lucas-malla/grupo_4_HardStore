const {User, Cart} = require('../database/models')

const services = {
    logInUser:  function(userName, remember, req, res){
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
                services.addLocalProductsToCart(req, res)
                .then(()=>{
                    if(user.username == "admin"){                       //admin or user
                        res.redirect('/admin/controlpanel')
                    }else{
                        res.redirect('/')
                    }
                })
            })
    },
    addLocalProductsToCart: (req, res)=>{
        //{prodID: req.params.id, quantity: "1"}
        if(req.cookies.cartUnlogged){
            let data = []
            for (product of req.cookies.cartUnlogged){
                data.push({
                    product_id: product.prodID,
                    user_id: req.session.userID,
                    quantity: product.quantity,
                })
            }
            console.log(data)
            return( Cart.bulkCreate(data)
                .then(()=>{
                    res.clearCookie('cartUnlogged')
                })
            )
        }
    }
}

module.exports = services

// const logInUser =  function(userName, remember, req, res){
//     User.findOne({
//         raw: true,
//         where: {
//             username : userName
//         }})
//         .then((user)=>{    
//             req.session.userID = user.id                        //user login
//             if (remember){                                      // if remember =>  GENERATE COOCKIE
//                 let cookieData = {
//                     userID: user.id,
//                     userName: user.username,
//                     userEmail: user.email
//                 }
//                 res.cookie('userCookie', cookieData, {maxAge:60000})
//             }
//             if(user.username == "admin"){                       //admin or user
//                 res.redirect('/admin/controlpanel')
//             }else{
//                 res.redirect('/')
//             }
//         })
// }