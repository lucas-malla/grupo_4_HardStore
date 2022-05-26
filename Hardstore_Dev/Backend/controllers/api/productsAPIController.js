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
pagination: (req,res) =>{
    let perPage= 5;
    const page = parseInt(req.query.page)
    Product.findAll({
        raw: true,
        include: [{association:'category'},{ association: 'images', attributes: ['image_name'] }],
        offset: perPage * (page - 1),
        limit: perPage
    })
    .then(products => {
        let respuesta = {
            meta: {
                status : 200,
                total: products.length,
                url: 'api/products/?'
            },
            data: products
        }
            res.json(respuesta);
    })
}
}


module.exports = controller