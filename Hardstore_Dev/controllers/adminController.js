const req = require('express/lib/request');
const fs = require('fs');
const path = require('path')
const sequelize = require('sequelize')
const db = require('../database/models')
const {User, Product, Cart, Product_category, Product_image} = db
const { Op } = require("sequelize");
const {agregarProducto, allDataBase, writeFile } = require('../services/adminServices')


const controller = {
    controlPanel:function(req, res){
        // Product.findAll()
        // .then((results)=>{
        //     console.log(results)
        // })
        Product.findAll({raw: true, /*include: [{association: 'images', attributes:['image_name'] }]*/},) // Find product- Para incluir imagen en su columna 'image_name'
        .then((results) =>{

            console.log("results", results)
            res.render("adminControlPanel", {results: results})
        })
    },
    addProduct: function(req, res){
        Product_category.findAll({raw:true})
        .then((categories)=>{
        res.render("adminProdCreation", {categories: categories})
        })

    },
    addProductPost: function(req, res){
        if (req.file != undefined) {
            //creo objeto del producto nuevo
            console.log(req.body)
            Product.create({
                    product_name: req.body.prodName,
                    description: req.body.description,
                    brand: req.body.brand,
                    model: req.body.model,
                    color: req.body.color,
                    price: req.body.price,
                    discount: req.body.dto,
                    category: req.body.category,
                    // images: {
                    //     image_name: req.file.filename
                    // }
                }//,
                //{ include: [{association: 'category'}] }
            ).then(()=> {
                res.redirect("/admin/controlPanel"); // Mas adelante hacer vista de detalle de producto
            })
            .catch(err =>{
                console.log(err)
            })

        }else{
            res.render("adminProdCreation", {mesage: "La imagen no ha sido cargada correctamente"})
        }
    },
    manageProductEdit: function(req, res){
        //obtengo la información
        let product = Product.findByPk(req.params.id, {raw:true,
            include: [{association: 'images'}]
        });
        let categories = Product_category.findAll();
        let images = Product_image.findAll({
            include: [{association: 'product'}]
        })
        Promise.all([product, categories, images]).then(([oneProduct, allCategories, allImages])=>{
            res.render("adminProdModification", {oneProduct, allCategories, allImages});
        })

        },
    manageProductUpdate: function (req,res){
        Product.update({
            product_name: req.body.prodName,
                    description: req.body.description,
                    brand: req.body.brand,
                    model: req.body.model,
                    color: req.body.color,
                    product_category_id: req.body.category,
                    price: req.body.price,
                    discount: req.body.dto
        },
        {
            where: {product_id: req.params.id}
        })
        .then(function(){
            return Product.findByPk(req.params.id)
        })
        .then(product => {
            return product.setImages(req.file.filename);
         })
        .then(() =>{
            res.redirect("/admin/controlPanel");
         })
    },
    delete: (req, res) => {
		let products = allDataBase();
		let productIndex = products.findIndex(function(product){
			return product.prod_id == req.params.id
		})
		products.splice(productIndex, 1)
		writeFile(products)
		res.redirect('/admin/ControlPanel')
	}
}

module.exports = controller
