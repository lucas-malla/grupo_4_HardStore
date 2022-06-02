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
                    res.cookie('userCookie', cookieData, {maxAge:60000}) //cookie creator
                }
                services.addLocalProductsToCart(req, res)
                    .then(()=>{
                        if(user.username == "admin"){              //admin or customer
                            res.redirect('/admin/controlpanel')
                        }else{
                            res.redirect('/')
                        }
                    })
            })
    },
    addLocalProductsToCart: async function (req, res){ //info rearranger
        if(req.cookies.cartUnlogged){      // if presence of cookie of unlogged Cart...
            let data = []
            for (product of req.cookies.cartUnlogged){
                data.push({                 //Rearange data to store it directly to DB
                    product_id: product.prodID,
                    user_id: req.session.userID,
                    quantity: product.quantity
                })
            }
            services.addProductsToCart(req, data)
            res.clearCookie('cartUnlogged')
        }
    },
    addProductsToCart: function (req, data){
        Cart.findAll({
            raw: true, 
            where: {user_id : req.session.userID}
            })
            .then((productsDB)=>{
                for (product of data){          //###
                    let match = productsDB.find(productDB=> productDB.product_id == product.product_id)
                    if(match){                  //el usuario posee ese item en el carrito => sumo una unidad
                        Cart.update({
                            quantity: (parseInt(match.quantity) + parseInt(product.quantity))
                            },{
                            where: {
                                product_id : match.product_id
                            } 
                        })
                    }else{                      //El producto no esta en el Carrito
                        Cart.create(product)
                    }
                }
            })
    }
}

module.exports = services
