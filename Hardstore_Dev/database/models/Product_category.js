const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    let alias = 'Product_category'; // esto debería estar en singular
    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false,
        tableName: 'category'
    }
    const Product_category = sequelize.define(alias,cols,config);
    
    Product_category.associate = function(models){
        Product_category.hasMany(models.Product,{
            as: "products",
            foreignKey: {
                name: "category_id", // the JavaScript attribute name
                field: "category_id", // the column name
              }
        })
    
    
}
return Product_category

}
