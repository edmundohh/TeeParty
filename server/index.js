// Require dependencies
const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const stringHash = require("string-hash");
const STATIC_ROOT = path.resolve(__dirname, "./public");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/TeeParty", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(function () {
  console.log("Connected to MongoDB...");
})
.catch(function (err) {
  console.error("Could not connect to MongoDB...", err);
});


// // Middleware
// function cors(req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
//   next();
// }
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const players = require("./routes/players");
const courses = require("./routes/courses");
const scoreLogs = require("./routes/scoreLogs");

// Declare application parameters
// Will have to change this if moving to a VM
const PORT = 3000;

// app.post("/", function (request, response) {
//   response.send("server testing...");
// });

app.listen(PORT, function () {
  console.log("server running on PORT " + PORT + "...");
});

// Routes
// app.use('/', express.static(STATIC_ROOT));
app.use('/players', players);
app.use('/courses', courses);
app.use('/scoreLogs', scoreLogs);
// app.use('/transaction', transaction);

// Models
Players = require('./models/Player.js')
Courses = require('./models/Course.js')
ScoreLogs = require('./models/ScoreLog.js')

// // Server
// var httpServer = http.createServer(app);

// httpServer.listen(HTTP_PORT, function() {
//   console.log('[Express.js] Server listening on PORT: '+ HTTP_PORT);
// });
