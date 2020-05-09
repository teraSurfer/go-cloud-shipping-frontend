<template>
  <b-row class="mx-0">
    <b-col sm="6">
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
    <b-col sm="6">
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
  </b-row>
</template>

<script>
import { vendorServices } from "@/services";
export default {
  data: () => ({
    totalOrders: 0,
    loading: false
  }),
  created() {
    this.getTotalOrders();
  },
  methods: {
    getTotalOrders: async function() {
      this.loading = true;
      const response = await vendorServices.getOrders(
        this.$store.getters["auth_module/getUser"].email
      );
      this.totalOrders = response.data.orders.length;
      console.log(this.totalOrders);
      this.loading = false;
    }
  }
};
</script>

