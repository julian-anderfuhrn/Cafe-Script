var express = require('express');
var router = express.Router();
const path = require('path')

const productController = require(path.resolve(__dirname,'../controllers/productController'));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('product', { title: 'Express' });
});
router.get('/allProducts',productController.index);


module.exports = router;