const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const remember = require('./middlewares/remember')
const locals = require('./middlewares/locals')
const cors = require("cors");
var corsOptions = {
  origin: "*"
};

//Llamado a Rutas
let mainRoutes = require('./routes/main.js');
let rutasProductos = require('./routes/products.js');
let adminRoutes = require('./routes/admin.js');
let userRoutes = require('./routes/users.js');

// Llamado rutas API
let productsRoutes = require('./routes/api/products.js');
let usersRoutes = require('./routes/api/users.js');

const methodOverride = require("method-override");          //FOR POST METHODS
const req = require('express/lib/request');
app.use(methodOverride("_method"));


app.use(cors(corsOptions));
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
  }
app.use(allowCrossDomain);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));           //para capturar envios por post en "req.body"
app.use(session( {secret: "la clave secreta"}));
app.use(cookieParser());
app.use(remember);
app.use(locals);

app.set("view engine", 'ejs');
app.set("views",["./views","./views/admin","./views/users"]);
//app.set("views","./views");


let PUERTO = 3000
app.listen(process.env.PORT || PUERTO, () => console.log("server: ON  Port:", PUERTO));
//MAIN ROUTES (home)
app.use('/', mainRoutes);

//login-register-profile
app.use('/', userRoutes);

//PRODUCT DETAIL & PRODUCT GALERY
app.use('/products', rutasProductos);

//ADMIN
app.use('/admin', adminRoutes)

//Recursos APIs
app.use('/api/products', productsRoutes)
app.use('/api/users', usersRoutes)

//404
app.use((req, res, next)=>{
    res.status(404).render('notFound');
    next();
})
