const path = require('path')

const controller = {
    galery: function(req, res){
        res.render("products_galery")
    },
    detail: function(req, res){
        res.render("detail")
    }
}

module.exports = controller
