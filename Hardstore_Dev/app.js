const express = require('express');
const app = express();
const path = require('path')

app.use(express.static(path.resolve(__dirname, './public')))

let PUERTO = 3000
app.listen(process.env.PORT || PUERTO, () => console.log("server: ON  Port:", PUERTO))

//HOME
app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
})

//PRODUCT GALERY
app.get('/products', function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/products_galery.html"))
})

//PRODUCT DETAIL
app.get('/product-detail', function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/detail.html"))
})

//SHOPING CART
app.get('/productCart', function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/productCart.html"))
})

//LOGIN
app.get('/login', function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/login.html"))
})

//REGISTER
app.get('/register', function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/register.html"))
})
