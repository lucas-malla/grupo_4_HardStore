const path = require('path')

const controller = {
    galery: function(req, res){
        res.sendFile(path.resolve(__dirname, "../views/products_galery.html"))
    },
    detail: function(req, res){
        res.sendFile(path.resolve(__dirname, "../views/detail.html"))
    }
}

module.exports = controller
