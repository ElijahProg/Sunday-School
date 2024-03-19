const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const SubjectSchema = new mongoose.Schema({
  name: { type: String },
  semester: { type: String, enum: ["1", "2"] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Subject = mongoose.model("Subject", SubjectSchema);
module.exports = Subject;
