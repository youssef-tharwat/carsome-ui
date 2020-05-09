import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// axios
import axios from "./utils/axios";
Vue.prototype.$http = axios;

import VueProgressBar from "vue-progressbar";
import progressBarOptions from "./utils/progressbar";
Vue.use(VueProgressBar, progressBarOptions);

// Buefy for styling
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

// Tailwind utils
import "@/assets/scss/tailwind.scss";

import pusherConfig from "./utils/pusher";
console.log(pusherConfig);
Vue.use(require("vue-pusher"), pusherConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
