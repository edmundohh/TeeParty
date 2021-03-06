const mongoose = require("mongoose");

var scoreLogSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  cid: {
    type: Number,
    required: true
  },
  cname: {
    type: String
  },
  imageURL: {
    type: String
  },
  par: {
    type: Number
  },
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date
  }
});

var ScoreLog = mongoose.model("ScoreLog", scoreLogSchema);

// async function createScoreLogs() {
//   const scoreLog_1 = new ScoreLog({
//     score: 82,
//     cid: 1111,
//     username: "ed5555"
//   });
//   const scoreLog_2 = new ScoreLog({
//     score: 90,
//     cid: 1112,
//     username: "ed5555"
//   });

//   result = await scoreLog_1.save();
//   console.log(result);
//   result = await scoreLog_2.save();
//   console.log(result);
// }

// createScoreLogs();

module.exports = ScoreLog;