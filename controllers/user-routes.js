var db = require("../models");
// console.log(db)


module.exports = function(app) {
    // GET route for finding all Users and returning them to the user with res.json
    app.get("/api/users", function(req, res) {
      console.log("Getting all users");
        db.User.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/users/:id", function(req, res) {
        // GET route for finding one User with the id in req.params.id and return them to the user with res.json
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/users", function(req, res) {
        // POST route for creating a User with the data available to us in req.body
        console.log(req.body);
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.delete("/api/users/:id", function(req, res) {
        // DELETE route for removing the User with the id available to us in req.params.id
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

};