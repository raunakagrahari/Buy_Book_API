const express = require('express');
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')


const router = express.Router();

router.post('/signup' ,userController.Signup);
router.post('/login',userController.Login);
router.get('/getalluser',authController.protect,userController.getAll);
router.get('/getoneuser/:id',authController.protect,userController.getOne);
router.post('/updateone/:id',authController.protect,userController.Updateone);
router.delete('/deleteone/:id',authController.protect,userController.Deleteone);
router.post('/buybook',authController.protect,userController.Buybook);



module.exports = router;