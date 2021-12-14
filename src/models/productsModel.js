const { Sequelize, DataTypes } = require("sequelize");
const Users = require("./usersModel");
const db = require("../config/db");

const Product = db.define(
    "tbl_products",
    {
        id_products : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_image: {
            type : DataTypes.STRING
        },
        product_name:{
            type : DataTypes.STRING 
        },
        product_desc:{
            type : DataTypes.TEXT
        },
        userID : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    },
    
)
Product.belongsTo(Users, { as: "User", foreignKey: "userID" });



module.exports = Product;