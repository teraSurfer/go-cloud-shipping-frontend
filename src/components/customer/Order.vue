<template>
  <b-container fluid class="d-flex justify-content-center">
    <b-card
      class="shadow-sm border-0 w-35"
      header-bg-variant="dark"
      header-class="border-0 text-center text-light"
    >
      <template v-slot:header>
        <h6 class="mb-0">Order</h6>
      </template>
      <div v-if="loading" class="text-center">
        <b-spinner type="grow" variant="primary" />
        <b-spinner type="grow" variant="warning" />
        <b-spinner type="grow" variant="dark" />
      </div>
      <div class="text-center">
        <qrcode v-if="!loading" :value="value" />
      </div>
      <b-list-group v-if="!loading">
        <b-list-group-item>Order Id: {{order.id}}</b-list-group-item>
        <b-list-group-item>Customer Email: {{order.u_email}}</b-list-group-item>
        <b-list-group-item>Order Date: {{order.o_date}}</b-list-group-item>
        <b-list-group-item>Order Cost: {{order.price}}</b-list-group-item>
        <b-list-group-item>Order Status: {{order.current_status}}</b-list-group-item>
        <b-list-group-item>Order Weight: {{order.weight}}</b-list-group-item>
        <b-list-group-item>Origin Address: {{order.o_address}}</b-list-group-item>
        <b-list-group-item>Origin ZipCode: {{order.origin}}</b-list-group-item>
        <b-list-group-item>Destination ZipCode: {{order.destination}}</b-list-group-item>
        <b-list-group-item>Vendor Contact: {{order.v_mobile}}</b-list-group-item>
        <b-list-group-item>Vendor Name: {{order.v_name}}</b-list-group-item>
        <b-list-group-item>Vendor Email: {{order.v_email}}</b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script>
import { fetchOrderForCustomer } from "@/services";
export default {
  data: () => ({
    loading: false,
    order: {},
    value: ''
  }),
  created() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      try {
        this.loading = true;
        const { id, u_email } = this.$route.params;
        const response = await fetchOrderForCustomer(id, u_email);
        this.order = response.data;
        this.value = JSON.stringify({id: this.order.id, u_email: this.order.u_email});
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    }
  }
};
</script>