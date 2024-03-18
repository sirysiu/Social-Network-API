const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID! Try Again' })
    }
    res.json({ message: 'User successfully updated', updatedUser});
    } catch (err) {
        res.status(500).json(err);
    }
},
async deleteUser(req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
    if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID! Try Again' })
    }
    // This will delete the thoughts associated with that user. 
    console.log(deletedUser);
    await Thought.deleteMany({ _id: {$in:deletedUser.thoughts}});
    res.json({ message: 'User successfully deleted', deletedUser});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
async addFriend(req, res) {
    try {
        const updatedFriend = await User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $push: { friends: req.params.friendId } }, 
            { new: true });
    if (!updatedFriend) {
        return res.status(404).json({ message: 'Unable to add friend! Try Again' })
    }
    res.json({ message: 'Friend successfully added', updatedFriend});
    } catch (err) {
        res.status(500).json(err);
    }
},
async deleteFriend(req, res) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with that ID! Try Again' });
        }

        res.json({ message: 'Friend successfully removed', updatedUser });
    } catch (err) {
        res.status(500).json(err);
    }
},

};
