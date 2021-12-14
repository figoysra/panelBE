const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");

const Users = db.define(
    "tbl_users",
    {
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        profilePic: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.NUMBER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Users;