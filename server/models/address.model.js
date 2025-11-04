import mongoose from "mongoose";

const addressSchema=new mongoose.Schema({
//  _id by default store by mongoDB
   address_line:{
    type:String,
    default:""
   },
   city:{
    type:String,
    default:"",
   },
   state:{
    type:String,
    default:""
   },
   pincode:{
    type:String,
   },
   country:{
    type:String,
    default:"India"
   },
   mobile:{
    type:String,
    default:null
   },
   status:{
    type:Boolean,
    default:true
   }
},{timestamps:true});

const addressModel=mongoose.models.Address || mongoose.model("Address",addressSchema);

export default addressModel;