<template>
  <b-navbar toggleable="md" type="dark" class="shadow-sm" variant="dark">
    <b-container>
    <b-navbar-brand to="/">Go Ship</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item exact-active-class="active" v-for="n of getNavs()" v-bind:key="n.name" :to="n.path">{{n.name}}</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import {VENDOR, CUSTOMER} from '@/util/constants.js';
export default {
  data: () => ({
    navs: [
      {path: "/", name: "Home"},
      {path: "/login", name: "Login"}
    ],
    vendorNavs: [
      {path: "/", name: "Home"},
      {path: "/vendor", name: "Dashboard"},
    ],
    customerNavs: [
      {path: "/", name: "Home"},
      {path: "/buyer", name: "Dashboard"}
    ]
  }),
  methods: {
    getNavs: function() {
      if(this.$store.getters['auth_module/isLoggedIn'] && this.$store.getters['auth_module/getUserType'] === VENDOR) {
        return this.vendorNavs;
      } else if (this.$store.getters['auth_module/isLoggedIn'] && this.$store.getters['auth_module/getUserType'] === CUSTOMER) {
        return this.customerNavs;
      } else  {
        return this.navs;
      }
    }
  }
};
</script>