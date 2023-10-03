// Require in the fs promises module from Node.js fs module 
// This allows us to use the fs module with promises instead of callbacks
const fsPromises = require("fs").promises;

// Require in the uniqid npm package
// This will be used to generate unique IDs for each note
const uniqid = require("uniqid");

// Export a function that will accept the Express app instance
// This function will contain all the route handlers for the /api routes
module.exports = function(app) {
    app.get("/api/notes", (req, res) => {
        console.log("Execute GET notes request");
        // Read existing notes from db.json file
        let data = fsPromises.readFile("./Develop/db/db.json", "utf8");
        res.json(JSON.parse(data));
    });

    app.post("/api/notes", (req, res) => {
        const newNote = {
            ...req.body,
            id: uniqid(),
        };

        console.log("Execute POST notes request");

        let data = fsPromises.readFile("./Develop/db/db.json", "utf8");
        const notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile(
            "./Develop/db/db.json",
            JSON.stringify(dataJSON),
            (err, text) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("HELLO", text);
            }
        );
        console.log("Success, added a new note");
        res.json(data);
    });

    app.delete("/api/notes/:id", (req, res) => {
        let data = fsPromises.readFile("./Develop/db/db.json", "utf8");
        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => {
            return note.id !== req.params.id;
        });

        fs.writeFile("./Develop/db/db.json", JSON.stringify(newNotes), (err, text) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        res.json(newNotes);
    });
}