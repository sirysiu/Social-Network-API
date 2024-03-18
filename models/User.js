const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
      username: {
          type: String, unique: true, required: true, trim: true
      },
      email: {
          type: String, required: true, unique: true, validate: {
              // Regex that validates email. 
              validator: function (v) {
                  return /.+\@.+\..+./.test(v);
              },
              message: props => `${props.value} is not a valid email address`
          },
      },
      thoughts: [
          {
              type: Schema.Types.ObjectId,
              ref: 'thought'
          }
      ],
      friends: [
          {
              type: Schema.Types.ObjectId,
              ref: 'user'
          }
      ]
  },
  {
      toJSON: {
          virtuals: true,
      },
      id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
