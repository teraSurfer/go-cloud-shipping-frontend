<template>
  <b-container class="mt-2">
    <b-row>
      <b-col sm="12" md="6" class="cd-border-right border-dark">
        <b-card class="shadow-sm border-0" header-class="bg-dark border-0 text-white">
          <template v-slot:header>
            <h6 class="mb-0 text-center">Vendor Login</h6>
          </template>
          <div class="text-center">
            <b-img width="250px" src="@/assets/occupation.svg" />
          </div>
          <b-btn block :href="vendorLogin" variant="dark" class="mt-2">Login as Vendor</b-btn>
        </b-card>
      </b-col>
      <b-col sm="12" md="6">
        <b-card class="shadow-sm border-0" header-class="bg-dark border-0 text-white">
          <template v-slot:header>
            <h6 class="mb-0 text-center">Customer Login</h6>
          </template>
          <div class="text-center">
            <b-img width="250px" src="@/assets/profile.svg" />
          </div>
          <b-btn block :href="customerLogin" variant="dark" class="mt-2">Login as Customer</b-btn>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {urls} from '@/util/constants.js';
export default {
  data: () => ({
    vendorLogin: urls.vendorLogin,
    customerLogin: urls.customerLogin
  })
}
</script>

<style lang="scss" scoped>
.cd-border-right {
  border-right: 1px solid #dee2e6;
  @media only screen and (max-width: 767px) {
    border-right: 0px;
    margin-bottom: 1rem;
  }
}
</style>