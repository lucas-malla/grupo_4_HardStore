const refreshContent = require('../services/homeServices')

const db = require('../database/models');
const sequelize = db.sequelize;

const controller = {
    home: function(req, res){
        var ourSelection = db.Product.findAll({
            include: [{ association: 'images' }]
        })
        var mostSold = db.Product.findAll({
            include: [{ association: 'images' }]
        })
        var offers = db.Product.findAll({
            include: [{ association: 'images' }]
        })
        ourSelectionOutput = []
        mostSoldOutput = []
        offersOutput = []

        Promise.all([ourSelection, mostSold, offers])
            .then(([ourSelection, mostSold, offers])=>{
                for (product of ourSelection){
                    product.dataValues["price_dto"] = product.dataValues.price * (100-product.dataValues.discount)/100
                    product.dataValues["prod_img"] = product.dataValues.images[0].image_name
                    ourSelectionOutput.push(product.dataValues)
                }
                for (product of mostSold){
                    product.dataValues["price_dto"] = product.dataValues.price * (100-product.dataValues.discount)/100
                    product.dataValues["prod_img"] = product.dataValues.images[0].image_name
                    mostSoldOutput.push(product.dataValues)
                }
                for (product of offers){
                    product.dataValues["price_dto"] = product.dataValues.price * (100-product.dataValues.discount)/100
                    product.dataValues["prod_img"] = product.dataValues.images[0].image_name
                    offersOutput.push(product.dataValues)
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
