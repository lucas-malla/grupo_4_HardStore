const fs = require('fs');
const path = require('path');
const { Sequelize } = require('../database/models');
const db = require ('../database/models');
const Op = Sequelize.Op

// function refreshContent(){
//     //Base de Datos de productos
//     dataBasePath = path.join(__dirname, '../data_base/productos.json')
//     data_base = fs.readFileSync(dataBasePath)
//     data_base = JSON.parse(data_base)
//     return data_base
// }
const controller = {
    galery: function(req, res){
        if (req.query.search){
            //console.log (req.query)
                db.Product.findAll ({raw:true, include: [{ association: 'images', attributes: ['image_name'] }],
                where: {
                    product_name: {[Op.like]: '%'+req.query.search+'%'}  
                }
            })
            .then ((products)=> {
                for (product of products){
                    console.log(product)
                    product["price_dto"] = product.price * (100-product.discount)/100
                }
                return (products)
            })   
            .then ((product)=> {
                res.render('products_galery', {product:product})
            }) 
            .catch ((error)=> {
                res.send (error)
            })
        }

        if (req.params.filter){
        db.Product_category
        .findOne ({
            where: {
                category_name: req.params.filter
            }
        })
        .then ((resultado)=> {
            let category = resultado.id
            db.Product
            .findAll ({raw:true, include: [{ association: 'images', attributes: ['image_name'] }],
                where: {
                    category_id: category //|| req.query.search  
                }
             })
             .then(product =>{
                //res.send (product)
                res.render('products_galery', {product:product})
            })
        })
    }
    else {
        db.Product.findAll ({raw:true, include: [{ association: 'images', attributes: ['image_name'] }]})
            .then(product =>{
            res.render('products_galery', {product:product})
        })
        }
    },

    detail: function(req, res){
   
        db.Product.findByPk(req.params.id,{
            raw: true,
            include: [{ association: 'images', attributes: ['image_name'] }]
        })
        .then(product =>{
            res.render('detail', {product:product})
           })
        }
    }
module.exports = controller
