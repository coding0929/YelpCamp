var express=require("express");
var router=express.Router();
var passport=require("passport");
var user=require("../models/user");

router.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});


//==========
//Auth route
//=========

//show register form
router.get("/register", function(req, res){
    res.render("register");
})

//handle sign up logic
router.post("/register", function(req,res){
    var newUser=new user({username:req.body.username});
    user.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        req.flash("success","Welcome to YelpCamp "+user.username);
        passport.authenticate("local")(req,res,function(){
           res.redirect("/campgrounds"); 
        });
    })
})

//show login form
router.get("/login", function(req, res){
    res.render("login");
})
//handle login logic
router.post("/login", passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function(req,res){
    
});

//logout route
router.get("/logout", function(req,res){
    req.flash("success","Logged you out");
    req.logout();
    res.redirect("/campgrounds");
})

module.exports=router;