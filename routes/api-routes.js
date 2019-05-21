// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var path = require("path");
var passport = require("../config/passport");

//var newEvent = require("../public/js/data");

// Routes
// =============================================================
module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
//
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
//
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
//
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/calendar/events/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/api/calendar/events/", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.events.findAll({ }).then(function (dbEvents) {
      console.log(dbEvents);
      console.log("accessed api events GET");
      

      res.json(dbEvents);
    });
  });

  // POST route for saving a new todo
  app.post("/api/calendar/events", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    console.log(req.body);
    db.events.create({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end
    }).then(function (dbEvents) {
      // We have access to the new todo as an argument inside of the callback function
      console.log(dbEvents);
      res.json(dbEvents);
    })

      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        console.log("error");

        res.json(err);

      });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/calendar/events/:id", function (req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvents) {
      res.json(dbEvents);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/calendar/events", function (req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.events.update({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (dbEvents) {
        res.json(dbEvents);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
  
 }
