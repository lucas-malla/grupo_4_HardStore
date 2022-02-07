const path = require('path')

const controller = {
    home: function(req, res){
        res.render("index")
    },
}

module.exports = controller
