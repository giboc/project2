var db = require("../models");

module.exports = function(app) {
  // Get all players
  app.post("/api/login", function(req, res) {
    db.Player.findAll({
      where: {
        email: req.body.email
      }
    }).then(function(players) {
      if((players[0].dataValues.password)===(req.body.password)){
        var msg = {
          message: "login success!"
        };
        res.render("login", {
          message: "login success"
        });
        console.log("success");
      }
      else
      var msg = {
        message: "login error!"
      }
    });
  });

  // // Create a new example

  app.post("/api/savePlayer", function(req, res) {
    db.Player.create(req.body).then(function(output) {
      res.json(output);
    });
  });

  // // app.post("/api/examples", function(req, res) {
  // //   db.Player.create(req.body).then(function(dbExample) {
  // //     res.json(dbExample);
  // //   });
  // // });

  // // // Delete an example by id
  // // app.delete("/api/examples/:id", function(req, res) {
  // //   db.Player.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  // //     res.json(dbExample);
  // //   });
  // // });
};
