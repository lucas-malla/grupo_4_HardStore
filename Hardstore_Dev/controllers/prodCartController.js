const fs = require('fs');
const path = require('path')

//Base de Datos de productos
dataBasePath = path.join(__dirname, '../data_base/productos.json')
data_base = fs.readFileSync(dataBasePath)
data_base = JSON.parse(data_base)["data_base"]

let itemCart = data_base.filter(producto => producto.prod_id <= 7)
const controller = {
    cart: (req, res) => {
        res.render("productCart", { 'itemCart':itemCart})
    }
}


module.exports = controller