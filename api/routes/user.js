var express = require("express");
var router = express.Router();
const { User } = require("../model");

// all endpoints related to the user

router.get("/getUser/:id", (req, res) => {
  console.log(req.params);
  User.findById(req.params.id, (err, user) => {
    try {
      res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        roll: user.roll,
        college: user.college,
        branch: user.branch,
        dob: user.dob,
      });
    } catch (err) {
      res.send({
        status: "error",
        error: err,
      });
    }
  });
});

router.post("/createUser", (req, res) => {
  const {
    name,
    email,
    gender,
    college,
    branch,
    roll,
    dob,
    password,
  } = req.body;
  console.log(req.body);
  const newUser = new User({
    name: name,
    email: email,
    gender: gender,
    college: college,
    branch: branch,
    roll: roll,
    dob: dob,
  });
  newUser.save((err) => {
    console.log(err);
    if (err) {
      res.send({
        status: "error",
        error: err,
      });
    } else {
      res.send({
        id: newUser._id,
        message: "New User Created Successfully!",
      });
    }
  });
});

router.post("/updateUser/:id", (req, res) => {
  const { branch, roll, email } = req.body;
  console.log(branch, roll, email);
  User.updateOne(
    { _id: req.params.id },
    {
      email: email,
      branch: branch,
      roll: roll,
    },
    (err) => {
      if (err) {
        res.send({ status: "error", error: err });
      } else {
        res.send({
          id: req.params.id,
          message: "Updated Successfully!",
        });
      }
    }
  );
});

module.exports = router;
