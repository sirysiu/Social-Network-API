const router = require('express').Router();

// This will grab the actual mongoose functions from the controllers file. 
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// route for /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// route for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId').get(getSingleThought)
.put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
