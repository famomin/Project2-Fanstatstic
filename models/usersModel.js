module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {timestamps: false});

    return User;
};