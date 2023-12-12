const express  = require('express');
const router = express.Router();
const {
    createDepartment,
    getAllDeps,
    getDep,
    update,
    del
} = require('../Controllers/departmentController');

router.route('/add-department').post(createDepartment);
router.route('/get-all').get(getAllDeps);
router.route('/:id').get(getDep);
router.route('/update/:id').put(update);
router.route('/delete/:id').delete(del)
module.exports = router;
