const usersModels = require("../models/usersModel");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { success, failed, successLogin } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helpers/env");

const users = {
    getDetail : async(req, res) =>{
        try {
            const id = req.userId;
            const result = await usersModels.findAll({
                where: {
                    id,
                },
            });
            success(res, result[0], "Get Details Users Success");
        } catch (error) {
            failed(res.status(401), 401, error);
        }
    },
    login: async (req, res) => {
        try {
            const { body } = req;
            const email = req.body.email;
            const cekEmail = await usersModels.findAll({
                where: {
                    email,
                },
            });
            if (cekEmail.length <= 0) {
                failed(res.status(404), 404, "Email not Exist");
            } else {
                const passwordHash = cekEmail[0].password;
                bcrypt.compare(body.password, passwordHash, (error, checkpassword) => {
                    if (error) {
                        failed(res.status(404), 404, error);
                    } else if (checkpassword === true) {
                        const user = cekEmail[0];
                        const payload = {
                            id: user.id,
                        };
                        // const token = jwt.sign(payload, JWT_SECRET, {expiresIn: 30 * 60})
                        const token = jwt.sign(payload, JWT_SECRET, )
                        
                        successLogin(res, user, token, "Login Success");  
                    } else {
                        failed(res.status(404), 404, "Wrong Password");
                    }
                });
            }
        } catch (error) {
            console.log(error)
            failed(res.status(401), 401, error);
        }
    },
    register: async(req, res) =>{
        try {
            const { body } = req;
            // const pinHash = bcrypt.hashSync(body.pin, 10)
            const email = req.body.email;
            const cekEmail = await usersModels.findAll({
                where: {
                    email,
                },
            });
            if(cekEmail.length <= 0){
                const passwordHash = bcrypt.hashSync(body.password, 10);
                const register = await usersModels.create({
                    email: body.email,
                    password: passwordHash,
                    name: body.name,
                    gender: body.gender,
                    profilePic: "defaultImage.jpg"
                });
                success(res, register, "Register Success");
            }else{
                failed(res.status(404), 404, "Email already Register");
            }
        } catch (error) {
            // console.log(error)
            failed(res.status(401), 401, error);
        }
    },
    update: async (req, res) => {
        try {
            const {
                email,
                name,
                gender,
            } = req.body;
            const id = req.userId;
            const Detail = await usersModels.findAll({
                where: {
                    id,
                },
            });
            const result = await usersModels.update(
                {
                    email,
                    name,
                    gender,
                    profilePic: req.file ? req.file.filename : "defaultImage.jpg",
                },
                { where: {id},
            });
            const validasi = req.file ? "yes" : "no";
            if (Detail[0].profilePic === "defaultImage.jpg" || validasi === 'no') {
                success(res, result, "Update Data Success");
            } else {
                fs.unlink(`./uploads/${Detail[0].profilePic}`, (err) => {
                    if (err) {
                        failed(res.status(500), 500, err);
                    } else {
                        success(res, result, "Update Data Success");
                }
                });
            }
        } 
        catch (error) {
            failed(res.status(401), 401, error);
        }
    },
} 
module.exports = users;