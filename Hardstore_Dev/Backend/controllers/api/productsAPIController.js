const { Product, Product_category, Product_image, Cart, User } = require('../../database/models')

const Sequelize =  require('Sequelize')


const controller = {
    total: (req, res) => {
        let products = Product.count({ raw: true })
        let category = Product_category.count({ raw: true })
        let users = User.count({ raw: true })
        Promise.all([products, category, users]).then(([products, categories, users]) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/products/totals'
                },
                data : {
                    "products": products,
                    "categories": categories,
                    "users": users
                }
            }
            res.json(respuesta);
        })
    },
    list: (req, res) => {
        let perPage = 5;
        var page;
        if(req.query.page){
            page = parseInt(req.query.page)
        }else{
            page = 1
        }
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
    detail: (req, res) => {
        Product.findByPk(req.params.id,{
            raw: true,
            include: [{ association: 'images', attributes: ['image_name'] }]
            })
            .then(product => {
                if(product){
                    //BUENISIMO!
                    product['images.image_name'] = `http://localhost:3000/images/products/${product['images.image_name']}`
                    let respuesta = {
                        meta: {
                            status: 200,
                            url: `api/products/detail/${req.params.id}`
                        },
                        data: product
                    }
                    res.json(respuesta)
                }else{
                    let respuesta = {
                        meta: {
                            status: 400,
                            url: `api/products/detail/${req.params.id}`,
                            msg: "Product not found"
                        }
                    }
                    res.json(respuesta)

                }
            })
            .catch(error =>{
                let respuesta = {
                    meta: {
                        status: 400,
                        url: `api/products/detail/${req.params.id}`
                    },
                    data: error
                }
                res.json(respuesta)
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
    categories: (req, res)=> {
        let products = Product.count({
            raw: true,
            include: [{association: "category", attributes: ["category_name"]}],
            group: ["Product.category_id"],
            count:[]
            })
        let categories =  Product_category.findAll({raw: true })
        
        Promise.all([products, categories])
            .then(([products, categories]) => {
                for(group of products){
                    let categoryDetail = categories.find(element => 
                        element.id == group["category_id"]
                    )
                    group['category_name']= categoryDetail.category_name
                    console.log(group)
                }
                res.json(products)
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