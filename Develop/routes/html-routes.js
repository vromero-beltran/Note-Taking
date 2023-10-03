module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/notes.html"));
    });

    app.post("/", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/index.html"));
    });
}
