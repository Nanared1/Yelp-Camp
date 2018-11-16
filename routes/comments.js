var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comments = require("../models/comments");
var middleware = require("../middleware");


// Comments route

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn,function(req, res){
    // look up campground using id
    // create new comment
    // connect new comment to campground
    // redirect to campground show page
    Campground.findById(req.params.id, function(error, campground) {
       if(error){
           console.log(error);
           res.redirect("/campgrounds");
       }else{
           Comments.create(req.body.comment, function(error, comment){
               if(error){
                   req.flash("error", "Something went wrong");
                   console.log(error);
               }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Added Comment");
                    res.redirect("/campgrounds/"+campground._id);
               }
           });
       }
    });
});


// comments edit route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comments.findById(req.params.comment_id, function(error, comment) {
        if(error){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        }
    });
});


//comments update route
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, uComment){
        if(error){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//Comments destroy route

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comments.findByIdAndRemove(req.params.comment_id, function(error){
        if(error){
            res.redirect("back");
        }else{
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = router;