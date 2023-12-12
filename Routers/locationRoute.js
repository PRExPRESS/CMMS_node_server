const express  = require('express');
const router = express.Router();
const {create,bulkCreate,getAllLoc,getLoc,update,del,getLocByRoom}=require('../Controllers/locationController');
const {temp_upload} = require('../Middleware/uploads');
router.route('/bulk-upload').post(temp_upload.single('temp'),bulkCreate);
router.route('/').post(create);
router.route('/get-room/:room').get(getLocByRoom);
router.route('/get-all').get(getAllLoc);
router.route('/:id').get(getLoc).put(update).delete(del);


module.exports = router;