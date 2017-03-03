module.exports = function(sequelize, DataTypes) {
    var fblogin = sequelize.define("fblogin", {
        id: {
            type: DataTypes.BIGINT,
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

    return fblogin;
  };