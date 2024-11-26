const express = require('express')
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1: get notes using : get "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    } 
});

// ROUTE 2: Add a new notes using: POST "/api/notes/fetchallnotes". Login required
router.post('/addnotes', fetchUser, [
    body('title', 'Enter your title').isLength({ min: 1 }),
    body('description', 'enter description').isLength({ min: 8 })], async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            //If there are errors, return bad requests and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savenote = await note.save(); // to save a note data
            res.json(savenote);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    });


// ROUTE 3: Update a existing notes using: PUT "/api/notes/update/:id". Login required
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create a new object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to updated and update it
        let note = await Note.findById(req.params.id); // to assign the id value to note 
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

// ROUTE 4: Delete a existing notes using: DELETE "/api/notes/deletenotes/:id". Login required
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        //Find the note to updated and update it
        let note = await Note.findById(req.params.id); // to assign the id value to note 
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString == req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});
module.exports = router;