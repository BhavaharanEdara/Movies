const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  genre: String,
});

const Movies = mongoose.model("Movies", movieSchema);

module.exports = { Movies };
