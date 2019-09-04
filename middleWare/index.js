var campgrounds=require("../models/campground");
var comments=require("../models/comments");

var middleWareObj={};

middleWareObj.checkCampgroundOwnership=function(req,res, next){
    if(req.isAuthenticated()){
        campgrounds.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                   next();
                   }else{
                       req.flash("error","You don't have permission");
                       res.redirect("back");
                   }
            }
        });
    }else{
        res.redirect("back");
    }
};

middleWareObj.checkCommentOwnership=function(req, res, next){
    if(req.isAuthenticated()){
        comments.findById(req.params.comments_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission");
                    res.redirect("back");
                }
            }
            
        })
    }else{
        req.flash("error", "You need to log in first");
        res.redirect("back");
    }
}

middleWareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please log in first");
    res.redirect("/login");
}

module.exports=middleWareObj;