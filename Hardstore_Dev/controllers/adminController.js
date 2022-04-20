const req = require('express/lib/request');
const fs = require('fs');
const path = require('path')
const sequelize = require('sequelize')
const db = require('../database/models')
const {User, Product, Cart, Product_category, Product_image} = db
const { Op } = require("sequelize");
const {agregarProducto, allDataBase, writeFile } = require('../services/adminServices')


const controller = {
    login: function(req, res){
        res.render("adminLogin")
    },
    controlPanel:function(req, res){
        let results = allDataBase();
        res.render("adminControlPanel", {results: results})
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
            Product.create(
                {
                    product_name: req.body.prodName,
                    description: req.body.description,
                    brand: req.body.brand,
                    model: req.body.model,
                    color: req.body.color,
                    product_category_id: req.body.category,
                    price: req.body.price,
                    discount: req.body.dto
                }
            )
            // .then((product)=>{
            //     product.setImages(product.product_id);
            //     Product_image.create({
            //         image_name: req.file.filename
            //     })
            // })
            .then(()=>{
                res.redirect("/products/");
            })
            
        }else{
            res.render("adminProdCreation", {mesage: "La imagen no ha sido cargada correctamente"})
        }
    }, 
    manageProductEdit: function(req, res){
        //obtengo la información
        let products = allDataBase ()
        let productFound = products.find (function(product){
        return product.prod_id == req.params.id
        })
        console.log (productFound);
        res.render ("adminProdModification", {product: productFound}); 
        },
    manageProductUpdate: function (req,res){
        let products = allDataBase ();
        let productFound = products.find (function (product){
        return product.prod_id== req.params.id 
            })
            productFound.prod_name= req.body.prodName
            productFound.prod_category=req.body.categoria 
            productFound.most_sold = req.body.mostSold == "on" ? "true" : "false"
            productFound.selection = req.body.selection == "on" ? "true" : "false"
            productFound.offer = req.body.offer == "on" ? "true" : "false"
            productFound.prod_img=req.file.filename
            productFound.price=req.body.price
            productFound.price_dto= req.body.price * (100- req.body.dto)/100
            productFound.dto=req.body.dto
            productFound.descripcion=req.body.description
            writeFile (products);
            res.redirect ('/products/'+ String (productFound.prod_id));
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
