// Requiring our models
var db = require("../models");



// Routes
// =============================================================
module.exports = function (app) {
    
    // GET route for getting all of the Transactions
    app.get("/feed", function (req, res) {
        db.Transaction.findAll({})
            .then(function (dbTransaction) {
                // var transactions = {
                //     payer_email: payer_email,
                //     transaction_type: "pay",
                //     dollar_amount: dollar_amount,
                //     payee_email: payee_email
                // }
                // res.json(dbTransaction);
                res.render("feed", {
                    Transaction: dbTransaction
                });
            });
    });

    // GET route for retrieving a single transaction
    app.get("/api/transactions/:id", function (req, res) {
        db.Transaction.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbTransaction) {
            console.log(dbTransaction);
            res.json(dbTransaction);
        });
    });

    // POST route for saving a new transaction
    app.post("/api/transactions/pay", function (req, res) {
        console.log(req.body);
        db.Transaction.create(req.body)
            .then(function (dbTransaction) {
                res.dbTransaction = dbTransaction; // saving this for later
                return db.User.findOne({
                    where: {
                        email: req.body.payer_email
                    }
                }); // chaining promises together
            })
            .then(function (sender) {
                return sender.decrement('current_balance', {
                    by: req.body.dollar_amount
                }); //
            })
            .then(function () {
                return db.User.findOne({
                    where: {
                        email: req.body.payee_email
                    }
                });
            })
            .then(function (receiver) {
                return receiver.increment('current_balance', {
                    by: req.body.dollar_amount
                });
            })
            .then(function () {
                res.json(res.dbTransaction) // returning the transaction record that we saved before
            })
            .catch(function (error) {
                console.log(`Error: ${ error }`); // Preventing app crash on db failure
            });
    });

    // DELETE route for deleting a single transaction
    app.delete("/api/transactions/:id", function (req, res) {
        db.Transaction.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTransaction) {
            res.json(dbTransaction);
        });
    });

    // PUT route for updating transactions
    app.put("/api/transactions/update", function (req, res) {
        db.Transaction.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbTransaction) {
            res.json(dbTransaction);
        });
    });
};