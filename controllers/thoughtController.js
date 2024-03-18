const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  async getThoughts(req, res) {
      try {
          const thoughts = await Thought.find();
          res.json(thoughts);
      } catch (err) {
          res.status(500).json(err);
      }
  },
  async getSingleThought(req, res) {
      try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
              .select('-__v');

          if (!thought) {
              return res.status(404).json({ message: 'No thought with that ID! Try again' });
          }
          res.json(thought);
      } catch (err) {
          res.status(500).json(err);
      }
  },
  async createThought(req, res) {
      try {
          const dbThoughtData = await Thought.create(req.body);
          const updatedUser = await User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
          );

          if (!updatedUser) {
              return res.status(404).json({ message: 'No user with that ID! Try Again' });
          }
          res.json({
              message: 'Thought created!', dbThoughtData,
              updatedUser
          });
      } catch (err) {
          console.log(err),
              res.status(500).json(err);
      }
  },
  async updateThought(req, res) {
      try {
          const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
          if (!updatedThought) {
              return res.status(404).json({ message: 'No thought with that ID! Try Again' })
          }
          res.json({ message: 'Thought successfully updated', updatedThought });
      } catch (err) {
          console.log(err)
          res.status(500).json(err);
      }
  },
  async deleteThought(req, res) {
      try {
          const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
          if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with that ID! Try Again' })
          }
          res.json({ message: 'Thought successfully deleted', deletedThought });
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },

  async addReaction(req, res) {
      try {
          const dbReactionData = {
              reactionBody: req.body.reactionBody,
              username: req.body.username,
          }
          const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
              { $push: { reactions: dbReactionData} },
              { new: true });
          if (!updatedThought) {
              return res.status(404).json({ message: 'Unable to add reaction! Try Again' })
          }
          res.json({ message: 'Reaction successfully added', updatedThought });
      } catch (err) {
          console.log(err)
          res.status(500).json(err);
      }
  },
  async deleteReaction(req, res) {
      try {
          const updatedThought = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull: { reactions: { reactionId: req.params.reactionId } } },
              { new: true }
          );

          if (!updatedThought) {
              return res.status(404).json({ message: 'No thought with that ID! Try Again' });
          }

          res.json({ message: 'Reaction successfully removed', updatedThought });
      } catch (err) {
          res.status(500).json(err);
      }
  },

}