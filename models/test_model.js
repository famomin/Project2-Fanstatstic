'use strict';

module.exports = function(sequelize, DataTypes) {
    var Team = sequelize.define("Team", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        team_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team_abbr: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
      classMethods: {
      associate: function(models) {
        // console.log(models);
        Team.hasMany(models.Player_team, {
            foreignKey: {
                name: 'team_id',
                allowNull: false
            },
            as: 'Player_team'
        });
      }
     },
     timestamps: false 
    });

    return Team;
};