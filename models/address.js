const mongoose=require('mongoose');
const addressSchema=new mongoose.Schema({
    location:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
},{timestamps:true});

const Address=mongoose.model('address',addressSchema);

module.exports=Address;

