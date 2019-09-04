var express    =require("express"),
    app        =express(),
    bodyParser =require("body-parser"),
    mongoose   =require("mongoose"),
    seedDB     =require("./seeds"),
    passport   =require("passport"),
    localStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    flash      =require("connect-flash"),
    campgrounds=require("./models/campground"),
    comments    =require("./models/comments"),
    user        =require("./models/user")

var commentRoutes= require("./routes/comments"),
    campgroundsRoutes=require("./routes/campgrounds"),
    authRoutes=require("./routes/auth");
  
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

// var url = process.env.DATABASEURL || "mongodb://localhost/Yelp_Camp";
// mongoose.connect(url);

// mongoose.connect("mongodb://localhost/Yelp_Camp");
mongoose.connect("mongodb+srv://Yi:123@cluster0-y9clr.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true
})
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passprot configuration
app.use(require("express-session")({
        secret: "Yi is cute",
        resave:false,
        saveUninitialized:false
        }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});


app.use(commentRoutes);
app.use(campgroundsRoutes);
app.use(authRoutes);

//seedDB();

app.listen(process.env.PORT || 9000, process.env.IP, function(){
  console.log("YelpCamp has started!");
});