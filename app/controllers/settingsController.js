const Grade = require("../models/Grade");
const utils = require("./utils");
const Subject = require("../models/view_model/subjectViewModel");
exports.gradesList = async function (req, res) {
  try {
    var grades = await Grade.find({});
    res.render("grade-list", { grades: grades });
  } catch (ex) {
    console.log(`Exception-->${ex}`);
  }
};

exports.addGrade = async function (req, res) {
  try {
    // const { name, level, minAge, maxAge } = req.body;
    var currentUser = req.user;
    utils.check_request_params(
      req.body,
      [
        { name: "name", type: "string" },
        { name: "level", type: "string" },
        { name: "minAge", type: "string" },
        { name: "maxAge", type: "string" },
      ],
      async function (response) {
        const gradeData = req.body;
        if (gradeData.id) {
          var patchData = {
            name: gradeData.name,
            level: gradeData.level,
            minAge: gradeData.minAge,
            maxAge: gradeData.maxAge
          }
          await Grade.findByIdAndUpdate(gradeData.id, patchData);
          res.redirect("/setting/grade-list");

        } else {
          if (response.success) {
            var newGrade = new Grade({
              name: gradeData.name,
              level: gradeData.level,
              minAge: gradeData.minAge,
              maxAge: gradeData.maxAge,
              createBy: currentUser._id,
            });
            await newGrade.save();
            res.redirect("/setting/grade-list");
          } else {
            console.log(response);
          }
        }

      }
    );
  } catch (ex) {
    console.log(`Exception->Add Grade${ex}`);
    res.render("error-page", { exception: ex });
  }
};

exports.removeGrade = async function (req, res) {
  try {
    var grade = await Grade.findByIdAndDelete(req.body.id);
    res.redirect("/setting/grade-list");
  } catch (ex) {
    console.log(`Exception->Remove Grade${ex}`)
    res.render("error-page", { exception: ex })
  }
}

exports.subjectsList = async function (req, res) {
  try {
    utils.check_request_params(
      req.query,
      [{ name: "id", type: "string" }],
      async function (response) {
        if (response.success) {
          var grade = await Grade.findById(req.query.id);
          res.render("subject-list", { grade: grade });
        } else {
          console.log(`request parameter validation issue${response}`);
        }
      }
    );
  } catch (ex) {
    console.log(`Exception->SubjectList${ex}`);
    res.render("error-page", { exception: ex });
  }
};

exports.addSubject = async function (req, res) {
  try {
    var currentUser = req.user;

    utils.check_request_params(
      req.body,
      [
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "semester", type: "string" },
      ],
      async function (response) {
        if (response.success) {
          if (req.body.subId) {
            var listToUpdate = await Grade.find({
              _id: req.body.grade
            })
            console.log(listToUpdate)
            const updateDocument = {
              "subjects.$[i].name": req.body.name,
              "subjects.$[i].semester": req.body.semester
            };

            const options = {
              arrayFilters: [
                {
                  "i._id": { $eq: req.body.subId },
                }
              ]
            };
            var result = await Grade.findOneAndUpdate(
              {
                _id: req.body.grade
              },updateDocument,options)
            console.log(result)
            res.redirect("/setting/subject-list?id=" + req.body.id);
          } else {
            var subject = new Subject({
              name: req.body.name,
              semester: req.body.semester,
              createBy: currentUser._id,
            });
            await Grade.findOneAndUpdate(
              { _id: req.body.id },
              { $push: { subjects: subject } }
            );
            res.redirect("/setting/subject-list?id=" + req.body.id);
          }

        } else {
          console.log(`request parameter validation issue${response}`);
        }
      }
    );
  } catch (ex) {
    console.log(`Exception->addSubject ${ex}`);
    res.render("error-page", { exception: ex });
  }
};