var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");



router.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(error, campground){
        if(error){
            console.log("Error: \n"+error);
        }else{
            res.render("campgrounds/index", {campgrounds: campground});
        }
    });
});

router.post("/campgrounds", middleware.isLoggedIn,function(req, res){
    var name=req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var des = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price:price, image: image, description: des, author: author};
    // create new campground and save to DB;
    Campground.create(newCampground, function(error, created){
        if(error){
            console.log("Error: \n" + error);
        }else{
            res.redirect("/campgrounds");     
        }
    });
});

router.get("/campgrounds/new", middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});



router.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided id  render show template with that campground
    Campground.findById(req.params.id).populate("comments").exec(function(error, findCampground){
        if(error){
            console.log("Error\n"+error);
        }else{
            res.render("campgrounds/show", {campground: findCampground});
        }
    });
});

//Edit route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership , function(req, res){
    Campground.findById(req.params.id, function(error, fCampground){
                res.render("campgrounds/edit",{campground:fCampground});
     });
});


//Update route

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, uCampground){
        if(error){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//Destroy route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(error){
        if(error){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;