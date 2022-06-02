const db = require('../database/models');


const controller = {
    home: function(req, res){        
        var ourSelection = db.Product.findAll({limit: 4, where: {selection : 1},
            raw: true , include: [{ association: 'images', attributes: ['image_name'] }]
        })
        var mostSold = db.Product.findAll({limit: 4, where: {selection : 2},
            raw: true ,include: [{ association: 'images', attributes: ['image_name'] }]
        })
        var offers = db.Product.findAll({limit: 4, where: {selection : 3},
            raw: true ,include: [{ association: 'images', attributes: ['image_name'] }]
        })
        ourSelectionOutput = []
        mostSoldOutput = []
        offersOutput = []

        Promise.all([ourSelection, mostSold, offers])
            .then(([ourSelection, mostSold, offers])=>{
                for (product of ourSelection){
                    product["price_dto"] = product.price * (100-product.discount)/100
                    ourSelectionOutput.push(product)
                }
                for (product of mostSold){
                    product["price_dto"] = product.price * (100-product.discount)/100
                    mostSoldOutput.push(product)
                }
                for (product of offers){
                    product["price_dto"] = product.price * (100-product.discount)/100
                    offersOutput.push(product)
                }
                res.render("index",{
                    'mostSold': mostSoldOutput,
                    'ourSelection': ourSelectionOutput,
                    'offers': offersOutput,
                })
            })
    }
}

module.exports = controller
