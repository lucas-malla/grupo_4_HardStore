const req = require('express/lib/request');
const fs = require('fs');
const path = require('path')
const sequelize = require('sequelize')
const db = require('../database/models')
const { User, Product, Cart, Product_category, Product_image } = db
const { Op } = require("sequelize");


const controller = {
    controlPanel: function (req, res) {
        Product.findAll({ raw: true, include: [{ association: 'images', attributes: ['image_name'] }] },) // Find product- Para incluir imagen en su columna 'image_name'
            .then((results) => {
                res.render("adminControlPanel", { results: results })
            })
    },
    addProduct: function (req, res) {
        Product_category.findAll({ raw: true }) // MIRAR solución de DataValues
            .then((categories) => {
                res.render("adminProdCreation", { categories})
            })

    },
    addProductPost: function (req, res) {
        if (req.file != undefined) {
            //creo objeto del producto nuevo
            Product.create({
                product_name: req.body.prodName,
                description: req.body.description,
                brand: req.body.brand,
                model: req.body.model,
                color: req.body.color,
                price: req.body.price,
                discount: req.body.dto,
                category_id: req.body.category,
                images: {
                    image_name: req.file.filename
                }
            },
                { include: [{ association: 'images' }] }
            ).then(() => {
                res.redirect("/admin/controlPanel"); // Mas adelante hacer vista de detalle de producto
            })
                .catch(err => {
                    console.log(err)
                })

        } else {
            Product_category.findAll({ raw: true })
            .then((categories) => {
                res.render("adminProdCreation", { categories,  mesage: "La imagen no ha sido cargada correctamente" })
            })
        }
    },
    manageProductEdit: function (req, res) {
        //obtengo la información
        let product = Product.findByPk(req.params.id, {
            raw: true,
            include: [{ association: 'images' }]
        });
        let categories = Product_category.findAll();
        let images = Product_image.findAll();
        Promise.all([product, categories, images]).then(([oneProduct, allCategories, allImages]) => {
            res.render("adminProdModification", { oneProduct, allCategories, allImages });
        })
    },
    manageProductUpdate: function (req, res) {
        Product.update({ 
            product_name: req.body.prodName,
            description: req.body.description,
            brand: req.body.brand,
            model: req.body.model,
            color: req.body.color,
            category_id: req.body.category,
            price: req.body.price,
            discount: req.body.dto
        },
            {
                where: { product_id: req.params.id }
            })
            .then(() => {
                if (req.file != undefined) { //Verifica si se cargó alguna imagen para actualizar en campo image_name
                    Product_image.findOne(
                        { where: { product_id: req.params.id } }
                    )
                        .then((images) => {
                            images.update({
                                image_name: req.file.filename
                            })
                        })
                        .then(() => {
                            res.redirect("/admin/controlPanel");
                        })
                } else {
                    res.redirect("/admin/controlPanel");// Si imagen es undefined simplemente actualiza datos de producto y redirecciona
                }
            })
    },
    delete: (req, res) => {
        return Product_image.destroy({ // Elimino la imagen del producto en tabla product_image. 
            where: {
                product_id: req.params.id
            }
            })
            .then(function(){
                return Product.destroy({// elimino producto.
                    where: {
                        product_id: req.params.id
                    }
                })
            })
            .then(function(){
                return res.redirect("/admin/controlPanel")
            })
    }
}

module.exports = controller
