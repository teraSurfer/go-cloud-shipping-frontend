<template>
  <b-container fluid>
    <b-card class="shadow-sm border-0" header-bg-variant="dark" header-class="text-center text-light border-0">
      <template v-slot:header>
        <h6 class="mb-0">Find Price</h6>
      </template>
      <div v-if="loading" class="text-center">
        <b-spinner type="grow" variant="primary" />
        <b-spinner type="grow" variant="warning" />
        <b-spinner type="grow" variant="dark" />
      </div>
      <b-form v-if="!loading" @submit.prevent="lowestPrice">
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
    <b-card class="shadow-sm border-0 mt-2" header-bg-variant="dark" header-class="text-center text-light border-0">
      <template v-slot:header>
        <h6 class="mb-0">Bid For Price</h6>
      </template>
      <b-form-spinbutton class="text-center" id="demo-sb" v-model="updatedPrice" min="1" :max="price"></b-form-spinbutton>
      <div class="text-center mt-2">
      <b-button variant="dark" @click="updatePrice" v-if="updatedPrice !== price">
        Update Price
      </b-button>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import { vendorServices, fetchDivisions, fetchLeastPrice } from "@/services";
import swal from 'sweetalert';
export default {
  data: () => ({
    formInput: {
      source: "",
      destination: "",
      loading: false
    },
    divisions: [],
    loading: false,
    price: 1,
    updatedPrice: 1
  }),
  created() {
    this.getDivisions();
  },
  methods: {
    async getDivisions() {
      this.loading = true;
      const response = await fetchDivisions();
      this.divisions = response.data.divisions;
      this.divisions = this.divisions.map(d => ({
        value: d,
        text: d
      }));
      console.log(this.divisions);
      this.loading = false;
    },
    lowestPrice: async function() {
      this.formInput.loading = true;
      try {
        const response = await fetchLeastPrice(this.formInput.source, this.formInput.destination);
        this.price = response.data.least_price;
        this.updatedPrice = response.data.least_price;
        this.formInput.loading = false;
      } catch (err) {
        console.log(err);
        this.formInput.loading = false;
      }
    },
    async updatePrice() {
      try {
        await vendorServices.updatePrice(this.formInput.source, this.formInput.destination, this.updatedPrice, this.$store.getters["auth_module/getUser"].email);
        swal({icon: "success", title: "Updated Price"});
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>