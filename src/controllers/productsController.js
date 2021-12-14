const productsModel = require("../models/productsModel")
const fs = require("fs");
const { Sequelize } = require("sequelize");
const { success, failed } = require("../helpers/response");
const Op = Sequelize.Op;

const products = {
    getAll : async (req, res) =>{
        try {
            const { query } = req;
            const search = query.search === undefined ? "" : query.search;
            const products = await productsModel.findAll({
                where: {
                    product_name: {
                        [Op.like]: `%${search}%`,
                    },   
                },
                // required:false
            })
            // console.log(products)
            success(res, products, "Get All Products Success");
        } 
        catch (err) {
            failed(res.status(401), 401, err)
        }
    },
    getDetail : async(req,res) =>{
        try {
            const id = req.userId;
            const result = await productsModel.findAll({
                where: {
                    userID : id,
                },

            });
            success(res, result, "Get Details Success");
        } catch (error) {
            failed(res.status(401), 401, error);
        }
    },
    getDetailProduct : async(req,res) =>{
        try {
            const id = req.userId;
            const idProduct = req.params.id
            const result = await productsModel.findAll({
                where: {
                    id_products: idProduct,
                    userID : id,
                },

            });
            success(res, result[0], "Get Details Products  Success");
        } catch (error) {
            failed(res.status(401), 401, error);
        }
    }
    ,
    update : async(req,res) =>{
        try {
            const {
                product_name,
                product_desc,
            } = req.body;
            // console.log(product_desc)
            const id = req.userId;
            const idProduct = req.params.id
            // console.log(idProduct)
            const Detail = await productsModel.findAll({
                where: {
                    id_products : idProduct,
                    userID : id,
                },
            });
            // console.log(Detail[0].product_image)
            const result = await productsModel.update(
                {
                    product_name : product_name,
                    product_desc : product_desc,
                    product_image: req.file ? req.file.filename : "defaultImage.jpg",
                },
                { where: {id_products : idProduct},
            });
            const validasi = req.file ? "yes" : "no";
            // console.log(validasi)
            if (Detail[0].product_image === "defaultImage.jpg" || validasi === 'no') {
                success(res, result, "Update Data Success");
            } else {
                fs.unlink(`uploads/${Detail[0].product_image}`, (err) => {
                    if (err) {
                        failed(res.status(500), 500, err);
                        console.log(err)
                    } else {
                        success(res, result, "Update Data Success");
                    }
                });
            }

        } catch (error) {
            failed(res.status(401), 401, error);
        }
    },
    insertProduct : async(req,res) =>{
        try {
            const { product_name, product_desc } = req.body;
            const id = req.userId;
            console.log(product_name)
            const insertProducts = await productsModel.create({
                product_name,
                product_desc,
                product_image : req.file ? req.file.filename : "defaultImage.jpg",
                userID : id
            })
            success(res, insertProducts, "Insert Products Success");
        } catch (error) {
            failed(res.status(401), 401, error);
        }
    }
    ,
    destroy : async(req,res) =>{
        try {
            const id = req.params.id;
            const deleteProduct = await productsModel.destroy({
                where : {
                    id_products : id 
                }
            })
            success(res, deleteProduct, "Delete Products Success");
        } catch (error) {
            failed(res.status(401), 401, error);
        }
    }

}
module.exports = products; 