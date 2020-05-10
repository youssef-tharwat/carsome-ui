import axios from "@/utils/axios";
import { API_BOOKING_CREATE, API_BOOKING_GET } from "@/constants/services";

export default {
  namespaced: true,
  state: {
    bookings: [],
    selectedBooking: {},
    isConfirmationModalActive: false
  },
  mutations: {
    SET_SELECTED_BOOKING(state, payload) {
      state.selectedBooking = payload;
    },
    SET_BOOKINGS(state, payload) {
      state.bookings = payload;
    },
    SET_CONFIRMATION_MODAL_ACTIVE(state, payload) {
      state.isConfirmationModalActive = payload;
    }
  },
  actions: {
    GET({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(API_BOOKING_GET)
          .then(response => {
            if (response.status === 200 && response.data.data) {
              commit("SET_BOOKINGS", response.data.data);
              resolve(200);
            }
          })
          .catch(error => {
            return reject({ error });
          });
      });
    },
    CREATE({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(API_BOOKING_CREATE, payload)
          .then(response => {
            if (response.status === 200 && response.data.data) {
              console.log(dispatch);
              resolve(200);
            }
          })
          .catch(error => {
            return reject({ error });
          });
      });
    }
  },
  getters: {
    getSelectedBooking: state => state.selectedBooking,
    getBookings: state => state.bookings,
    getIsConfirmationModalActive: state => state.isConfirmationModalActive
  }
};
