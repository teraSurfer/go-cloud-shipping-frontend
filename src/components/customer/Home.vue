<template>
  <b-container fluid>
    <b-row class="mx-0">
      <b-col sm="12" md="4">
        <b-card
          class="shadow-sm border-0"
          header-bg-variant="dark"
          header-class="text-center text-white"
        >
          <template v-slot:header>
            <h6 class="mb-0">Get Estimate</h6>
          </template>
          <b-form @submit.prevent="getEstimate">
            <b-form-group>
              <label for="source">Origin ZipCode:</label>
              <b-form-input
                v-model="estimate.origin"
                id="source"
                placeholder="Eg. 411057"
                type="text"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="source">Destination ZipCode:</label>
              <b-form-input
                v-model="estimate.destination"
                id="source"
                placeholder="Eg. 431605"
                type="text"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="source">Weight:</label>
              <b-form-input v-model="estimate.weight" id="source" placeholder="Eg. 5" type="text"></b-form-input>
            </b-form-group>
            <div class="text-center">
              <b-btn type="submit" :disabled="estimate.loading" variant="dark">Get Estimate</b-btn>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col sm="12" md="8">
        <b-card
          class="shadow-sm border-0"
          header-bg-variant="dark"
          header-class="text-center text-white"
        >
          <template v-slot:header>
            <h6 class="mb-0">Place Order</h6>
          </template>
          <b-form @submit.prevent="placeOrder">
            <b-form-group>
              <label for="source">Origin ZipCode:</label>
              <b-form-input v-model="order.origin" id="source" placeholder="Eg. 411057" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="destination">Destination ZipCode:</label>
              <b-form-input
                v-model="order.destination"
                id="source"
                placeholder="Eg. 431605"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <label>Pickup Date:</label>
            <b-form-input v-model="order.p_date" type="date" required />
            <b-form-group>
              <label for="weight">Weight:</label>
              <b-form-input v-model="order.weight" id="source" placeholder="Eg. 5" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="o_address">Origin Address:</label>
              <b-form-input v-model="order.o_address" id="source" placeholder="Eg. MUMBAI" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="d_address">Destination Address:</label>
              <b-form-input v-model="order.d_address" id="source" placeholder="Eg. PUNE" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="o_mobile">Origin Contact:</label>
              <b-form-input v-model="order.o_mobile" id="source" placeholder="Eg. 5555555555" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="d_mobile">Destination Contact:</label>
              <b-form-input v-model="order.d_mobile" id="source" placeholder="Eg. 5555555555" type="text" required></b-form-input>
            </b-form-group>

            <div class="text-center mt-2">
              <b-btn type="submit" :disabled="loading" variant="dark">Place Order</b-btn>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { customerServices } from "@/services";
import swal from "sweetalert";
export default {
  data: () => ({
    estimate: {
      origin: "",
      destination: "",
      weight: "",
      loading: false
    },
    order: {
      origin: "",
      destination: "",
      u_email: "",
      o_address: "",
      d_address: "",
      weight: "",
      o_mobile: "",
      d_mobile: "",
      p_date: "",
    },
    loading: false
  }),
  methods: {
    async getEstimate() {
      try {
        this.estimate.loading = true;
        const response = await customerServices.getEstimate(
          this.estimate.origin,
          this.estimate.destination,
          this.estimate.weight
        );
        swal({
          icon: "success",
          title: "Fetched your estimate",
          text: `Cost: ${response.data.price}`
        });
        this.estimate.loading = false;
      } catch (err) {
        console.log(err);
        this.estimate.loading = false;
      }
    },
    async placeOrder() {
      try {
        this.loading = true;
        this.order.u_email = this.$store.getters['auth_module/getUser'].email;
        const response = await customerServices.placeOrder(this.order);
        swal({icon: 'success', title: 'Order Placed Successfully.', text: `Total Cost: ${response.data.price}`});
        console.log(response);
        this.loading = false;
      } catch(err) {
        console.log(err);
        this.loading = false;
      }
    }
  }
};
</script>