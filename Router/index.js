const express=require('express');
const router=express.Router();
const passport = require('passport');

const homeController=require('../controller/homeController');

router.get('/',homeController.home);
router.use('/users',require('./users'));
module.exports=router;
