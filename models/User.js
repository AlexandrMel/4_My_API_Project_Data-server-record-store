const mongoose = require('mongoose');
const { Schema } = mongoose;
const Address = require('./Address');
const jwt = require('jsonwebtoken');
const encryption = require('../lib/validation/encryption');

const UserSchema = new Schema(
  {
    id: false,
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    birthday: {
      type: Date
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: Address,
      required: true
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'x-auth';

  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'babylon')
    .toString();

  return token;
};

UserSchema.methods.checkPassword = async function(password) {
  const user = this;
  return await encryption.compare(password, user.password);
};

UserSchema.methods.getPublicFields = function() {
  return {
    _id: this._id,
    lastName: this.lastName,
    firstName: this.firstName,
    email: this.email,
    fullName: this.fullName,
    birthday: new Date(this.birthday),
    address: this.address
  };
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'babylon');
  } catch (err) {
    return;
  }

  return User.findOne({
    _id: decoded._id
  });
};

UserSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  this.password = await encryption.encrypt(this.password);
  next();
});

module.exports = mongoose.model('User', UserSchema);