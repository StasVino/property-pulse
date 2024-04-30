const { Schema, model, models, Model } = require('mongoose');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'email already exists'],
      required: [true, 'Username is required'],
    },
    username: { type: String, required: [true, 'Username is required'] },
    image: { type: String },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  },
  { timestamps: true }
);

const User = Model.User || model('User', UserSchema);
export default User;
