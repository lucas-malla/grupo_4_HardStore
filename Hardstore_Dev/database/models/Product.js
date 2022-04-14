const { TINYINT } = require('sequelize');
const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        brand: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        model: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        color:{ 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        price:{ 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        discount:{ 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        stock:{ 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        product_name:{ 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        selection:{ 
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false,
        tableName: 'product'
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function(models){
        Product.belongsToMany(models.User, {
            as: "user",
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false,
        });
    }

    return Product
}
