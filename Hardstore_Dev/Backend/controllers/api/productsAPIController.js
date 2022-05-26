const {Product,Product_category, Product_image, Cart } = require('../../database/models')


const controller ={

list: (req,res) =>{
    Product.findAll({
        raw: true,
        include: [{association:'category'},{ association: 'images', attributes: ['image_name'] }]
    })
    .then(products => {
        let respuesta = {
            meta: {
                status : 200,
                total: products.length,
                url: 'api/products'
            },
            data: products
        }
            res.json(respuesta);
        })
},
}


module.exports = controller