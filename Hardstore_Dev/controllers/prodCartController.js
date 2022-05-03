const fs = require('fs');
const path = require('path')

const {Cart, Product, User, Product_image, sequelize} =  require('../database/models')

//Base de Datos de productos
dataBasePath = path.join(__dirname, '../data_base/productos.json')
data_base = fs.readFileSync(dataBasePath)
data_base = JSON.parse(data_base)

let itemCart = data_base.filter(producto => producto.prod_id <= 7)
let random = function(productos){
let resultado = [];
    for(let i = 1; i <= 3; i++ ){
    let aleatorio = productos[Math.floor(Math.random() * productos.length)]
    resultado.push(aleatorio)
}
return resultado
}
let showRandom = random(data_base);

const controller = { 
    cartLogged: (req, res) => {
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
                    //products["price_dto"] = products['product.price'] * (100-products['product.discount'])/100
                    for(product of response[0]){
                        let cart_row = response[1].find(element => 
                           element.product_id == product['product.id']
                        )
                        //console.log(cart_row);
                        product["price_dto"] = product['product.price'] * (100-product['product.discount'])/100
                        product['quantity']= cart_row.quantity
                        //console.log(product);
                    }
            
                    res.render("productCart", { 'itemCart':response[0], 'showRandom': showRandom}) // Error datos con match incorrecto
                    }) 
    },
    cartUnlogged: (req, res) => {
        //Problema para mas adelante

        //CART for non logged user

        //guardar carito en una cookie 

        //al loguearse añadir esos productos al servidor => base de datos para los carrito de los users

        res.render("productCart", { 'itemCart':itemCart, 'showRandom': showRandom})
    }
}

module.exports = controller