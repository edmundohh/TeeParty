const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
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
    if (player == null) {
      res.send({
        success: false,
        content: "Player does not exist."
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

// router.delete('/:rid', receiver_controller.delete_receiver)

// DELETE www.abc.com/receiver/123

module.exports = router;
