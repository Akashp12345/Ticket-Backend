const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
   type:String
    },
   mybooking:{
    type:Array
   }
   
})
const userModel=mongoose.model("User",userSchema)
module.exports=userModel