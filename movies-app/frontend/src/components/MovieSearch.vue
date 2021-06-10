<template>
  <div class="card">
    <div class="card-header bg-dark text-white">Search movie</div>
    <div class="card-body">
      <!-- Search movie -->
      <div class="mb-3 row">
        <!-- Input name -->
        <label for="name" class="col-sm-2 col-form-label">Movie's name</label>
        <div class="col-sm-10 col-md-6 mb-3">
          <input type="text" class="form-control" id="name" v-model="name" @keypress.enter="search"/>
        </div>
        <!-- Button -->
        <div class="col-sm-6 col-md-4">
          <!-- Button -->
          <button
            class="btn btn-primary"
            @click.prevent="search"
            v-if="!store.state.working"
          >
            Buscar
          </button>

          <!-- Spinner -->
          <div
            class="spinner-border text-primary"
            role="status"
            v-if="store.state.working"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <transition name="fade" mode="out-in">
            <CardMovie :movie="movie" v-if="movie != null" />
          </transition>
          <div class="alert alert-light" role="alert" v-if="movie == null && searched">
            Movie "{{name}}" was not found :(
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, watch } from "vue";
import axios from "axios";

import CardMovie from "@/components/CardMovie.vue";

export default {
  name: "MovieSearch",
  components: {
    CardMovie,
  },
  setup() {
    const name = ref(null);
    const movie = ref(null);
    const searched = ref(false);
    const store = inject("store");
    const toast = inject("WKToast");

    const search = async () => {
      if (!name.value) {
        toast("Please enter a movie name");
        return;
      }
      
      searched.value = true;
      store.state.working = true;

      try {
        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=c646d34d&t=${name.value}`
        );
        if (res.data != null && res.data.Title != null) {
          movie.value = res.data;
          //Adding default img
          if(movie.value.Poster.length <= 7){
            movie.value.Poster= 'https://media.istockphoto.com/vectors/cinema-and-movie-time-vector-id640312764';
          }
        } else {
          movie.value = null;
        }
      } catch (error) {
        console.log(error);
      } finally {
        store.state.working = false;
      }
    };

    watch(name, () => {
      searched.value = false;
    });

    return { name, store, search, movie, searched };
  },
};
</script>