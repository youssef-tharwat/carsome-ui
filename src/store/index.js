import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import booking from "./modules/moduleBooking";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    booking: booking
  }
});
