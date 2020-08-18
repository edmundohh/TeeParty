const mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  following: {
    type: [String]
  }
});

var Player = mongoose.model("Player", playerSchema);

async function createPlayers() {
  const player_1 = new Player({
    name: "Edmund Oh",
    username: "ed5555",
    following: ["JonBonesJones", "TigerWoods123"]
  });
  // const player_2 = new Player({
  //   name: "Jon Jones",
  //   username: "JonBonesJones",
  //   following: ["TigerWoods123"]
  // });
  // const player_3 = new Player({
  //   name: "Tiger Woods",
  //   username: "TigerWoods123"
  // });
  try {
    result = await player_1.save();
    console.log(result);
  }
  catch (ex) {
    console.log(ex.message);
  }
  // result = await player_2.save();
  // console.log(result);
  // result = await player_3.save();
  // console.log(result);
}

createPlayers();

module.exports = Player;