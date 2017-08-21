const mongoose = require('mongoose');
const { Schema, SchemaTypes: types } = require('mongoose');
const bcrypt = require('bcryptjs');

const roles = {
  ADMINISTRATOR: 'admin',
  USER: 'user',
};

const userSchema = new Schema({
  alias: { type: types.String, required: true },
  email: {
    type: types.String,
    unique: true,
    required: true,
    lowercase: true,
    validate: {
      validator(v) {
        return /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9]{2,}$/.test(v);
      },
    },
  },
  role: { type: types.String, enum: [roles.ADMINISTRATOR, roles.USER], default: roles.USER },
  password: { type: types.String, required: true },
});

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function preSave(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
