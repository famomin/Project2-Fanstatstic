module.exports = function(sequelize, DataTypes) {
    var Stat = sequelize.define("Stat", {
        stat_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stat_abbr: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stat_column: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false});

    return Stat;
};