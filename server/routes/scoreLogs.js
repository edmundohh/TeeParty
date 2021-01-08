const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Player = require("../models/Player");
const ScoreLog = require("../models/ScoreLog");

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
          console.log(req.body.cid)
          res.send({
            success: false,
            content: "Course with the given cid does not exist."
          });
        } else {
          let scoreLog = new ScoreLog({
            score: req.body.score,
            cid: req.body.cid,
            cname: course.cname,
            imageURL: course.imageURL,
            par: course.par,
            username: req.body.username,
            date: new Date()
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
