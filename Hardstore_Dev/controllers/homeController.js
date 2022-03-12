const refreshContent = require('../services/homeServices')

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
}

module.exports = controller
