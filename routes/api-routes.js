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
  
  app.post("/api/bps", function (req, res) {
    db.Bps.create({
      date: req.body.date,
      systolic: req.body.systolic,
      diastolic: req.body.diastolic,
      pulse: req.body.pulse
    }).then(function (dbOntrack) {
      res.json(dbOntrack);
    });

  });

  app.post("/api/doctors", function (req, res) {
    db.Doctors.create({
      name: req.body.name,
      location: req.body.location
    }).then(function (dbOntrack) {
      res.json(dbOntrack);
    });

  });

  app.post("/api/exercises", function (req, res) {
    db.Exercises.create({
      date: req.body.date,
      type: req.body.type,
      duration: req.body.duration
    }).then(function (dbOntrack) {
      res.json(dbOntrack);
    });

  });

  app.post("/api/foods", function (req, res) {
    db.Foods.create({
      date: req.body.date,
      meal: req.body.meal,
      name: req.body.name,
      calorie: req.body.calorie,
      sugar: req.body.sugar,
      sodium: req.body.sodium
    }).then(function (dbOntrack) {
      res.json(dbOntrack);
    });

  });

  app.post("/api/mhnotes", function (req, res) {
    db.Mhnotes.create({
      date: req.body.date,
      mood: req.body.mood,
      note: req.body.note
    }).then(function (dbOntrack) {
      res.json(dbOntrack);
    });

  });

  app.post("/api/prescriptions", function (req, res) {
    db.Prescriptions.create({
      name: req.body.name,
      dosage: req.body.dosage
    }).then(function (dbOntrack) {
      res.json(dbOntrack);
    });

  });

  // GET Routes
  app.get("/api/prescriptions/all", function (req, res) {
    db.Prescriptions.findAll({}).then(function (allPrescriptions) {
      res.json(allPrescriptions);
    });
  });

  app.get("/api/doctors/all", function (req, res) {
    db.Doctors.findAll({}).then(function (allDoctorNotes) {
      res.json(allDoctorNotes);
    });
  });

  app.get("/api/mhnotes/all", function (req, res) {
    db.Mhnotes.findAll({}).then(function (allMhNotes) {
      res.json(allMhNotes);
    });
  });

  app.get("/api/exercises/all", function (req, res) {
    db.Exercises.findAll({}).then(function (allExercises) {
      res.json(allExercises);
    });
  });

  app.get("/api/foods/all", function (req, res) {
    db.Foods.findAll({}).then(function (allFoods) {
      res.json(allFoods);
    });
  });

  app.get("/api/bps/all", function (req, res) {
    db.Bps.findAll({}).then(function (allBps) {
      res.json(allBps);
    });
  });

}
