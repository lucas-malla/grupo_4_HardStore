const {Cart, User, Product} =  require('../database/models');
const { randomProducts } = require('../services/productServices')


const controller = {
    cartLogged: (req, res) => {
        randomProducts()
            .then((showRandom)=>{
                let total = 0
                let products = User.findAll({
                    raw: true, 
                    where: {
                         id : req.params.id
                        },
                        include: [{association: 'product', include: [{association: 'images' }] }]
                })
                let quantity = Cart.findAll({
                    raw: true, 
                    where: {
                         user_id : req.params.id
                        }
                })
                Promise.all([products, quantity])
                    .then((response)=>{
                        if(response[1].length==0){  //no hay productos!
                            response[0] = []
                            res.render("productCart", { 'itemCart':response[0], 'showRandom': showRandom, total}) //fix for empty carts 
                        }else{
                            for(product of response[0]){
                                let cart_row = response[1].find(element => 
                                    element.product_id == product['product.id']
                                )
                                product["price_dto"] = product['product.price'] * (100-product['product.discount'])/100
                                product['quantity']= cart_row.quantity
                                total += product["price_dto"]
                            }
                            res.render("productCart", { 'itemCart':response[0], 'showRandom': showRandom, total})
                        } 
                    })
            })
    },  
    cartUnlogged: (req, res) => {
        let total = 0
        let products = []
        randomProducts()
            .then((showRandom)=>{
                if(req.cookies.cartUnlogged){ // presece of products in unlogged cart (cookie)
                    let productsID = []
                    for (product of req.cookies.cartUnlogged){
                        productsID.push(product.prodID) //from cookie
                    }
                    Product.findAll({
                        raw: true, 
                        where: {
                             id : productsID  //array whith products IDs
                            },
                            include: [{association: 'images'}]
                        })
                        .then(cart=>{
                            for(product of cart){
                                let cart_row = req.cookies.cartUnlogged.find(element => 
                                    element.prodID == product.id)
                                product = { //Rearrange data to work correctly with the view
                                    'product.id': product.id,
                                    'product.brand': product.brand,
                                    'product.model': product.model,
                                    'product.price': product.price,
                                    'product.discount': product.discount,
                                    'price_dto': product.price * (100-product.discount)/100,
                                    'product.stock': product.stock,
                                    'product.product_name': product.product_name,
                                    'product.images.image_name': product['images.image_name'],
                                    'quantity': cart_row.quantity
                                }
                                total += product['price_dto']
                                products.push(product)
                            }
                            res.render("productCart", { 'itemCart':products, 'showRandom': showRandom, total})
                        })
                }else{ //unLogged Cart is empty
                    res.render("productCart", { 'itemCart':products, 'showRandom': showRandom, total})
                }
            })
    },
    addToCart:(req, res)=>{
        if(req.session.userID){                 //user logged
            Cart.findAll({
                raw: true, 
                where: {user_id : req.session.userID}
            })
                .then((products)=>{
                    let match = products.find(product=> product.product_id == req.params.id)
                    if(match){                  //el usuario posee ese item en el carrito => sumo una unidad
                        Cart.update({
                            quantity: (match.quantity + 1)
                            },{
                            where: {product_id : req.params.id} 
                        })
                        res.redirect(`/user/${req.session.userID}/Cart`)
                    }else{                      //El producto no esta en el Carrito
                        Cart.create({
                            product_id: req.params.id,
                            user_id: req.session.userID,
                            quantity: 1,
                        })
                        res.redirect(`/user/${req.session.userID}/Cart`)
                    }
                })
        }else{ //user unlogged
            let cookieData = {}
            if(req.cookies.cartUnlogged){
                if(req.cookies.cartUnlogged.find(product=>product.prodID == req.params.id)){ //product is already in cart
                    for (product of req.cookies.cartUnlogged){                  
                        if(product.prodID == req.params.id){
                            product.quantity =  parseInt(product.quantity) + 1
                        }
                    }
                    cookieData = [...req.cookies.cartUnlogged]
                }else{ // product it's not in cart
                    cookieData = [...req.cookies.cartUnlogged, {prodID: req.params.id, quantity: "1"}]
                }
            }else{
                cookieData = [{prodID: req.params.id, quantity: "1"}]//first product
            }
            res.cookie('cartUnlogged', cookieData, {maxAge:30*24*60*60*1000}) //unlogged cart will save for 30days
            res.redirect('/')
        }
    },
    removeFromCart: function (req, res){
        if(req.session.userID){         //user is logged
            Cart.destroy({where:{
                product_id : req.params.id,
                user_id: req.session.userID
            }})
            .then(()=>{
                res.redirect(`/user/${req.session.userID}/Cart`)
            })
        }else{                          //user is unLogged
            let cookieData = req.cookies.cartUnlogged.filter((product)=>{
                return product.prodID != req.params.id
            })
            res.cookie('cartUnlogged', cookieData, {maxAge:30*24*60*60*1000}) //unlogged cart will save for 30days)
            res.redirect(`/user//Cart`)
        }
    }
}

module.exports = controller
