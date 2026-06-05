const mongoose=require('mongoose');
const placeSchema=new mongoose.Schema({
    title:String,
    type:String,
    location:String,
    description:String,
    full_description:String,
    img:{
        url:String,
        filename:String,
    },
    price:String,
    latitude:Number,
    longitude:Number
})
module.exports=mongoose.model("Place",placeSchema);