const User=require('../models/user');
module.exports.home=async function(req,res){
    let users=await User.find({});
    console.log(users)
     return res.render('home',
                         {
                           allusers:users   
                         });
}
