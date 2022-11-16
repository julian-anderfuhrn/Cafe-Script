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
      cb(null, 'product-' + Date.now()+path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage})

router.get('/options', adminController.index);
router.get('/create', adminController.create);
router.post('/create',upload.single('imagen') ,adminController.save);
router.get('/detail/:id', adminController.show);
router.get('/edit/:id', adminController.edit)
router.put('/edit/:id',upload.single('imagen') ,adminController.update);
router.get('/delete/:id', adminController.destroy);


module.exports = router;