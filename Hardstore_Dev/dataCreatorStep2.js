console.log("soy el creador de datos STEP2")
const db = require('./database/models')
const {User, Product, Cart, Product_category } = db

Cart.create({
    cart_product_id: 1,
    product_id: 1,
    user_id: 1,
    quantity: 6,
})
Cart.create({
    cart_product_id: 2,
    product_id: 2,
    user_id: 1,
    quantity: 3,
})
Cart.create({
    cart_product_id: 3,
    product_id: 2,
    user_id: 3,
    quantity: 10,
})
Cart.create({
    cart_product_id: 4,
    product_id: 2,
    user_id: 1,
    quantity: 2,
})
Cart.create({
    cart_product_id: 5,
    product_id: 2,
    user_id: 3,
    quantity: 2,
})

