const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
          name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          difficulty: {
            type: DataTypes.ENUM(['1', '2', '3', '4', '5']),
            allowNull: true,
          },
          duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          season: {
            type: DataTypes.ENUM(["Winter", "Autumn", "Spring", "Summer"]),
            allowNull: true,
          },
        })  
}