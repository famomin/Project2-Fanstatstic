module.exports = function(sequelize, DataTypes) {
    var googlogin = sequelize.define("googlogin", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
          }
        });

    return googlogin;
  };