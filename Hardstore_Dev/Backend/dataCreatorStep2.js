console.log("soy el creador de datos STEP2")
const db = require('./database/models')
const {Cart } = db

Cart.create({
    product_id: 5,
    user_id: 1,
    quantity: 6,
})
Cart.create({
    product_id: 6,
    user_id: 1,
    quantity: 3,
})
Cart.create({
    product_id: 8,
    user_id: 3,
    quantity: 10,
})
Cart.create({
    product_id: 9,
    user_id: 1,
    quantity: 2,
})
Cart.create({
    product_id: 10,
    user_id: 3,
    quantity: 2,
})
