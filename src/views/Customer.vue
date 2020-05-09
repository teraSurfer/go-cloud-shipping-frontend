<template>
  <b-row class="app-content py-2">
    <sidebar />
    <b-col sm="10" class="main-content px-0">
      <router-view />
    </b-col>
  </b-row>
</template>

<script>
import { handleHash } from "@/util/urlUtils.js";
import { CUSTOMER } from "@/util/constants";
import { customerServices } from "@/services";
import jdecode from "jwt-decode";
import Sidebar from "@/components/common/Sidebar.vue";
export default {
  components: {
    Sidebar
  },
  created: function() {
    if (this.$route.hash !== "") {
      this.loginUser(handleHash(this.$route.hash));
    } else {
      this.checkLogin();
    }
  },
  methods: {
    loginUser: function(tokens) {
      if (tokens.idToken !== "") {
        this.$store.dispatch("auth_module/LOGGED_IN");
        this.$store.dispatch("auth_module/SET_USER_TYPE", CUSTOMER);
        this.$store.dispatch("auth_module/SET_ID_TOKEN", tokens.idToken);
        this.$store.dispatch(
          "auth_module/SET_ACCESS_TOKEN",
          tokens.accessToken
        );
        console.log(jdecode(tokens.idToken));
        const { email, given_name, family_name } = jdecode(tokens.idToken);

        customerServices
          .addCustomer({
            u_email: email,
            first_name: given_name,
            last_name: family_name,
            password: "4444"
          })
          .then(res => {
            this.$store.dispatch("auth_module/SET_USER", {
              email,
              name: `${given_name} ${family_name}`
            });
            console.log(res);
            window.location.href = "/buyer/home";
          });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    checkLogin: function() {
      const isLoggedIn = Boolean(this.$store.getters["auth_module/isLoggedIn"]);
      const isCustomer =
        this.$store.getters["auth_module/getUserType"] === CUSTOMER;

      if (!isLoggedIn || !isCustomer) {
        this.$router.push({ path: "/" });
      } else {
        if(this.$route.path === '/buyer') this.$router.push({path: '/buyer/home'});
        return;
      }
    }
  }
};
</script>