const db = require('../database/models');
const sequelize = db.sequelize;

const controller = {
    home: function(req, res){
        var ourSelection = db.Product.findAll({
            raw: true , include: [{ association: 'images', attributes: ['image_name'] }]
        })
        //var mostSold = db.Product.findAll({where: {selection: 2}},{
        var mostSold = db.Product.findAll({
            raw: true ,include: [{ association: 'images', attributes: ['image_name'] }]
        })
        var offers = db.Product.findAll({
            raw: true ,include: [{ association: 'images', attributes: ['image_name'] }]
        })
        ourSelectionOutput = []
        mostSoldOutput = []
        offersOutput = []

        Promise.all([ourSelection, mostSold, offers])
            .then(([ourSelection, mostSold, offers])=>{
                for (product of ourSelection){
                    console.log(product)
                    //product['images.image_name']
                    product["price_dto"] = product.price * (100-product.discount)/100
                    product["prod_img"] = product['images.image_name']
                    ourSelectionOutput.push(product)
                }
                for (product of mostSold){
                    product["price_dto"] = product.price * (100-product.discount)/100
                    product["prod_img"] = product['images.image_name']
                    mostSoldOutput.push(product)
                }
                for (product of offers){
                    product["price_dto"] = product.price * (100-product.discount)/100
                    product["prod_img"] = product['images.image_name']
                    offersOutput.push(product)
                }
                res.render("index",{
                    'mostSold': mostSoldOutput,
                    'ourSelection': ourSelectionOutput,
                    'offers': offersOutput,
                })
            })
    },
    test_user: function(req, res){
        db.User.findAll({
            include:[
            {association: "user_cart_products"},
            {association: "cart"}
        ]})
            .then((usuario)=>{
                res.send(usuario)
            })
    },
    test_product: function(req, res){

        db.Product.findAll()
            .then((producto)=>{
                res.send(producto)
            })
    }
}

module.exports = controller
