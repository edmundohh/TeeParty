const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Player = require("../models/Player");
const ScoreLog = require("../models/ScoreLog");

//Get all courses
router.get('/', async function(req, res) {
  try {
    const courses = await Course.find().sort('cname');
    res.send({
      success: true,
      content: courses
    });
  } catch (ex) {
    console.error(ex);
    res.send({
      success: false,
      content: ex.message
    })
  }
})

//Get course by cid
router.get('/:cid', async function(req, res) {
  await Course.findOne({ cid: req.params.cid })
  .exec(function(err, course) {
    if (!course) {
      res.send({
        success: false,
        content: "Course with the given course id does not exist."
      });
    } else {
      res.send({
        success: true,
        content: course
      });
    }
  })
})

//Add a new course
router.post('/', async function(req, res) {
  let course = new Course({
    cname: req.body.cname,
    cid: Math.floor((Math.random() * 999999) + 1),
    par: req.body.par,
    imageURL: req.body.imageURL,
    playCount: 0
  });

  try {
    result = await course.save();
    console.log(result);
    res.send({
      success: true,
      content: result
    });
  } catch (ex) {
    console.error(ex);
    res.send({
      success: false,
      content: ex.message
    });
  }
})

//Get scores by course id
router.get('/:cid/scoreLogs', async function(req, res) {
  await Course.findOne({ cid: req.params.cid })
  .exec(async function(err, course) {
    if (!course) {
      res.send({
        success: false,
        content: "Course with the given course id does not exist."
      });
    } else {
      await ScoreLog.find({ cid: req.params.cid })
      .exec(function(err, scoreLogs) {
        if (!scoreLogs) {
          res.send({
            success: false,
            content: "There are no logged scores at the given course."
          });
        } else {
          res.send({
            success: true,
            content: scoreLogs
          });
        }
      })
    }
  })
})

module.exports = router;
