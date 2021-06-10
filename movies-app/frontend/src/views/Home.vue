<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <CardWithFavorites/>
      </div>
      <div class="col-12 mt-5">
        <MovieSearch />
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from "vue";
import router from "@/router";
import CardWithFavorites from '@/components/CardWithFavorites.vue';
import MovieSearch from '@/components/MovieSearch.vue';

export default {
  components: {
    CardWithFavorites,
    MovieSearch
  },
  setup() {
    const store = inject("store");

    onMounted(() => {
      if(localStorage.getItem('token')){
        store.state.token = localStorage.token;
      } else {
        router.push({ name: 'Login' })
      }
    });

    return { store };
  },
};
</script>