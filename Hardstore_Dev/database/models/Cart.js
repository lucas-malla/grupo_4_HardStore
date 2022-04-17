const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    let alias = 'Cart'; // esto debería estar en singular
    let cols = {
        cart_product_id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false,
        tableName: 'cart_product'
    }
    const Cart = sequelize.define(alias,cols,config);

    Cart.associate = function(models){
        Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
        Cart.hasMany(models.Product,{
            as: "product_detail",
            foreignKey: "product_id"
        })
    }

    return Cart
}
