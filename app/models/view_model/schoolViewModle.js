const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const SchoolSchema = new mongoose.Schema({
    businessYear: {
        type: String,
        required: false
    },
    schoolName: {
        type: String,
        required: false
    },
    schoolAddress: {
        type: String,
        required: false
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
const School = mongoose.model("School", SchoolSchema);
module.exports = School;
