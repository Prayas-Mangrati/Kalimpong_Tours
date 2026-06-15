const mongoose=require("mongoose");

const adminStatsSchema=new mongoose.Schema({
    added:{
        type:Number,
        default:0
    },
    edited:{
        type:Number,
        default:0
    },
    deleted:{
        type:Number,
        default:0
    }

});
module.exports=mongoose.model("AdminStats",adminStatsSchema);