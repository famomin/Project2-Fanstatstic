module.exports = function(sequelize, DataTypes) {
    var Player_team = sequelize.define("Player_team", {
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_started: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        date_left: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },
    {timestamps: false},
    {
     classMethods: {
      associate: function(models) {
        Player_stat.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false
            }
        });
        Player_stat.belongsTo(models.Team, {
            foreginKey: {
                allowNull: false
            }
        });
      }
     } 
    });

    return Player_team;
};