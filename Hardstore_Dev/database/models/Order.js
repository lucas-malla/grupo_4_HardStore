const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    let alias = 'Order'; // esto debería estar en singular
    let cols = {
        order_id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        state: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: 'order'
    }
    const Order = sequelize.define(alias,cols,config);

    Order.associate = function(models){
        // Order.belongsTo(models.User,{
        //     as: "user",
        //     foreignKey: "user_id"
        // })
        // Order.belongsToMany(models.Product,{
        //     as: "products",
        //     through: "order_product",
        //     foreignKey: "order_id",
        //     otherKey: "product_id",
        //     timestamps: false
        // })
    }

    return Order
}
