<template>
  <div>
    <div id="nav">
      <router-link class="me-4" to="/" v-if="!store.state.token"
        >Login</router-link
      >
      <router-link to="/register" v-if="!store.state.token"
        >Register</router-link
      >

      <ul class="nav justify-content-center" v-if="store.state.token">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"
            ><router-link to="/Home">Home</router-link></a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" @click.prevent="logout"
            >Logout</a
          >
        </li>
      </ul>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { provide } from "vue";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    provide("store", store);

    const logout = () => {
      localStorage.removeItem("token");
      store.state.token = null;
      router.push({ name: "Login" });
      store.methods.cleanFavorites();
    };

    return { store, logout };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
