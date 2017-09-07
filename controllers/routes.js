module.exports = function(app) {

    //GET route that sends user to the login page
    app.get("/", function(req, res) {
        res.render("login");
    });

    //GET route that sends the user to the feed page
    app.get("/feed", function(req, res) {
        res.render("feed");
    });
};