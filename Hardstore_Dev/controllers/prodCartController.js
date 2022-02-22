const fs = require('fs');
const path = require('path')

//Base de Datos de productos
dataBasePath = path.join(__dirname, '../data_base/productos.json')
data_base = fs.readFileSync(dataBasePath)
data_base = JSON.parse(data_base)["data_base"]

const controller = {
    cart: (req, res) => {
        res.render("productCart")
    }
}

module.exports = controller