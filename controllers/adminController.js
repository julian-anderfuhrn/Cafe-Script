const path = require('path');
const fs = require('fs');
const Products = require('../models/Products')

module.exports = {
    index:  async (req,res) => {
        //let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        let products = await Products.find()
        console.log(products);
        res.render(path.resolve(__dirname,'../views/admin/administrate'),{products});
    },
    create: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        res.render(path.resolve(__dirname,'../views/admin/newProduct')); 
    },
    save: async (req,res) => {
        req.body.imagen = req.file.filename;
        const product = Products(req.body)
        const productSaved = await product.save()
        res.redirect('/admin/options');
    },
    show: async(req,res) => {
        let products = await Products.find()
        let myProduct =  products.find(product => product.id == req.params.id)
        res.render(path.resolve(__dirname,'../views/admin/detail'),{myProduct});
    },
    edit: async (req,res) => {
        //let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        let products = await Products.find()
        let productEdit = products.find(product => product.id == req.params.id);
        res.render(path.resolve(__dirname,'../views/admin/edit'),{productEdit});
    },
    update: async(req,res) => {
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        const id = req.params.id;
        await Products.findByIdAndUpdate(id,req.body);
        res.redirect('/admin/options');
    },
    destroy:  async(req,res) => {
        const {id} = req.params;
        await Products.findByIdAndDelete(id);
        res.redirect('/admin/options');
    }
}