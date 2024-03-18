const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema(
  {
      thoughtText: {
          type: String, required: true, minLenth: 1, maxLength: 280,
      },
      createdAt: {
          type: Date, 
          default: Date.now,
          // This is the function that formats the time. 
          get: function (timestamp) {
              return timestamp.toLocaleString();
            },
          // TODO: Getter for formatting the timestamp on query. 
      },
      username: {
          // TODO: Refrence the user making the thought. Unsure if ref:user is correct, it is probably not. 
          type: String, ref: 'user',
      },
      reactions: [Reaction]
  },
  {
      toJSON: {
          virtuals: true,
          getters: true,
      },
      id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
