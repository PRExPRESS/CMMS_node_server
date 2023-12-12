const express  = require('express');
const router = express.Router();
const {upload2} = require('../Middleware/uploads')
const {create,
    getAllJob,
    getJob,
    update,
    edit,
    getJobNo,
    del}=require('../Controllers/jobController');

router.route('/').post(upload2.array('picture[]',5),create);
router.route('/get-all').get(getAllJob);
router.route('/get-job-no').get(getJobNo);
router.route('/edit/:id').put(upload2.array('picture[]',5),edit)
router.route('/:id').put(upload2.array('picture[]',5),update).delete(del).get(getJob);


module.exports = router;