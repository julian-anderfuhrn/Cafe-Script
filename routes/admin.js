var express = require('express');
const { dirname } = require('path');
var router = express.Router();
const path = require('path');



router.get('/newProduct', function(req,res,next){
    res.render("newProduct")
});



module.exports = router;