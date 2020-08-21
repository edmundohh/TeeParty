const express = require("express");
const ScoreLog = require("../models/ScoreLog");
const Player = require("../models/Player");
const Course = require("../models/Course");
const router = express.Router();

//Get score by cid
router.get('/:cid', async function(req, res) {
  await Course.findOne({ cid: req.params.cid })
  .exec(async function(err, course) {
    if (!course) {
      res.send({
        success: false,
        content: "Course with the given cid does not exist."
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

//Add course score log
router.post('/', async function(req, res) {
  await Player.findOne({ username: req.body.username })
  .exec(async function(err, player) {
    if (!player) {
      res.send({
        success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      await Course.findOne({ cid: req.body.cid })
      .exec(async function(err, course) {
        if (!course) {
          res.send({
            success: false,
            content: "Course with the given cid does not exist."
          });
        } else {
          let scoreLog = new ScoreLog({
            score: req.body.score,
            cid: req.body.cid,
            username: req.body.username
          });
          course.playCount++;
          
          try {
            result = await scoreLog.save();
            console.log(result);
            await course.save();
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
        }
      })
    }
  })
})

module.exports = router;
