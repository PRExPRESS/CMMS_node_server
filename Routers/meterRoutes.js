const express  = require('express');
const router = express.Router();
const {
    create,
    getAllReadings,
    getReading,
    update,
    del
}=require('../Controllers/meterController');

router.route('/').post(create)
router.route('/get-all').get(getAllReadings);
router.route('/:id').get(getReading).put(update).delete(del);


module.exports = router;