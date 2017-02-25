module.exports = function(sequelize, DataTypes) {
    var Searche = sequelize.define("Searche", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        player_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stat_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {timestamps: false},
    {
        classMethods: {
            associate: function(models) {
                Searche.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Searche;
};