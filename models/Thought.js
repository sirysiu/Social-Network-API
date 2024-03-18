const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    advertiserFriendly: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    responses: [Response],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
videoSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.responses.length;
  });

// Initialize our Video model
const Video = model('video', videoSchema);

module.exports = Video;
