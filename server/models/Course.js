const mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  cname: {
    type: String,
    required: true
  },
  cid: {
    type: Number,
    required: true,
    unique: true
  },
  par: {
    type: Number
  },
  pCount: {
    type: Number
  }
});

var Course = mongoose.model("Course", courseSchema);

async function createCourses() {
  const course_1 = new Course({
    cname: "Redwoods",
    par: 71,
    pCount: 2222,
    cid: 1111
  });

  try {
    result = await course_1.save();
    console.log(result);
  }
  catch (ex) {
    console.log(ex.message);
  }
}

createCourses();

module.exports = Course;