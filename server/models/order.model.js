import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
userId: { 
  type: mongoose.Schema.ObjectId,
  ref: "User", 
  index: true 
},
orderId: { 
  type: String, 
  unique: true, 
  index: true 
},
 productId:{
  type:mongoose.Schema.ObjectId,
  ref:'Product',
 },
 product_detail:{
  name:String,
  image:Array
 },
 paymentId:{
  type:String,
  required:[true, "Payment ID required"]
 },
 payment_status:{
  type:String,
  default:""
 },
 delivery_address:{
  type:mongoose.Schema.ObjectId,
  ref:'Address'
 },
 subTotalAmt:{
  type:Number,
  default:0
 },
 totalAmt:{
  type:Number,
  default:0
 },
 invoice_receipt:{
  type:String,
  default:""
 },
},{timestamps:true});

const orderModel=mongoose.models.Order || mongoose.model("Order",orderSchema);
export default orderModel;