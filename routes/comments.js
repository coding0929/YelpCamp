//=====================
//comments
//=====================
var express=require("express");
var router=express.Router();
var campgrounds= require("../models/campground");
var comments=require("../models/comments");
var middleWare=require("../middleWare/index");

router.get("/campgrounds/:id/comments/new", middleWare.isLoggedIn, function(req,res){
    campgrounds.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
          res.render("comments/new",{campgrounds:campground});  
        }
    })
    
})

router.post("/campgrounds/:id/comments",middleWare.isLoggedIn, function(req,res){
    campgrounds.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            comments.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Success");
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    })
})

//edit comment
//id: campground, comments_id:comments id
router.get("/campgrounds/:id/comments/:comments_id/edit",middleWare.checkCommentOwnership, function(req,res){
    comments.findById(req.params.comments_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campgrounds_id: req.params.id, comments:foundComment});
        }
    })
    
})
//update comment 
router.put("/campgrounds/:id/comments/:comments_id",middleWare.checkCommentOwnership, function(req,res){
    comments.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//comment destroy route
router.delete("/campgrounds/:id/comments/:comments_id",middleWare.checkCommentOwnership, function(req,res){
    comments.findByIdAndRemove(req.params.comments_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


module.exports=router;