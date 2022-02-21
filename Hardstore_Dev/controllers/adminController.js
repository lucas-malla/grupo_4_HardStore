const fs = require('fs');
const path = require('path')

function get_next_id(data_base){
    //devuelve el proximo id de producto a crear
    return ((data_base.slice(-1))[0].prod_id)+1
}
function agregarProducto(newProduct){
    //read DB
    dataBasePath = path.join(__dirname, '../data_base/productos.json')
    data_base = fs.readFileSync(dataBasePath)
    data_base = JSON.parse(data_base)
    // Generate id and Add new Product
    newProduct["prod_id"] = get_next_id(data_base)
    data_base.push(newProduct)
    //Store DB
    data_base = JSON.stringify(data_base, null, 4) //por formato
    fs.writeFileSync( dataBasePath, data_base, "utf8" )
    return newProduct["prod_id"]
}

const controller = {
    login: function(req, res){
        res.render("adminLogin")
    },
    controlPanel:function(req, res){
        res.render("adminControlPanel")
    },
    addProduct: function(req, res){
        res.render("adminProdCreation")
    },
    manageProduct: function(req, res){
        res.render("adminProdModification")
    },

    addProductPost: function(req, res){
        console.log(req.body)
        //creo objeto del producto nuevo
        newProduct = {
            //prod_id: String(get_next_id()),
            prod_name: req.body.prodName,
            prod_category: req.body.categoria,
            most_sold: req.body.mostSold || "false",
            selection: req.body.selection || "false",
            offer: req.body.offer || "false",
            prod_img: 'no Image',
            price: req.body.price,
            price_dto: req.body.price * (100- req.body.dto)/100,
            dto: req.body.dto
        },
        //Manage DB
        prod_id = agregarProducto(newProduct)
        //Redirect
        res.redirect("/products/product-detail/"+ String(prod_id));
    },
    manageProductPost: function(req, res){
        console.log("entre por post a manageProductPost")
        
        res.redirect("/products/product-detail/"+ String(8));
    }
}

module.exports = controller
