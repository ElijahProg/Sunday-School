const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const KidSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  fatherName: { type: String, required: true },
  lastName: { type: String, required: true },
  baptismName: { type: String, required: false },
  birthDate: { type: Date, required: true },
  registrationDate: { type: Date, required: true },
  photo: { type: String, required: false },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  address: { type: String, required: true }, //personal information
  currentGrade: { type: Schema.Types.ObjectId, ref: "Grade" },
  guardianInformation: {
    type: Object,
    // default: {
    //   guardianFullName: { type: String, required: false },
    //   guardianPhoneNumber: { type: String, required: false },
    //   guardianAddress: { type: String, required: false },
    //   guardianRelationship: {
    //     type: String,
    //     required: false,
    //     enum: ["Father", "Mother", "Sister", "Brother", "Other"],
    //   },
    //   guardianOccupation: { type: String, required: false },
    //   guardianPhoto: { type: String, required: false },
    // },
  },
  kidSchoolDetail: {
    type: Array,
    // default: [
    //   {
    //     businessYear: { type: String, required: false },
    //     schoolName: { type: String, required: false },
    //     schoolAddress: { type: String, required: false },
    //   },
    // ],
  },
  kidCourseRoaster: {
    type: Array,
    // default: [
    //   {
    //     grade: { type: Schema.Types.ObjectId, ref: "Grade" },
    //     businessYear: { type: String },
    //     result: {
    //       type: Array,
    //       default: [
    //         {
    //           courseName: { type: String },
    //           totalGradeSemisterOne: { type: string },
    //           totalGradeSemisterTwo: { type: string },
    //           status: { type: String, enum: ["PASS", "FAIL"] },
    //         },
    //       ],
    //     },
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
const Kid = mongoose.model("Kid", KidSchema);
module.exports = Kid;
