module.exports = (sequelize, DataTypes) => {
    let alias = 'Order_product'; // esto debería estar en singular
    let cols = {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: 'order_product'
    }
    const Order_product = sequelize.define(alias,cols,config);

    return Order_product
}
