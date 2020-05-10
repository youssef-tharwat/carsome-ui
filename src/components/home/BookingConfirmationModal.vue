<template>
  <b-modal
    :on-cancel="resetForm()"
    :active.sync="getIsConfirmationModalActive"
    has-modal-card
    :can-cancel="true"
  >
    <section class="section">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="mb-5 w-full">
                  <h6 class="text-left">Booking Date: {{ getSelectedBookingDate }}</h6>
                </div>
                <div class="mb-5">
                  <b-field label="Name" :label-position="'inside'">
                    <ValidationProvider name="name" rules="required|max:30" v-slot="{ errors }">
                      <b-input name="name" placeholder="name" v-model="name"> </b-input>
                      <div class="has-text-danger text-left mt-1">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </b-field>
                </div>
                <div class="mb-5">
                  <b-field label="Email" :label-position="'inside'">
                    <ValidationProvider
                      name="email"
                      rules="required|email|max:30"
                      v-slot="{ errors }"
                    >
                      <b-input name="email" placeholder="test@test.com" v-model="email"> </b-input>
                      <div class="has-text-danger text-left mt-1">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </b-field>
                </div>
                <div class="buttons mt-4">
                  <button class="button is-success w-full" type="submit">
                    <span>Confirm</span>
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </section>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate/dist/vee-validate.full.esm";
import moment from "moment";

export default {
  name: "BookingConfirmationModal",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: "",
      name: ""
    };
  },
  computed: {
    getIsConfirmationModalActive: {
      get() {
        return this.$store.getters["booking/getIsConfirmationModalActive"];
      },
      set(value) {
        this.$store.commit("booking/SET_CONFIRMATION_MODAL_ACTIVE", value);
      }
    },
    getSelectedBookingDate() {
      return moment(this.$store.getters["booking/getSelectedBooking"].date).format(
        "Do MMMM YYYY, h:mm a"
      );
    },
    getSelectedBookingDateResource() {
      return this.$store.getters["booking/getSelectedBooking"].resource._resource.id;
    }
  },
  methods: {
    async onSubmit() {
      const response = await this.$store.dispatch("booking/CREATE", {
        name: this.name,
        email: this.email,
        start: this.$store.getters["booking/getSelectedBooking"].dateStr,
        resourceId: this.getSelectedBookingDateResource
      });

      if (response.data && response.data.status === "error") {
        this.$buefy.snackbar.open({
          duration: 6500,
          message: response.data.data.message.error,
          type: "is-danger",
          position: "is-bottom-right",
          actionText: "Ok",
          queue: false
        });
      }

      this.$store.commit("booking/SET_CONFIRMATION_MODAL_ACTIVE", false);
    },
    resetForm() {
      this.name = "";
      this.email = "";
    }
  }
};
</script>

<style lang="scss">
.card {
  width: 30em;
  border-radius: 6px;
}
.help.is-danger {
  text-align: left;
}
</style>
