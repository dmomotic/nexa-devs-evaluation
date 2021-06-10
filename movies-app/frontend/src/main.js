import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "vue3-toast-single";
import "vue3-toast-single/dist/toast.css";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';
  
createApp(App)
  .use(router)
  .use(Toast, { verticalPosition: "bottom", duration: 2000 })
  .mount("#app");
