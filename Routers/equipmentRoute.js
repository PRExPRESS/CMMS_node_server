const express  = require('express');
const router = express.Router();
const {upload} = require('../Middleware/uploads')
const {create,
    getAllReadings,
    getReading,
    update,
    del}=require('../Controllers/equipmentController');

router.route('/').post(upload.fields([{name:'picture[]',maxCount:5},{name:'user_manuals[]',maxCount:5}]),create);
router.route('/get-all').get(getAllReadings);
router.route('/:id').put(upload.fields([{name:'picture[]',maxCount:5},{name:'user_manuals[]',maxCount:5}]),update).delete(del).get(getReading);


module.exports = router;