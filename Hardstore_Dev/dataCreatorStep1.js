console.log("soy el creador de datos STEP1")
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
    category_name: "Sillas"
}
let cat7 = {
    category_name: "Juegos"
}
let cat8 = {
    category_name: "Combos"
}
let cat9 = {
    category_name: "Computadoras"
}
Product_category.bulkCreate([cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9])

// Product 
Product.create({
    product_name: "Teclado gamer Redragon Kumara K552",
    description: "ergonomico, velóz, con base antideslizante, con retroalimentación ",
    brand:"Redragon",
    model: "Kumara K552",
    color: "Negro",
    price: "6999",
    selection: "2",
    stock: "270",
    discount: "5",
    category_id: "1",
    images: {
        image_name: "teclado1.jpeg"
    }
},{
    include: [{ association: 'images' }]
})
Product.create({
    product_name: "Teclado gamer Sentey",
    description: "ergonomico, velóz, con base antideslizante, con retroalimentación ",
    brand:"Sentey",
    model: "M125",
    color: "Negro",
    price: "4500",
    selection: "3",
    stock: "20",
    discount: "5",
    category_id: "1",
    images: {
        image_name: "teclado2.jpg"
    }
},{
    include: [{ association: 'images' }]
})
Product.create({
    product_name: "Combo Teclado y Mouse Noganet",
    description: "Lo mejor del mercado, mejor relacion precio-calidad",
    brand:"Noganet",
    model: "H-U130",
    color: "Negro",
    price: "3200",
    selection: "3",
    stock: "270",
    discount: "5",
    category_id: "8",
    images: {
        image_name: "tecl_mouse.jfif"
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
    selection: "2",
    stock: "270",
    discount: "5",
    category_id: "9",
    images: {
        image_name: "notebook1.png"
    }
},{
    include: [{ association: 'images' }]
})
Product.create({
    product_name: "Notebook Asus i3 8GB de RAM",
    description: "Pantalla de 15.6' procesador Intel Core i3 11320H 8GB de memoria RAM 256GB disco solido, Intel Iris Xe Graphics G7 96EUs 60 Hz 1920x1080px Windows 11 Home ",
    brand:"Asus",
    model: "MA-G220",
    color: "Azul",
    price: "170000",
    selection: "3",
    stock: "32",
    discount: "15",
    category_id: "9",
    images: {
        image_name: "notebook2.jpeg"
    }
},{
    include: [{ association: 'images' }]
})
Product.create({
    product_name: "Notebook Samsung ",
    description: "Pantalla de 15.6' procesador Intel Core i5 11320H 8GB de memoria RAM 256GB disco solido, Intel Iris Xe Graphics G7 96EUs 60 Hz 1920x1080px Windows 11 Home ",
    brand:"Samsung",
    model: "G1000S",
    color: "Azul",
    price: "170000",
    selection: "9",
    stock: "12",
    discount: "0",
    category_id: "9",
    images: {
        image_name: "notebook3.jpg"
    }
},{
    include: [{ association: 'images' }]
})

Product.create({
    product_name: "Auriculares Gamer",
    description: " Sonido increible",
    brand:"Noganet",
    model: "G1000S",
    color: "nEGRO",
    price: "5400",
    selection: "2",
    stock: "47",
    discount: "7",
    category_id: "3",
    images: {
        image_name: "auriculares1.png"
    }
},{
    include: [{ association: 'images' }]
})

Product.create({
    product_name: "Auriculares Redragon",
    description: " Sonido increible",
    brand:"Reddragon",
    model: "G1000S",
    color: "ROJO",
    price: "5400",
    selection: "3",
    stock: "17",
    discount: "10",
    category_id: "3",
    images: {
        image_name: "auriculares2.jpg"
    }
},{
    include: [{ association: 'images' }]
})

Product.create({
    product_name: "Tres juego triple A",
    description: "Consultar titulos segun disponibilidad",
    brand:"EA games",
    model: "G1000S",
    color: "ROJO",
    price: "5400",
    selection: "1",
    stock: "17",
    discount: "5",
    category_id: "7",
    images: {
        image_name: "juego1.png"
    }
},{
    include: [{ association: 'images' }]
})

Product.create({
    product_name: "Spiderman PC",
    description: "Bundre Spiderman PC 2020",
    brand:"EA games",
    model: "G1000S",
    color: "ROJO",
    price: "5400",
    selection: "1",
    stock: "5",
    discount: "20",
    category_id: "7",
    images: {
        image_name: "juego2.jpg"
    }
},{
    include: [{ association: 'images' }]
})

Product.create({
    product_name: "Silla oficina",
    description: "Para soldado raso del excel",
    brand:"China",
    model: "G1000S",
    color: "Azul",
    price: "2300",
    selection: "1",
    stock: "5",
    discount: "20",
    category_id: "6",
    images: {
        image_name: "silla1.jpg"
    }
},{
    include: [{ association: 'images' }]
})
Product.create({
    product_name: "Silla Gamer",
    description: "Con sillas marca VICIO, olvidate de los dolores de espalda",
    brand:"VICIO,",
    model: "G1000S",
    color: "Roja",
    price: "15300",
    selection: "2",
    stock: "12",
    discount: "5",
    category_id: "6",
    images: {
        image_name: "silla2.jpg"
    }
},{
    include: [{ association: 'images' }]
})