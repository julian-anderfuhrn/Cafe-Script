var express = require('express');
const { dirname } = require('path');
var router = express.Router();
const path = require('path');
const multer = require('multer');



const adminController = require(path.resolve(__dirname,'../controllers/adminController'));

//settings de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../public/images/products'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + Date.now()+path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage})

router.get('/options', adminController.index);
router.get('/create', function (req, res, next) {
    res.render('newProduct', { title: 'Express' });
  });



module.exports = router;