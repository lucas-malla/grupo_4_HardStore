const { Product, Product_category, Product_image, Cart } = require('../../database/models')


const controller = {
    total: (req, res) => {
        let products = Product.count({ raw: true })
        let category = Product_category.count({ raw: true })
        Promise.all([products, category]).then(([products, categories]) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/products/totals'
                },
                data: [{ products }, { categories }]
            }
            res.json(respuesta);
        })
    },
    list: (req, res) => {
        let perPage = 5;
        const page = parseInt(req.query.page)
        let products = Product.findAll({
            raw: true,
            include: [{ association: 'category' }, { association: 'images', attributes: ['image_name'] }],
            offset: perPage * (page - 1),
            limit: perPage
        })
            .then(products => {
            try{
                for (product of products) {
                    product['images.image_name'] = `http://localhost:3000/images/products/${product['images.image_name']}`
                }
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: `api/products/?page=${page}`
                    },
                    data: products
                }
                res.json(respuesta);
            } catch{
                let respuesta = {
                    meta: {
                        status : 400,
                        msj: "bad query request",
                        url: `api/products/?page=${page}`
                    }
                }
                res.status(400).json(respuesta)

            }
            })
    }
}


module.exports = controller