const fs = require('fs');
const path = require('path')

const {Cart, Product, User, Product_image} =  require('../database/models')

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
        let cart = Cart.findAll({raw: true, where: {user_id : req.params.id}, include: [{ association: 'user' }, { association: 'product' }]})
        let images = Product_image.findAll({raw: true})
        Promise.all([cart, images])
            .then((products, images)=>{
                //console.log(products)
                //console.log(images)
                //console.log(images.find(image=> image.product_id == product['product.id'] ))
                // for (product of products){
                //     product['product.image_name'] = images.findAll((image)=>{return image.product_id == product['product.id'] })
                // }
                // console.log(products)
                //res.send(images)
                res.render("productCart", { 'itemCart':products, 'showRandom': showRandom})
            })

        //busqueda sin imagen de producto funcional
        // User.findAll({raw: true, where: {id : req.params.id}, include: [{ association: 'items' }, {association: 'cart'}]})
        // .then((itemsCart)=>{
            // productsOnCart.forEach(Element => {
            //    console.log(Element); 
            // }) //1
            // Product.findOne({where: { id: productsOnCart[0].product_id}})
            //     .then((detail)=>{
            //         console.log(detail)
            //     })
            //res.send(itemsCart)
            //res.render("productCart", { 'itemCart':itemsCart, 'showRandom': showRandom})
        //})
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