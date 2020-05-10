<template>
  <b-modal :active.sync="getIsConfirmationModalActive" has-modal-card :can-cancel="true">
    <div class="card">
      <div class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
          <br />
          <small>11:09 PM - 1 Jan 2016</small>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "BookingConfirmationModal",
  computed: {
    getIsConfirmationModalActive: {
      get() {
        return this.$store.getters["booking/getIsConfirmationModalActive"];
      },
      set(value) {
        this.$store.commit("booking/SET_CONFIRMATION_MODAL_ACTIVE", value);
      }
    },
    getSelectedBooking: {
      get() {
        return this.$store.getters["booking/getSelectedBooking"];
      },
      set(value) {
        this.$store.commit("booking/SET_SELECTED_BOOKING", value);
      }
    }
  }
};
</script>
