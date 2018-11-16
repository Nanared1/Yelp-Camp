var express         = require("express");
var app             = express();
var bodyparser      = require("body-parser");
var flash           = require("connect-flash");
var mongoose        = require("mongoose");
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var methodOverride  = require("method-override");
var Campground      = require("./models/campground");
var Comments        = require("./models/comments");
var User            = require("./models/user");
var seedDB          = require("./seeds");





var commentRoutes       = require("./routes/comments");
var campgroundRoutes    = require("./routes/campgrounds");
var authRoutes          = require("./routes/auth");

//mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); 
mongoose.connect('mongodb://Nanared1:hello1@ds163683.mlab.com:63683/yelp_camp');


app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

app.use(require("express-session")({
    secret:"What is this????",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp camp server is listening"); 
});