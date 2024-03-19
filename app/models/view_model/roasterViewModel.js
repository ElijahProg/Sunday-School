const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const RoasterSchema = new mongoose.Schema({
    grade: {
        type: Schema.Types.ObjectId,
        ref: "Grade"
    },
    businessYear: {
        type: String
    },
    result: {
        type: Array,
        default: [{
            courseName: {
                type: String
            },
            totalGrade: {
                type: Number
            },
            status: {
                type: String,
                enum: ["PASS", "FAIL"]
            },
        }, ],
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
const Roaster = mongoose.model("Roaster", RoasterSchema);
module.exports = Roaster;
