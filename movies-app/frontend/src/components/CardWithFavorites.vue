<template>
  <div class="card">
    <div class="card-header bg-primary text-white">Favorites</div>
    <div class="card-body container">
      <!-- Spinner -->
      <div class="d-flex justify-content-center" v-if="!loaded">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <!-- Without favorites -->
      <h5
        class="card-title"
        v-if="store.state.favorites.length === 0 && loaded"
      >
        You have no favorites yet :(
      </h5>
      <!-- Favorites -->
      <transition name="fade" mode="out-in">
        <div class="row" v-if="store.state.favorites.length > 0">
          <div
            class="col-12 col-sm-6 col-md-4 my-3"
            v-for="movie in store.state.favorites"
            :key="movie.id"
          >
            <CardMovie :movie="movie" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import axios from "axios";

import CardMovie from "@/components/CardMovie.vue";

export default {
  name: "CardWithFavorites",
  components: {
    CardMovie,
  },
  setup() {
    const store = inject("store");
    const toast = inject("WKToast");

    const loaded = ref(false);

    onMounted(async () => {
      store.methods.cleanFavorites();
      const token = localStorage.getItem("token");
      if(!token) return;
      const headers = { token };
      try {
        const res = await axios.get("/api/movies", { headers });
        store.methods.setFavorites(res.data.movies);
      } catch (error) {
        console.log(error);
        toast("Couldn´t load favorites");
      } finally {
        loaded.value = true;
      }
    });

    return { store, loaded };
  },
};
</script>