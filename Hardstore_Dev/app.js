const express = require('express');
const app = express();
const path = require('path')

app.set("view engine", 'ejs');
app.use(express.static(path.resolve(__dirname, './public')))

let rutasProductos = require('./routes/products.js');
let mainRoutes = require('./routes/main.js');


let PUERTO = 3010
app.listen(process.env.PORT || PUERTO, () => console.log("server: ON  Port:", PUERTO))


//MAIN ROUTES (home-login-register)
app.use('/', mainRoutes);

//SHOPING CART
app.get('/productCart', function(req, res){
    res.render("productCart")
})

//PRODUCT DETAIL & PRODUCT GALERY
app.use('/products', rutasProductos);
