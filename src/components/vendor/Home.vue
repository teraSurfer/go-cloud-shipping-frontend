<template>
  <b-container fluid>
    <b-row class="mx-0">
      <b-col sm="6" class="pl-0">
        <b-card class="shadow-sm border-0" footer-class="border-0">
          <div v-if="loading" class="text-center">
            <b-spinner type="grow" variant="primary" />
            <b-spinner type="grow" variant="warning" />
            <b-spinner type="grow" variant="dark" />
          </div>
          <div v-if="!loading" class="text-center">
            <h3 class="mb-0">{{totalOrders}}</h3>
          </div>
          <template v-slot:footer>
            <h6 class="text-center mb-0">Total Orders</h6>
          </template>
        </b-card>
      </b-col>
      <b-col sm="6" class="pr-0">
        <b-card class="shadow-sm border-0" footer-class="border-0">
          <div v-if="loading" class="text-center">
            <b-spinner type="grow" variant="primary" />
            <b-spinner type="grow" variant="warning" />
            <b-spinner type="grow" variant="dark" />
          </div>
          <div v-if="!loading" class="text-center">
            <h3 class="mb-0">{{totalDivisions}}</h3>
          </div>
          <template v-slot:footer>
            <h6 class="text-center mb-0">Total Locations</h6>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mx-0 mt-4">
      <b-card
        class="shadow-sm border-0 w-100"
        header-bg-variant="dark"
        header-class="text-center border-0 text-white"
      >
        <template v-slot:header>
          <h6 class="mb-0 text-center">Find Prices</h6>
        </template>
        <b-form @submit.prevent="lowestPrice">
          <b-form-group>
            <label for="source">Source Location:</label>
            <b-form-select id="source" v-model="formInput.source" :options="divisions"></b-form-select>
          </b-form-group>
          <b-form-group>
            <label for="destination">Destination Location:</label>
            <b-form-select id="destination" v-model="formInput.destination" :options="divisions"></b-form-select>
          </b-form-group>
          <div class="text-center">
            <b-button type="submit" :disabled="formInput.loading" variant="outline-dark">
              <b-spinner v-if="formInput.loading" />
              <span v-if="!formInput.loading">Find Price</span>
            </b-button>
          </div>
        </b-form>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { vendorServices, fetchDivisions, fetchLeastPrice } from "@/services";
import swal from 'sweetalert';
export default {
  data: () => ({
    totalOrders: 0,
    totalDivisions: 0,
    divisions: [],
    loading: false,
    formInput: {
      source: "",
      destination: "",
      loading: false
    }
  }),
  created() {
    this.getCounts();
  },
  methods: {
    getCounts: async function() {
      this.loading = true;
      const response = await vendorServices.getOrders(
        this.$store.getters["auth_module/getUser"].email
      );

      const divResponse = await fetchDivisions();
      this.totalDivisions = divResponse.data.divisions.length;
      this.divisions = divResponse.data.divisions;
      this.divisions = this.divisions.map(d => ({
        value: d,
        text: d
      }));
      this.totalOrders = response.data.orders.length;
      this.loading = false;
    },
    lowestPrice: async function() {
      this.formInput.loading = true;
      try {
        const data = await fetchLeastPrice(this.formInput.source, this.formInput.destination);
        swal({title: 'Found Price', text: `Lowest Price is - ${data.data.least_price}`});
        this.formInput.loading = false;
      } catch (err) {
        console.log(err);
        this.formInput.loading = false;
      }
    }
  }
};
</script>

