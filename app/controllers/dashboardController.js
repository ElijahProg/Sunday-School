const Kid = require("../models/Kid")
const Grade = require("../models/Grade")
exports.dashboard = async function (req, res) {
  try {
    var numberOfKids = await Kid.find({}).count();
    var Grades = await Grade.find({});
    var numberOfGrades = Grades.length
    res.render("dashboard", { user: req.user,numberOfKids:numberOfKids,numberOfGrades:numberOfGrades,grades : Grades });
  } catch (ex) {
    console.log(ex);
  }
};
