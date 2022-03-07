const fs = require('fs');
const path = require('path')

function refreshContent(){
    //Base de Datos de productos
    dataBasePath = path.join(__dirname, '../data_base/productos.json')
    data_base = fs.readFileSync(dataBasePath)
    data_base = JSON.parse(data_base)
    return data_base
}

const controller = {
    galery: function(req, res){
        // req.query.search     es el input del usuario al buscar un producto (GET)
        // req.params.filter    es el parametro pasado por url si se abre una categoria
        //Busqueda en  Base de Datos
        let filter = req.query.search || req.params.filter
        let results = []
        refreshContent()
        if (filter){
            results = data_base.filter(producto => 
                producto.prod_category == filter
            )
        }else{
            results = data_base
        }
        res.render("products_galery",
        {
            'results':results
        })
    },
    detail: function(req, res){
        refreshContent()
        let producto = data_base.find(function(producto){
            return  producto.prod_id == req.params.id
        })
        //console.log(producto); 
        res.render('detail', {'producto': producto});
        }
    }
module.exports = controller
