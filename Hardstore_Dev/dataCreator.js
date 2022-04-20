console.log("soy el creador de datos")
const db = require('./database/models')
const {User, Product, Cart } = db

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
    username: 'gaby',
    password: '123',
    email: 'Gaby@gmail.com',
    first_name: 'Gaby',
    last_name: 'P',
    cellphone: '15-1234-1234',
    street: 'ni idea',
    street_number: '1234',
    avatar: 'default.jpg',
}
let user4 ={
    username: 'genesis',
    password: '123',
    email: 'Gene@gmail.com',
    first_name: 'Gene',
    last_name: '?',
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

User.bulkCreate([user1, user2, user3, user4, user5])

