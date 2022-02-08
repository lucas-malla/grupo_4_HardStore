
const controller = {
    login: function(req, res){
        res.render("adminLogin")
    },
    addProduct: function(req, res){
        res.render("prodCreation")
    },
    manageProduct: function(req, res){
        res.render("prodModification")
    }
}

module.exports = controller
