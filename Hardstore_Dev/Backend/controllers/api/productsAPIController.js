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
        Product.findAll({
            raw: true,
            include: [{ association: 'category' }, { association: 'images', attributes: ['image_name'] }],
            offset: perPage * (page - 1),
            limit: perPage
        })
            .then(products => {
                try {
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
                } catch {
                    let respuesta = {
                        meta: {
                            status: 400,
                            msj: "bad query request",
                            url: `api/products/?page=${page}`
                        }
                    }
                    res.status(400).json(respuesta)

                }
            })
    },

    lastProduct: (req, res) => {
        Product.findAll({
            raw: true,
            order: [['id', 'DESC']],
            limit: 1,
            include: [{ association: 'images', attributes: ['image_name'] }]
        })
            .then(product=>{
                product[0]['images.image_name'] = `http://localhost:3000/images/products/${product[0]['images.image_name']}`
                let respuesta = {
                    meta: {
                        status: 200,
                        url: `api/products/lastProduct`
                    },
                    data: product
                }
                res.json(respuesta);

            })
    },
    create: (req, res) => {
        Product.create({
            product_name: req.body.prodName,
            description: req.body.description,
            brand: req.body.brand,
            model: req.body.model,
            color: req.body.color,
            price: req.body.price,
            discount: req.body.dto,
            stock: req.body.stock,
            category_id: req.body.category,
            selection: req.body.selection,
            images: {
                image_name: req.body.filename
            }
        },
            { include: [{ association: 'images' }] }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    } 
}



module.exports = controller