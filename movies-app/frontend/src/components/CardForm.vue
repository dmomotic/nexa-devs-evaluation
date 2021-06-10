<template>
  <div class="card">
    <div class="card-body text-start p-5">
      <!-- Email -->
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Email address</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          v-model="store.state.email"
        />
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          v-model="store.state.password"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "CardForm",
  setup() {
    const store = inject('store');

    return { store };
  },
}
</script>