var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");

var data = [   
    {
        name: "Hello World",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Snowy Town",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Orange Mountain",
        image: "https://images.unsplash.com/photo-1533597818151-d1071f26fe32?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d801e2dda51c0d284878778edf9172a1&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(error){
        // if(error){
        //     console.log(error);
        // }
        // console.log("Remove Campgrounds");
        // // Add Campgrounds
        // data.forEach(function(seed){
        //   Campground.create(seed, function(error, campground){
        //       if(error){
        //           console.log(error);
        //       }else{
        //           console.log("Created a campground");
        //           //Create a comment
        //           Comment.create({
        //               text: "This place is wonderful",
        //               author: "Simpson"
        //           }, function(error, comment){
        //               if(error){
        //                   console.log(error);
        //               }else{
        //                   campground.comments.push(comment);
        //                   campground.save();
        //                   console.log("Created Comment");
        //               }
        //           });
        //       }
        //   }); 
        // });
    }); 
}

module.exports = seedDB;