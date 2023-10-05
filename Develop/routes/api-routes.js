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
        // Read the db.json file
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error reading file");
            }
          // Parse the data into an array 
            const notes = JSON.parse(data);
          // Send the array of note objects as JSON
            res.json(notes);
        });
    });


    app.post('/api/notes', (req, res) => {
        // Get the new note from the request body
        const newNote = req.body;
        // Give the new note a unique id
        newNote.id = uniqid();
        // Read the db.json file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading file');
            }
            // Parse the data into an array
            const notes = JSON.parse(data);
            // Add the new note
            notes.push(newNote);
            // Write updated notes back to the file
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing file');
                }
                // Send back the new note to the client
                res.json(newNote);
            });
        });
    });

    app.delete('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading file');
            }
            let notes = JSON.parse(data);
            // Filter out the note with the id to delete
            notes = notes.filter(note => note.id !== noteId);
            // Write the filtered notes back to the file
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing file');
                }
                res.sendStatus(200);
            });
        });
    });

}