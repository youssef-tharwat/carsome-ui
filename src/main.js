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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
