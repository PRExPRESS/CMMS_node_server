const express  = require('express');
const router = express.Router();

const {getSettings,update}= require('../Controllers/settingController');

router.route('/get-settings').get(getSettings);
router.route('/update').put(update);


module.exports = router;