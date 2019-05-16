// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var path = require("path");
//var newEvent = require("../public/js/data");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });

  app.get("/api/events", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.events.findAll({ }).then(function (dbEvents) {
      console.log(dbEvents);
      console.log("accessed api events GET");
      

      res.json(dbEvents);
    });
  });

  // POST route for saving a new todo
  app.post("/api/events", function (req, res) {
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
  app.delete("/api/events/:id", function (req, res) {
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
  app.put("/api/events", function (req, res) {

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
