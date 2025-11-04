import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
  name:{
    type:String,
    default:"",
  },
  image:{
    type:String,
    default:""
  }
},{timestamps:true});

const categoryModel=mongoose.models.Category || mongoose.model("Category",categorySchema);
export default categoryModel;