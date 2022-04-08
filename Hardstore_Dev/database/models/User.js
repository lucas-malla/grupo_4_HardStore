const sequelize = require('sequelize')
//const DataTypes = sequelize.DataTypes

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
        deletedAt: false
    }
    const User = sequelize.define(alias,cols,config);

    return User
}
