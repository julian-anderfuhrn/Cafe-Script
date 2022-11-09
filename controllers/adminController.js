const path = require('path');
const fs = require('fs');

module.exports = {
    index: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        res.render(path.resolve(__dirname,'../views/admin/administrate'),{products});
    },
    create: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        res.render(path.resolve(__dirname,'../views/admin/newProduct')); 
    },
    save: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        let newProduct = {
            id: products.length +1,
            nombre: req.body.name,
            descripcion: req.body.description,
            precio: req.body.price,
            descuento: req.body.discount,
            imagen: req.file.filename
        }
        products.push(newProduct);
        let productsJson = JSON.stringify(products,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/products.json'),productsJson);
        res.redirect('/admin/options');
    },
    show: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        let myProduct;
        products.forEach(product => {
            if(product.id == req.params.id){
                myProduct = product;
            }
        });
        res.render(path.resolve(__dirname,'../views/admin/detail'),{myProduct});
    },
    edit: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        let productEdit = products.find(product => product.id == req.params.id);
        res.render(path.resolve(__dirname,'../views/admin/edit'),{productEdit});
    },
    update: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        let productsUpdate = products.map(product =>{
            if(product.id == req.body.id){
                return product = req.body;
            }
            return product;
        })
        let productUp = JSON.stringify(productsUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/products.json'),productUp)
        res.redirect('/admin/options')
    },
    destroy: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        const productDelete = req.params.id;
        const newProducts = products.filter(product => product.id != productDelete);
        let productsSave = JSON.stringify(newProducts);
        fs.writeFileSync(path.resolve(__dirname,'../database/products.json'),productsSave);
        res.redirect('/admin/options')
    }
}