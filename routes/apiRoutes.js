const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        let noteData = fs.readFileSync(path.join(__dirname, '../db/db.json'));
        res.send(noteData);
    });

    app.post('/api/notes', (req, res) => {
        let noteData = fs.readFileSync(path.join(__dirname, '../db/db.json'));

        let newNote = req.body;
        newNote.id = uuidv4()

        noteData = JSON.parse(noteData);
        noteData.push(newNote);

        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData));

        res.send(noteData);
        
    });

    app.delete('/api/notes/:id', (req, res) => {
        let noteData = fs.readFileSync(path.join(__dirname, '../db/db.json'));

        noteData = JSON.parse(noteData);

        let browserid = req.params.id
        noteData = noteData.filter(note => {
            return note.id != browserid
        })
    

        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData));

        res.send(noteData);
        
    });
};

