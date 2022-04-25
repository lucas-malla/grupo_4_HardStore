const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    let alias = 'Product_image'; // esto debería estar en singular
    let cols = {
        image_id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: DataTypes.BIGINT(10).UNSIGNED,
        image_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false,
        tableName:'product-images'
    }
    const Product_image = sequelize.define(alias, cols, config);

    Product_image.associate = function (models) {
        Product_image.belongsTo(models.Product, {
            as: "product",
            foreignKey:"product_id"
        })
    }
    return Product_image
}
