const express  = require('express');
const router = express.Router();
const {createUser,createAccount,getAllUsers,
    login,forgetPassword,getUser,updateUser,
    changePassword,changeStatus,inactiveUsers,getTech

} = require('../Controllers/userController');
const { upload3 } = require('../Middleware/uploads');

router.post('/create-user',createUser);
router.route('/create-account').put(upload3.single('avatar'),createAccount);
router.route('/change-password').put(changePassword);
router.route('/change-status/:id').put(changeStatus);
router.route('/inactive').get(inactiveUsers);
router.route('/get-tech').get(getTech);
router.get('/',getAllUsers);
router.route('/:id').get(getUser).put(upload3.single('avatar'),updateUser);
router.route('/login').post(login);
router.route('/forget-password').post(forgetPassword);





module.exports=router