import { reactive } from "vue";

const state = reactive({
  token: null,
  email: "",
  password: "",
  working: false,
  favorites: [],
});

const methods = {
  getResponseMessage(response, successMessage) {
    console.log(response, successMessage);
    if (response.status == 200) {
      return successMessage || "Action completed";
    } else {
      if (
        response.data.errors instanceof Array &&
        response.data.errors.length > 0
      ) {
        return response.data.errors[0].msg || "Something went wrong";
      }
      return "Something went wrong";
    }
  },
  clearFields() {
    state.email = "";
    state.password = "";
  },
  addMovieToFavorites(movie) {
    if (!movie) return;
    state.favorites.push(movie);
  },
  removeMovieFromFavorites(imdbID) {
    const index = state.favorites.findIndex((item) => item.imdbID == imdbID);
    if (index >= 0) {
      state.favorites.splice(index, 1);
    }
  },
  setFavorites(movies) {
    if (!(movies instanceof Array)) return;
    for (const movie of movies) {
      state.favorites.push(movie);
    }
  },
  getMovieId(imdbID) {
    const index = state.favorites.findIndex((item) => item.imdbID == imdbID);
    if (index >= 0) return state.favorites[index].id;
    return "";
  },
  cleanFavorites() {
    if (state.favorites.length > 0)
      state.favorites.splice(0, state.favorites.length);
  },
};

export default {
  state,
  methods,
};
