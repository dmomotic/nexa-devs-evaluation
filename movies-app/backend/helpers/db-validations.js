const User = require('../models/user');
const Movie = require('../models/movie');

const userExists = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`Email ${email} already exists in database`);
  }
}

const existsMovieInFavorites = async (uid, imdbID) => {
  return await Movie.findOne({ uid, imdbID });
}

module.exports = {
  userExists,
  existsMovieInFavorites,
};