const fs = require('fs');
const path = require('path')

const {Cart, Product} =  require('../database/models')

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

        Cart.findAll({where: {user_id : 1}},{ include: [{ association: 'product'}]})
            .then((productsOnCart)=>{
                console.log(productsOnCart[0].product_id) //1

                // Product.findOne({where: { id: productsOnCart[0].product_id}})
                //     .then((detail)=>{
                //         console.log(detail)
                //     })
                res.send(productsOnCart)
                res.render("productCart", { 'itemCart':itemCart, 'showRandom': showRandom})
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