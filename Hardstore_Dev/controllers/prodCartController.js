const fs = require('fs');
const path = require('path')

const controller = {
    cart: (req, res) => {
        res.render("productCart")
    }
}


module.exports = controller