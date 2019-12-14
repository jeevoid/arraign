module.exports = (sequelize, DataTypes) => {
    let users = sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },{
        timestamps: true
    });
    return users;
    };