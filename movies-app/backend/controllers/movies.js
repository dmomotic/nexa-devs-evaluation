const { response } = require("express");

const Movie = require("../models/movie");
const { existsMovieInFavorites } = require("../helpers/db-validations");

const moviePost = async (req, res = response) => {
  const { uid } = req.user; //It was added while checking token
  const { title, year, poster, imdbRating, imdbID } = req.body;

  //Validating unique movie by user in favorires
  const movieExists = await existsMovieInFavorites(uid, imdbID);

  if (movieExists) {
    return res.json({
      errors: [{ msg: "This movie is already in favorites" }],
    });
  }

  //Saving in DB
  const movie = new Movie({ title, poster, year, imdbRating, imdbID, uid });
  await movie.save();

  res.json({
    movie,
  });
};

const moviesGet = async (req, res = response) => {
  const { uid } = req.user; //It was added while checking token
  const movies = await Movie.find({ uid });
  res.json({
    movies
  });
};

const movieDelete = async (req, res = response) => {
  const { uid } = req.user; //It was added while checking token
  const { id: _id } = req.params;
  const movie = await Movie.deleteOne({ _id, uid });
  res.json({
    movie
  });
};;

module.exports = {
  moviePost,
  moviesGet,
  movieDelete
};
