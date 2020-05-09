<template>
  <b-col sm="2" class="px-1">
    <b-card class="shadow-sm border-0 h-100" header-class="text-dark" body-class="p-2">
      <template v-slot:header>
        <h6 class="mb-0 text-center">{{getTitle}}</h6>
      </template>
      <b-nav pills vertical>
        <b-nav-item active-class="active" v-for="n of getNavs" :key="n.name" :to="n.path">
          <span class="mr-2">
            <fa :icon="n.icon" />
          </span>
          {{n.name}}
        </b-nav-item>
      </b-nav>
    </b-card>
  </b-col>
</template>

<script>
import { VENDOR } from "@/util/constants";
export default {
  data: () => ({
    vendorNavs: [
      {
        path: "/vendor/home",
        name: "Home",
        icon: "home"
      },
      {
        path: "/vendor/orders",
        name: "Orders",
        icon: "luggage-cart"
      },
      {
        path: "/vendor/update-price",
        name: "Price",
        icon: "money-bill-wave-alt"
      },
      {
        path: "/vendor/profile",
        name: "Profile",
        icon: "user-cog"
      },
      {
        path: "/vendor/scan",
        name: "Scan",
        icon: "qrcode"
      }
    ],
    customerNavs: [
      {
        path: "/buyer/home",
        name: "Home",
        icon: "home"
      },
      {
        path: "/buyer/orders",
        name: "Orders",
        icon: "luggage-cart"
      },
      {
        path: "/buyer/profile",
        name: "Profile",
        icon: "user-cog"
      }
    ]
  }),
  computed: {
    getTitle() {
      if (this.$store.getters["auth_module/getUserType"] === VENDOR) {
        return "Vendor Dashboard";
      } else {
        return "Customer Dashboard";
      }
    },
    getNavs() {
      if (this.$store.getters["auth_module/getUserType"] === VENDOR) {
        return this.vendorNavs;
      } else {
        return this.customerNavs;
      }
    }
  }
};
</script>