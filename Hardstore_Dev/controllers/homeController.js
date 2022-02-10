const fs = require('fs');
const path = require('path')

//Base de Datos de productos
dataBasePath = path.join(__dirname, '../data_base/productos.json')
data_base = fs.readFileSync(dataBasePath)
data_base = JSON.parse(data_base)["data_base"]
//filtros de productos (secciones de home)
mostSold = data_base.filter(producto => producto.most_sold == 'True')
ourSelection = data_base.filter(producto => producto.selection == 'True')
offers = data_base.filter(producto => producto.offer == 'True')

const controller = {
    home: function(req, res){
        res.render("index",
        {
            'mostSold': mostSold,
            'ourSelection': ourSelection,
            'offers': offers
        })
    },
}

module.exports = controller
