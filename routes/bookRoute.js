const express = require('express');
const bookController = require('./../controllers/bookController')

const router = express.Router();

router.post('/createbook',bookController.createBook);
router.get('/getallbook',bookController.getAll);
router.get('/getonebook/:id',bookController.getOne);
router.post('/updatebook/:id',bookController.Updateone);
router.delete('/deletebook/:id',bookController.Deleteone);

module.exports = router;