import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 80,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 8,
  },
  lastLoginAt: {
    type: Date,
  },
},{timestamps: true, versionKey: false});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
}

userSchema.statics.hashPassword = function hashPassword(password){
  return bcrypt.hash(password, 12);
}

export const User = mongoose.model('User', userSchema);