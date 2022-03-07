const controller = {
    login: function(req, res){
        res.render("login")
    },
    register: function(req, res){
        res.render("register")
    },
    loginPost: function(req, res){
        console.log(req.body);
        console.log("post de login")
        res.render("login")
    },
    registerPost: function(req, res){
        console.log(req.body);
        console.log("post de register")
        res.render("register")
    }
}

module.exports = controller
