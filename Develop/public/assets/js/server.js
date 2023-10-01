const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('../../routes/api-routes')(app);
require('../../routes/html-routes')(app);

app.use(express.static(path.join(__dirname + '/Develop/public')));
require();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
