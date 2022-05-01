const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { isEmail } = require('validator');

const hiddenFields = {
  password: {
    type: String,
    required: true,
  },
};

const baseFields = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => isEmail(value),
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ...hiddenFields,
};

const userSchema = new mongoose.Schema(baseFields, { timestamps: true });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const userJson = this.toObject();
  const hiddenFieldNames = Object.keys(hiddenFields);
  hiddenFieldNames.forEach((fieldName) => delete userJson[fieldName]);
  return userJson;
};

// eslint-disable-next-line func-names
userSchema.methods.verifyPassword = async function (value) {
  return compare(value, this.password);
};

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const fields = Object.keys(userSchema.paths);

module.exports = {
  userFields: fields,
  User: mongoose.model('User', userSchema),
};
