const User=require('../models/user');
const Address=require('../models/address');
const bcrypt=require('bcrypt');

// Render the signup page
module.exports.signup=function(req,res){
    return res.render('signup');
}

// create user for app
module.exports.create=async function(req,res){
    try{
        // check passwords are same 
      if(req.body.password!=req.body.confirmPassword){
          console.log("Password are not same");
        //   req.flash("error","Password are not same");

         return res.redirect('back');
      }
      let user=await User.findOne({email:req.body.email});
    //   If user alredy exist
      if(user){
        //   req.flash("error","User already exits");
        console.log("User alreday exist");
          return res.redirect('back');
      }
      
    //   Salt for hasing encryption
         const salt = await bcrypt.genSalt(10);
         req.body.password =await bcrypt.hash(req.body.password, salt);
        //  create a user
          user=await User.create(req.body);
          console.log("Create user",user);
          address=await Address.create({
            location:req.body.location,
            pincode:req.body.pincode,
            user:user.id
          })
          console.log("Address",address);
        //   req.flash("success","Succesfully created a acount");
          return res.redirect('/');
    }catch(err){
          console.log("%%%%Error%%%%%",err);
    }
}


// To render reset page 
module.exports.resetPassword=function(req,res){
    console.log("Reset Password",req.params.email);
    return res.render('reset',{
        useremail:req.params.email
    });
}

module.exports.deleteUser=async function(req,res){
    try{ 
      let user=await User.findOneAndDelete({email:req.params.email});
      return ;
        console.log(user);
    }catch(err){
        console.log("Error in deleteUser",err);
    }

}

module.exports.getUserDetails=async function(req,res){
  try{
       let user=await User.findById(req.params.id);
       let address=await Address.findOne({user:req.params.id});
       console.log("Users details",user);
       console.log("Address",address);
       return res.render('update',{
         user:user,
         address:address
       });
  }catch(err){
     console.log("Error in User Detail",err);
  }
}
// For Update Details

module.exports.updateDetails=async function(req,res){
    try{
        let user=await User.findById(req.body.id);
            user.email=req.body.email;
            user.firstName=req.body.firstName;
            user.lastName=req.body.lastName;
        let address=await Address.findOne({user:req.body.id});
           address.location=req.body.location;
           address.pincode=req.body.pincode;
           user.save();
           address.save();
         return res.redirect('/');  
    }catch(err){
         console.log("Error in updating user detail",err);     
    }
}

// For Update Password
module.exports.updatePassword=async function(req,res){
      try{
          console.log(req.body);
        //   check Passwords are same
        if(req.body.password!=req.body.confirmPassword){
            // req.flash("error","Passwords are not matching");
             console.log("passwords are not match");
            return res.redirect('back');
        }  
        // find User exits or not 
        let user=await User.findOne({email:req.body.email});
        // Update user password and again encrypt it.
        if(user){
            const salt = await bcrypt.genSalt(10);
             user.password =await bcrypt.hash(req.body.password, salt);
             user.save();
            //  req.flash('success',"Your get changed");
            return res.redirect('/');
        }
        // req.flash('error',"Retry"); 
       return res.redirect('/users/login'); 
      }catch(err){
         console.log("something went wrong",err);
          
      } 
}