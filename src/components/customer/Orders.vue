<template>
  <b-container fluid>
    <b-card class="shadow-sm border-0" header-bg-variant="dark" header-class="border-0 text-white">
      <template v-slot:header>
        <h6 class="text-center mb-0">Orders</h6>
      </template>
      <div class="text-center" v-if="loading">
        <b-spinner type="grow" variant="primary" />
        <b-spinner type="grow" variant="warning" />
        <b-spinner type="grow" variant="dark" />
      </div>
      <div class="text-center" v-if="!loading">
        <b-table
          id="vendor-orders"
          :per-page="perPage"
          :current-page="currentPage"
          :items="items"
          :fields="fields"
          hover
          selectable
          select-mode="single"
          @row-selected="onRowSelected"
          responsive
        />
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="vendor-orders"
          class="d-flex justify-content-center"
        ></b-pagination>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import { customerServices } from "@/services";
export default {
  data: () => ({
    loading: false,
    items: [],
    fields: [
      "id",
      "u_email",
      "v_email",
      "o_date",
      "v_mobile",
      "origin",
      "destination"
    ],
    currentPage: 1,
    perPage: 5,
    rows: 0
  }),
  created: function() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders: async function() {
      try {
        this.loading = true;
        // const response = await customerServices.getOrders(this.$store.getters["auth_module/getUser"].email);
        const response = await customerServices.getOrders(
          "amit.vijapure@sjsu.edu"
        );
        this.items = response.data.orders;
        this.rows = response.data.orders.length;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    onRowSelected(item) {
      this.$router.push({path: `/buyer/orders/${item[0].id}/${item[0].u_email}`})
    }
  }
};
</script>