module.exports = function(sequelize, DataTypes) {
    var Player_team = sequelize.define("Player_team", {
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        //},
        //date_started: {
            //type: DataTypes.DATEONLY,
            //allowNull: false
        //},
        //date_left: {
            //type: DataTypes.DATEONLY,
            //allowNull: true
        }
    },
    {
     classMethods: {
      associate: function(models) {
        Player_team.belongsTo(models.Player, {
          foreignKey: {
              name: 'player_id',
              allowNull: false
          }
        });
        Player_team.belongsTo(models.Team, {
            foreignKey: 'team_id',
            allowNull: false
        });
      }
     },
     timestamps: false 
    });

    return Player_team;
};