<template>
  <div class="container">
    <!-- Card with inputs -->
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <CardForm />
      </div>
    </div>

    <!-- Button -->
    <div class="row mt-3">
      <div class="d-grid gap-2 col-12 col-sm-8 col-md-4 mx-auto">
        <!-- Button -->
        <button
          class="btn btn-dark"
          type="button"
          @click.prevent="signup"
          v-if="!store.state.working"
        >
          Signup
        </button>
        <!-- Spinner -->
        <div class="d-flex justify-content-center" v-if="store.state.working">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from "vue";
import router from "@/router";
import axios from "axios";
import CardForm from "@/components/CardForm.vue";

// @ is an alias to /src

export default {
  name: "Register",
  components: {
    CardForm
  },
  setup() {
    const store = inject("store");
    const toast = inject("WKToast");

    onMounted(() => {
      if(localStorage.getItem('token') != null){
        store.state.token = localStorage.getItem('token');
        router.push({ name: "Home" });
      }
    });

    const signup = async () => {
      store.state.working = true;
      const data = { email: store.state.email, password: store.state.password };
      try {
        const res = await axios.post("/api/users", data);
        store.methods.clearFields();
        toast(store.methods.getResponseMessage(res, "Registered successfully"));
        router.push({ name: "Login" });
      } catch (e) {
        console.log(e);        
        toast(store.methods.getResponseMessage(e.response));
      } finally {
        store.state.working = false;
      }
    };
    return { store, signup };
  },
};
</script>
