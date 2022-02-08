const path = require('path')

const controller = {
    login: function(req, res){
        res.render("login")
    },
    register: function(req, res){
        res.sendFile(path.resolve(__dirname, "../views/register.html"))
    }
}

module.exports = controller
