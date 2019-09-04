var express=require("express");
var router=express.Router();
var campgrounds=require("../models/campground");
var middleWare=require("../middleWare/index");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/campgrounds", function(req, res){
    campgrounds.find({}, function(err, camp){
        if(err){
            console.log("something wrong");
        }else{
          res.render("campgrounds/index",{campgrounds:camp});   
        }
    });       
})
router.post("/campgrounds",middleWare.isLoggedIn, function(req, res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.desc;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newCamp={name:name,price:price, image:image, desc:desc, author:author};
    campgrounds.create(newCamp, function(err, camp){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds"); 
        }
    });
});
   
router.get("/campgrounds/new", middleWare.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
})

//Show
router.get("/campgrounds/:id", function(req,res){
    campgrounds.findById(req.params.id).populate("comments").exec(function(err, findCamp){
        if(err){
            console.log(err);
        }else{
           res.render("campgrounds/show", {campgrounds:findCamp}); 
        }
    })
    
    
})

//Edit campground route
router.get("/campgrounds/:id/edit", middleWare.checkCampgroundOwnership, function(req,res){
   campgrounds.findById(req.params.id, function(err, foundCampground){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.render("campgrounds/edit",{campgrounds:foundCampground});
       }
   })
})

//update campground router
router.put("/campgrounds/:id",middleWare.checkCampgroundOwnership, function(req, res){
    campgrounds.findByIdAndUpdate(req.params.id, req.body.campgrounds,function(err, updateCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//delete campground
router.delete("/campgrounds/:id",middleWare.checkCampgroundOwnership, function(req,res){
  campgrounds.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      }else{
          res.redirect("/campgrounds");
      }
  })    
})

module.exports=router;