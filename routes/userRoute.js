const express = require('express');
const userController = require('./../controllers/userController')

const router = express.Router();

router.post('/signup',userController.Signup);
router.post('/login',userController.Login);
router.get('/getalluser',userController.getAll);
router.get('/getoneuser/:id',userController.getOne);
router.post('/updateone/:id',userController.Updateone);
router.delete('/deleteone/:id',userController.Deleteone);
router.post('/buybook',userController.Buybook);



module.exports = router;