
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
    }
}

module.exports = controller
