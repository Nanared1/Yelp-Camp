var Campground = require("../models/campground");
var Comments = require("../models/comments");


var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        
        Campground.findById(req.params.id, function(error, fCampground){
            if(error){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                if(!fCampground){
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                if(fCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comments.findById(req.params.comment_id, function(error, fComment){
            if(error){
                res.redirect("back");
            }else{
                if(fComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;