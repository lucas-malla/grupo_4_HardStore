const fs = require('fs');
const path = require('path')

//Base de Datos de productos
dataBasePath = path.join(__dirname, '../data_base/productos.json')
data_base = fs.readFileSync(dataBasePath)
data_base = JSON.parse(data_base)["data_base"]

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
    cart: (req, res) => {
        res.render("productCart", { 'itemCart':itemCart, showRandom: showRandom})
    }
}

module.exports = controller