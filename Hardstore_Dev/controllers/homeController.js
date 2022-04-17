const refreshContent = require('../services/homeServices')

const db = require('../database/models');
const sequelize = db.sequelize;

const controller = {
    home: function(req, res){
        refreshContent()
        res.render("index",
        {
            'mostSold': mostSold,
            'ourSelection': ourSelection,
            'offers': offers,
        })
    },
    test_user: function(req, res){
        db.User.findAll({
            //subQuery: false,
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
