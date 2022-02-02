import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  gender: { type: String },
  birthday: { type: String },
  password: { type: String },
});

export = mongoose.model("account", accountSchema);