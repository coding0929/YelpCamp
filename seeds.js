var mongoose=require("mongoose");
var campgrounds= require("./models/campground");
var comment    = require("./models/comments");
//comment file
var Data=[
    {   
        name: "Salmon Creek",
        image:"https://oregondiscovery.com/wp-content/uploads/2017/08/P7220020Auth-1.jpg",
        desc: "Salmon Creek is an unincorporated community settlement and census-designated place (CDP) in Sonoma County, California, U.S. It is located on the Pacific coast about 90 minutes drive north of San Francisco, between the towns of Jenner and Bodega Bay, California. The population was 86 at the 2010 census."
    },
    {   name:"Santa Cruz",
        image:"https://content.r9cdn.net/rimg/dimg/dc/5a/9b4c136a-city-10654-167184d2356.jpg?width=400&height=262",
        desc:"blablabla"
    },
    {
        name:"Yosemite", 
        image:"https://www.tripsavvy.com/thmb/3it2GRMqxoxpTWtisl8QK0hbGEE=/3424x2568/smart/filters:no_upscale()/yosemite-falls-yosemite-national-park-california-usa-683750029-58b0dfc75f9b5860462db5b0.jpg",
        desc:"blablabla"
    }
]

function seedDB(){
    campgrounds.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("All campground removed");
            Data.forEach(function(seed){
                campgrounds.create(seed, function(err,campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Add a place");
                        //create a comment
                        comment.create({
                            author: "Yi",
                            text: "This place is great, but no internet!"
                        }, function(err,com){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(com);
                                campground.save();
                                console.log("create new comment");
                                
                            }
                        })
                    }
                })
            })
        }
    })
}

module.exports=seedDB;