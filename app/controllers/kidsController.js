const Kid = require("../models/Kid");
const school = require("../models/view_model/schoolViewModle")
const roaster = require("../models/view_model/roasterViewModel")
const Grade = require("../models/Grade")
var fs = require("fs");
exports.kidsList = async function (req, res) {
  try {
    console.log(__dirname);
    console.log(__dirname.replace('app/controllers', 'public'))
    var kids = await Kid.find({});
    res.render("kids-list", {
      kids: kids
    });
  } catch (ex) {
    console.log(`Exception->KidsList::${ex}`);
    res.render("error-page", {
      exception: ex
    });
  }
};

exports.addKidWizard = async function (req, res) {
  try {
    res.render("kids-create");
  } catch (ex) {
    console.log(`Exception->addKidWizard::${ex}`);
    res.render("error-page", {
      exception: ex
    });
  }
};

exports.addKid = async function (req, res) {
  try {
    console.log(req);
    var data = req.body;

    var guardianInformation = {
      guardianFullName: data.guardianFullName,
      guardianPhoneNumber: data.guardianPhoneNumber,
      guardianAddress: data.guardianAddress,
      guardianRelationship: data.guardianRelationship,
      guardianOccupation: data.guardianOccupation,
    };
    var kidSchoolDetail = new school({
      businessYear: data.businessYear,
      schoolName: data.schoolName,
      schoolAddress: data.schoolAddress,
    });
    var kid = new Kid({
      firstName: data.firstName,
      fatherName: data.fatherName,
      lastName: data.lastName,
      baptismName: data.baptismName,
      gender: data.gender,
      birthDate: data.birthDate,
      address: data.address,
      registrationDate: data.birthDate,
      guardianInformation: guardianInformation,
      kidSchoolDetail: kidSchoolDetail,
      createBy: "65c4dbad6d8856fd0010b812",
    });
    var writeKidAddress = "";
    var writeParentAddress = "";
    if (req.files.length > 0) {
      for (var i = 0; i < req.files.length; i++) {
        var pictureData = req.files[i];
        if (pictureData.fieldname == "photo") {
          writeKidAddress =
            "/Profile/kid/" + kid._id + pictureData.originalname;
          fs.readFile(pictureData.path, async function (err, data) {
            const fileContents = new Buffer(data, "base64");
            fs.writeFile(__dirname.replace('app/controllers', 'public') + writeKidAddress, fileContents, (err) => {
              if (err) return console.error(err);
            });
          });
        } else if (pictureData.fieldname == "guardianPhoto") {
          writeParentAddress =
            "/Profile/guardian/" + kid._id + pictureData.originalname;
          fs.readFile(pictureData.path, async function (err, data) {
            const fileContents = new Buffer(data, "base64");
            fs.writeFile(__dirname.replace('app/controllers', 'public') + writeParentAddress,
              fileContents,
              (err) => {
                if (err) return console.error(err);
              }
            );
          });
        }
      }
    }
    kid.photo = writeKidAddress;
    kid.guardianInformation.guardianPhoto = writeParentAddress;
    console.log(kid);
    await kid.save();
    // var kid = new Kid(req.body);
    // await kid.save();
    res.redirect("/kids");
  } catch (ex) {
    console.log(`Exception->addKid::${ex}`);
    res.render("error-page", {
      exception: ex
    });
  }
};

exports.detail = async function (req, res) {
  try {
    var selectedKidId = req.query.id;
    var kid = await Kid.findById(selectedKidId);
    var grades = await Grade.find({});
    res.render("kid-detail", {
      kid: kid, grades:grades
    })
  } catch (exception) {
    console.log(`Exception->detail::${ex}`)
    res.render("error-page", {
      exception: ex
    })
  }
}

exports.addSchool = async function (req, res) {
  try {
    var newSchool = new school({
      businessYear: req.body.businessYear,
      schoolName: req.body.schoolName,
      schoolAddress: req.body.schoolAddress,
      grade: req.body.grade,
      createBy: req.user._id
    })
    await Kid.findOneAndUpdate({
      _id: req.body.id
    }, {
      $push: {
        kidSchoolDetail: newSchool
      }
    });
    res.redirect("/kids/detail?id=" + req.body.id)
  } catch (ex) {
    console.log(`Exception kids->addSchool::${ex}`)
    res.render("error-page", {
      exception: ex
    })
  }
}

exports.addRoaster = async function (req, res) {
  try {
    var data = req.body;
    var kid = await Kid.findById(data.id)
    var selectedGrade = await Grade.findById(date.grade);
    var subjects = selectedGrade.subjects;

    if (kid.kidCourseRoaster.length > 0) {
      var prevRoaster = kid.kidCourseRoaster
      for (var j = 0; j < prevRoaster; j++) {
        if (prevRoaster[j].grade == data.grade) {
          var newEach = {
            courseName: data.subject,
            totalGradeSemisterOne: data.semisterOne,
            totalGradeSemisterTwo: data.semisterTwo,
            status: data.status
          }
          prevRoaster.result.push(newEach)
        }
      }

      //will update kid roaster
      await Kid.findByIdAndUpdate(data.id, {
        kidCourseRoaster: prevRoaster
      });
    } else {
      var result = []
      for (var i = 0; i < subjects.length; i++) {
        if (subjects[i].name = data.subject) {
          var each = {
            courseName: subjects[i].name,
            totalGradeSemisterOne: data.semisterOne,
            totalGradeSemisterTwo: data.semisterTwo,
            status: data.status
          }
          result.push(each)
        }
      }
      var roaster = new roaster({
        grade: data.grade,
        businessYear: data.businessYear,
        result: result
      })
      await Kid.findOneAndUpdate({
        _id: data.id
      }, {
        kidCourseRoaster: roaster
      })
    }
    res.redirect("/kids/detail?id=" + data.id);
  } catch (ex) {
    console.log(`Exception kids->addRoaster:::${ex}`)
    res.render("error-page", {
      exception: ex
    })
  }
}