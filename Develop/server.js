const express = require('express');
const path = require('path');

// Import the feedback router

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// This view route is a GET route for the homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'index.html'))
);

// This view route is a GET route for the notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// Require in the fs module from Node.js fs module 
// This allows us to use the fs module with promises instead of callbacks
const fs = require("fs");

// Require in the uniqid npm package
// This will be used to generate unique IDs for each note
const { v4: uuidv4 } = require('uuid');

// Export a function that will accept the Express app instance
// This function will contain all the route handlers for the /api routes


// GET Route for retrieving all the notes
app.get('/api/notes', (req, res) => {
	fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Internal Server Error' });
		}
		const notes = JSON.parse(data);
		res.json(notes);
	});
});

// POST Route for a new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Internal Server Error' });
		}
		const notes = JSON.parse(data);
		notes.push(newNote);
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err
            ) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.json(newNote);
            }
            );
	});
});


app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('/db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        let notes = JSON.parse(data);
        // Filter out the note with the id to delete
        notes = notes.filter(note => note.id !== noteId);
        // Write the filtered notes back to the file
        fs.writeFile('/db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing file');
            }
            res.sendStatus(200);
        });
    });
});