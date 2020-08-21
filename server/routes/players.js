const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

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
      await Player.findOne({ username: req.body.following[0] })
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

module.exports = router;
