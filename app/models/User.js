const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
