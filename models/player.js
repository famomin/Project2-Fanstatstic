'use strict';

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
    },
    {
      classMethods: {
      associate: function(models) {
        console.log(models);
        Player.hasMany(models.Player_stat, {
          foreignKey: {
              name: 'player_id',
              allowNull: false
          },
          as: 'Player_stat'
        });
        Player.hasMany(models.Player_team, {
            foreignKey: {
                name: 'player_id',
                allowNull: false
            },
            as: 'Player_team'
        });
      }
     },
     timestamps: false 
    });

    return Player;
};