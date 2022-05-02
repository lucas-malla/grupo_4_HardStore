console.log("soy el creador de datos")
const db = require('./database/models')
const {User, Product, Cart, Product_category } = db

let user1 ={
    username: 'fede',
    password: '123',
    email: 'fedeW@gmail.com',
    first_name: 'Federico',
    last_name: 'Wagner',
    cellphone: '15-1234-1234',
    street: 'entre rios',
    street_number: '1234',
    avatar: 'default.jpg',
}
let user2 ={
    username: 'juan',
    password: '123',
    email: 'juan@gmail.com',
    first_name: 'juan',
    last_name: 'E',
    cellphone: '15-1234-1234',
    street: 'dios sabra',
    street_number: '1234',
    avatar: 'default.jpg',
}
let user3 ={
    username: 'Gaby',
    password: '123',
    email: 'Gaby@gmail.com',
    first_name: 'Gabriela',
    last_name: 'Paez',
    cellphone: '15-1234-1234',
    street: 'Asunción',
    street_number: '1234',
    avatar: 'default.jpg',
}
let user4 ={
    username: 'genesis',
    password: '123',
    email: 'Gene@gmail.com',
    first_name: 'Genesis',
    last_name: 'Leal',
    cellphone: '15-1234-1234',
    street: 'ni idea',
    street_number: '1234',
    avatar: 'default.jpg',
}
let user5 ={
    username: 'lucas',
    password: '123',
    email: 'lucas@gmail.com',
    first_name: 'Lucas',
    last_name: 'P',
    cellphone: '15-1234-1234',
    street: 'ni idea',
    street_number: '1234',
    avatar: 'default.jpg',
}
let user6 ={
    username: 'admin',
    password: '123',
    email: 'admin@gmail.com',
    first_name: 'admin',
    last_name: 'admin',
    cellphone: '',
    street: '',
    street_number: '',
    avatar: 'default.jpg',
}

User.bulkCreate([user1, user2, user3, user4, user5, user6])

// Product_category

let cat1 = {
    category_name: "Teclados"
}
let cat2 = {
    category_name: "Mouses"
}
let cat3 = {
    category_name: "Headsets"
}
let cat4 = {
    category_name: "Monitores"
}
let cat5 = {
    category_name: "Parlantes"
}
let cat6 = {
    category_name: "Sillas Gamer"
}
let cat7 = {
    category_name: "Juegos"
}

Product_category.bulkCreate([cat1, cat2, cat3, cat4, cat5, cat6, cat7])

// Product 
Product.create({
    product_name: "Teclado gamer Redragon Kumara K552",
    description: "ergonomico, velóz, con base antideslizante, con retroalimentación ",
    brand:"Redragon",
    model: "Kumara K552",
    color: "Negro",
    price: "6999",
    discount: "5",
    category_id: "1",
    images: {
        image_name: "prodImg-1645488763254.jpeg"
    }
},{
    include: [{ association: 'images' }]
})

Product.create({
    product_name: "Notebook Dell Inspiron 5510 Intel Core i5 8GB de RAM",
    description: "Pantalla de 15.6' procesador Intel Core i5 11320H 8GB de memoria RAM 256GB disco solido, Intel Iris Xe Graphics G7 96EUs 60 Hz 1920x1080px Windows 11 Home ",
    brand:"Dell",
    model: "Inspiron 5510",
    color: "Azul",
    price: "170000",
    discount: "5",
    category_id: "4",
    images: {
        image_name: "prodImg-1646692200036.jpg"
    }
},{
    include: [{ association: 'images' }]
})
