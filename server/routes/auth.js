const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

//Authenticate a player
router.post('/', async function(req, res) {
  const { username, password } = req.body;
  await Player.findOne({ username: username })
  .exec(function(err, player) {
    if (!player) {
      res.send({
        login_success: false,
        content: "Player with the given username does not exist."
      });
    } else {
      if (player.password !== password) {
        return res.status(400).send({ error: "Invalid password." });
      }
      res.send({
        login_success: true,
        content: player
      });
    }
  })
})

module.exports = router;