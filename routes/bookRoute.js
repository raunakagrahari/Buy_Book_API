const express = require('express');
const bookController = require('./../controllers/bookController')
const authController = require('./../controllers/authController')

const router = express.Router();

router.post('/createbook',bookController.createBook);
router.get('/getallbook',authController.protect,bookController.getAll);
router.get('/getonebook/:id',authController.protect,bookController.getOne);
router.post('/updatebook/:id',bookController.Updateone);
router.delete('/deletebook/:id',bookController.Deleteone);

module.exports = router;