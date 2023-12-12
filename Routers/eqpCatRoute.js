const express  = require('express');
const router = express.Router();
const {create,
    getAllEQPC,
    getEQPC,
    update,
    del}=require('../Controllers/EquipmentCategoryController');

router.route('/').post(create)
router.route('/get-all').get(getAllEQPC);
router.route('/:id').get(getEQPC).put(update).delete(del);


module.exports = router;