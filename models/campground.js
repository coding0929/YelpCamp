var mongoose=require("mongoose");

//create schema
var campgroundSchema= new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    desc:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"comment" //database name
        }
    ]
});

module.exports=mongoose.model("campgrounds", campgroundSchema);