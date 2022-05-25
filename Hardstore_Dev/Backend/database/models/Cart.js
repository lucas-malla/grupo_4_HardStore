module.exports = (sequelize, DataTypes) => {
    let alias = 'Cart'; // esto debería estar en singular
    let cols = {
        id: {
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
            as: "product",
            foreignKey: "id", //OJO
        }
        )
    }
    return Cart
}
