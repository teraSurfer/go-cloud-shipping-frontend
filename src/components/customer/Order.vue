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
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Order Id:</strong>
          <span>{{order.id}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Customer Email:</strong>
          <span>{{order.u_email}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Order Date:</strong>
          <span>{{order.o_date}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Order Cost:</strong>
          <span>{{order.price}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Order Status:</strong>
          <span>{{order.current_status}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Order Weight:</strong>
          <span>{{order.weight}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Origin Address:</strong>
          <span>{{order.o_address}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Origin ZipCode:</strong>
          <span>{{order.origin}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Destination ZipCode:</strong>
          <span>{{order.destination}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Vendor Contact:</strong>
          <span>{{order.v_mobile}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Vendor Name:</strong>
          <span>{{order.v_name}}</span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <strong>Vendor Email:</strong>
          <span>{{order.v_email}}</span>
        </b-list-group-item>
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