const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Player = require("../models/Player");
const ScoreLog = require("../models/ScoreLog");

//Get all registered players
router.get('/', async function(req, res) {
  try {
    const players = await Player.find().sort('name');
    res.send({
      success: true,
      content: players
    });
  } catch (ex) {
    console.error(ex);
    res.send({
      success: false,
      content: ex.message
    })
  }
})

//Get player by username
router.get('/:username', async function(req, res) {
  await Player.findOne({ username: req.params.username })
  .exec(function(err, player) {
    if (!player) {
      res.send({
        success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      res.send({
        success: true,
        content: player
      });
    }
  })
})

//Create a new player
router.post('/', async function(req, res) {
  let player = new Player({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    following: []
  });

  try {
    result = await player.save();
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

//Add or drop player from following
router.put('/:username', async function(req, res) {
  await Player.findOne({ username: req.params.username })
  .exec(async function(err, player) {
    if (!player) {
      res.send({
        success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      await Player.findOne({ username: req.body.playerToFollow })
      .exec(async function(err, playerToFollow) {
        //TODO: also check if following.length == 1
        if (!playerToFollow) {
          res.send({
            success: false,
            content: "The player you requested to follow does not exist."
          });
        } else {
          //TODO: if playerToFollow is already in following, drop from following list
          //NOTE: maybe use different data struct for insertion/removal
          player.following.push(playerToFollow.username);

          try {
            result = await player.save();
            console.log(result);
            res.send({
              success: true,
              content: {
                player: player.username,
                playerFollowed: playerToFollow.username
              }
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

//Get scores by username
router.get('/:username/scoreLogs', async function(req, res) {
  await Player.findOne({ username: req.params.username })
  .exec(async function(err, course) {
    if (!course) {
      res.send({
        success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      await ScoreLog.find({ username: req.params.username }).sort('-date')
      .exec(function(err, scoreLogs) {
        if (!scoreLogs) {
          res.send({
            success: false,
            content: "There are no logged scores by the given user."
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

//Get scores by following and course
router.get('/:username/following/:cid/scoreLogs', async function(req, res) {
  await Player.findOne({ username: req.params.username })
  .exec(async function(err, player) {
    if (!player) {
      res.send({
        success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      await ScoreLog.find().and([
        { $or: [{ 'username': { $in: player.following }}, { username: req.params.username }]},
        { cid: req.params.cid }
      ]).sort('score')
      .exec(async function(err, followingScoreLogs) {
        if (!followingScoreLogs) {
          res.send({
            success: false,
            content: "Invalid Request."
          });
        } else {
          res.send({
            success: true,
            content: followingScoreLogs
          });
        }
      })
    }  
  })
})

//Get scores for feed
router.get('/:username/feed', async function(req, res) {
  await Player.findOne({ username: req.params.username })
  .exec(async function(err, player) {
    if (!player) {
      res.send({
        success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      await ScoreLog.find({ 
        $or: [{ 'username': { $in: player.following }}, 
              { username: req.params.username }]})
              .sort('-date')
      .exec(async function(err, followingScoreLogs) {
        if (!followingScoreLogs) {
          res.send({
            success: false,
            content: "Invalid Request."
          });
        } else {
          res.send({
            success: true,
            content: followingScoreLogs
          });
        }
      })
    } 
  })
})

//Get following by usernames
router.get('/:username/following', async function(req, res) {
  await Player.findOne({ username: req.params.username })
  .exec(async function(err, player) {
    if (!player) {
      res.send({
        success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      await Player.find().where('username').in(player.following)
      .exec(async function(err, followingPlayers) {
        if (!followingPlayers) {
          res.send({
            success: false,
            content: "Invalid Request."
          });
        } else {
          res.send({
            success: true,
            content: followingPlayers
          });
        }
      })
    }  
  })
})

//Check if following given user
router.get('/:username/isFollowing/:targetUser', async function(req, res) {
  await Player.findOne({ username: req.params.username })
  .exec(async function(err, player) {
    if (!player) {
      res.send({
        success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      if (player.following.includes(req.params.targetUser)) {
        res.send({
          success: true,
          isFollowing: true
        });
      } else {
        res.send({
          success: false,
          isFollowing: false
        });
      }
    }  
  })
})

module.exports = router;
