module.exports = function (sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Player;
};
