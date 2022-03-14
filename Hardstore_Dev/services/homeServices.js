const fs = require('fs');
const path = require('path')

function refreshContent(){
    //Base de Datos de productos
    dataBasePath = path.join(__dirname, '../data_base/productos.json')
    data_base = fs.readFileSync(dataBasePath)
    data_base = JSON.parse(data_base)
    //filtros de productos (secciones de home)
    mostSold = data_base.filter(producto => producto.most_sold == 'true')
    ourSelection = data_base.filter(producto => producto.selection == 'true')
    offers = data_base.filter(producto => producto.offer == 'true')
    return  [mostSold, ourSelection, offers]
}

module.exports = refreshContent