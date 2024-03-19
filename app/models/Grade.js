const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const GradeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  level: { type: Number, required: true, unique: true },
  minAge: { type: Number, required: true },
  maxAge: { type: Number, required: true },
  subjects: {
    type: Array,
    // default: [
    //   {
    //     name: { type: String },
    //     semester: { type: String, enum: ["1", "2"] },
    //   },
    // ],
  },
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
const Grade = mongoose.model("Grade", GradeSchema);
module.exports = Grade;
