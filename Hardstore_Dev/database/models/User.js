const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    let alias = 'User'; // esto debería estar en singular
    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        email:{ 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        first_name: DataTypes.STRING(50),
        last_name: DataTypes.STRING(50),
        cellphone: DataTypes.INTEGER(50),
        street: DataTypes.STRING(50),
        street_number: DataTypes.INTEGER(10),
        avatar: DataTypes.STRING(100)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: 'user'
    }
    const User = sequelize.define(alias,cols,config);

    User.associate = function(models){
        User.belongsToMany(models.Product, {
            as: "items",
            through: "cart_product",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false,
        })
        User.hasMany(models.Cart, {
            as: "cart",
            foreignKey: "user_id"
        })
        User.hasMany(models.Order,{
            as: "orders",
            foreignKey: "user_id"
        })
    }

    return User
}
