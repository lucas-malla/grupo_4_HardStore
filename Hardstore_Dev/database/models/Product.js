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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount:{ 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock:{ 
            type: DataTypes.INTEGER,
            allowNull: true
        },
        product_name:{ 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        selection:{ 
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(500)
        },
        category_id: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false,
        tableName: 'product'
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function(models){
    //     Product.belongsToMany(models.Order,{
    //         as: "on_orders",
    //         through: "order_product",
    //         foreignKey: "product_id",
    //         otherKey: "order_id",
    //         timestamps: false
    //     })
    
        Product.belongsToMany(models.User, {
            as: "clients",
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false,
        })
        Product.belongsTo(models.Product_category,{
            as: "category",
            foreignKey: {
                name: "category_id", // the JavaScript attribute name
                field: "category_id", // the column name
              }
        })
        Product.hasMany(models.Product_image,{
            as: "images",
            foreignKey:"product_id"
        })
        Product.hasMany(models.Cart,{
            as: "in_users_cart",
            foreignKey: "product_id"
        })
    }

    return Product
}
