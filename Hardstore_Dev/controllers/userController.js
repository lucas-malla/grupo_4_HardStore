const path = require('path')

const controller = {
    login: function(req, res){
        res.sendFile(path.resolve(__dirname, "../views/login.html"))
    },
    register: function(req, res){
        res.sendFile(path.resolve(__dirname, "../views/register.html"))
    }
}

module.exports = controller
