const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const { Movies } = require("./models/movies.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/movies", async (req, res) => {
  try {
    const allmovies = await Movies.find();
    res.json(allmovies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies", async (req, res) => {
  const { title, director, genre } = req.body;
  try {
    const movieData = new Movies({ title, director, genre });
    await movieData.save();
    res.status(201).json(movieData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/movies/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovie = await Movies.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
