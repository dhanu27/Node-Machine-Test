const express=require('express');
const router=express.Router();
const passport = require('passport');

const userController=require('../controller/users');

router.post('/create',userController.create);
router.get('/signup',userController.signup);

router.post('/update-password',userController.updatePassword);
router.get('/reset-password/:email',userController.resetPassword);
router.get('/delete-user/:email',userController.deleteUser);
router.post('/update-deatils',userController.updateDetails);
router.get('/user-details/:id',userController.getUserDetails);
module.exports=router;