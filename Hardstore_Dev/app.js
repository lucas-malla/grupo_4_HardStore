const express = require('express');
const app = express();
const path = require('path')

let rutasProductos = require('./src/routes/products.js')
let rutaUsers = require('./src/routes/users.js')

app.use(express.static(path.resolve(__dirname, './public')))

let PUERTO = 3020
app.listen(process.env.PORT || PUERTO, () => console.log("server: ON  Port:", PUERTO))

//HOME
app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, "./src/views/index.html"))
})

//SHOPING CART
app.get('/productCart', function(req, res){
    res.sendFile(path.resolve(__dirname, "./src/views/productCart.html"))
})

//PRODUCT DETAIL & PRODUCT GALERY
app.use('/products', rutasProductos);

//USERS
app.use('/user', rutaUsers);
