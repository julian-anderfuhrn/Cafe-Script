const path = require('path');
const fs = require('fs');
const productsShema = require('../models/Products');

module.exports = {
    index: (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/products.json')));
        res.render(path.resolve(__dirname,'../views/allProducts'),{products});
    }
}