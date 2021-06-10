<template>
  <div class="card mb-3 h-100" v-if="movie != null">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          class="img-fluid"
          :src="movie.Poster || movie.poster"
          alt="Poster"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h3 class="card-title text-start">
            {{ movie.Title || movie.title }}
          </h3>
          <h5 class="cart-title align-items-center text-start">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
            {{ movie.imdbRating }}
          </h5>

          <p
            class="card-text mt-5 p-3"
            style="text-align: justify"
            v-if="movie.Plot != null"
          >
            {{ movie.Plot }}
          </p>
          <p class="card-text text-end mt-5">
            <small class="text-muted"
              >Year: {{ movie.Year || movie.year }}</small
            >
          </p>

          <!-- Add to favorites -->
          <button
            type="button"
            class="btn btn-outline-primary"
            v-if="!movieInFavorites && !working"
            @click.prevent="addMovieToFavorites"
          >
            + Add to favorites
          </button>

          <!-- Remove from favorites -->
          <button
            type="button"
            class="btn btn-outline-danger"
            v-if="movieInFavorites && !working"
            @click.prevent="removeMovieFromFavorites"
          >
            - Remove
          </button>

          <!-- Spinner -->
          <div
            class="spinner-border text-primary"
            role="status"
            v-if="working"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed, ref } from "vue";
import axios from "axios";
import Star from "@/components/Star.vue";

export default {
  name: "CardMovie",
  props: ["movie"],
  components: {
    Star,
  },
  setup(props) {
    const store = inject("store");
    const toast = inject("WKToast");
    const working = ref(false);

    const headers = {
      token: localStorage.getItem("token"),
    };

    const addMovieToFavorites = async () => {
      const {
        Title: title,
        Poster: poster,
        Year: year,
        imdbRating,
        imdbID,
      } = props.movie;

      working.value = true;
      const data = { title, poster, year, imdbRating, imdbID };

      try {
        const res = await axios.post("/api/movies", data, { headers });
        store.methods.addMovieToFavorites(res.data.movie);
        toast("Movie was added :D");
      } catch (error) {
        console.log(error);
        toast(store.methods.getResponseMessage(error.response));
      } finally {
        working.value = false;
      }
    };

    const removeMovieFromFavorites = async () => {
      const { imdbID } = props.movie;
      working.value = true;

      try {
        const movieId = store.methods.getMovieId(imdbID);
        const route = `/api/movies/${movieId}`;
        console.log(route);
        const res = await axios.delete(route, { headers });
        store.methods.removeMovieFromFavorites(imdbID);
        toast('Movie removed');
      } catch (error) {
        console.log(error);
        toast(store.methods.getResponseMessage(error.response));
      } finally {
        working.value = false;
      }
    };

    const movieInFavorites = computed(() => {
      return store.state.favorites.some(
        (item) => item.imdbID == props.movie.imdbID
      );
    });

    return {
      store,
      movieInFavorites,
      addMovieToFavorites,
      removeMovieFromFavorites,
      working
    };
  },
};
</script>