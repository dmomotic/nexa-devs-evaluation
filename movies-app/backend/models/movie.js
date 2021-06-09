const { Schema, model } = require('mongoose');

const MovieSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  poster: {
    type: String,
    default: null,
  },
  year: {
    type: String,
    required: [true, "Year is required"],
  },
  imdbRating: {
    type: String,
    required: [true, "imdbRating is required"],
  },
  imdbID: {
    type: String,
    required: [true, "imdbID is required"],
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

MovieSchema.methods.toJSON = function () {
  const { __v, _id, ...movie } = this.toObject();
  movie.id = _id;
  return movie;
}

module.exports = model('Movie', MovieSchema);