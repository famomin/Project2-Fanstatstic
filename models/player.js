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
    }, {timestamps: false});

    return Player;
};