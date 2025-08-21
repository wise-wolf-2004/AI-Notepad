const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // all routes are protected

router.route('/')
  .get(getNotes)       // get all notes of logged-in user
  .post(createNote);   // create note

router.route('/:id')
  .get(getNote)        // get single note
  .put(updateNote)     // update note
  .delete(deleteNote); // delete note

module.exports = router;
