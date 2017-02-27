module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        player_position: {
            type: DataTypes.STRING,
        }
    }, {timestamps: false},
    {
     classMethods: {
      associate: function(models) {
        Player.belongsTo(models.Player_stat, {
          foreignKey: player_id
        });
      }
     } 
    });

    return Player;
};