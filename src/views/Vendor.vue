<template>
  <b-row class="app-content py-2" >
    <sidebar />
    <b-col sm="10" class="main-content" >
      <router-view />
    </b-col>
  </b-row>
</template>

<script>
import { handleHash } from "@/util/urlUtils.js";
import { VENDOR } from "@/util/constants";
import { vendorServices } from "@/services";
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
        this.$store.dispatch("auth_module/SET_USER_TYPE", VENDOR);
        this.$store.dispatch("auth_module/SET_ID_TOKEN", tokens.idToken);
        this.$store.dispatch(
          "auth_module/SET_ACCESS_TOKEN",
          tokens.accessToken
        );
        console.log(jdecode(tokens.idToken));
        const { email, name, phone_number } = jdecode(tokens.idToken);

        vendorServices
          .addVendor({
            v_email: email,
            name,
            mobile: phone_number.replace("+1", ""),
            password: "4444"
          })
          .then(console.log);
        this.$store.dispatch("auth_module/SET_USER", { email, name });
        window.location.href = "/vendor/home";
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    checkLogin: function() {
      const isLoggedIn = Boolean(this.$store.getters["auth_module/isLoggedIn"]);
      const isVendor =
        this.$store.getters["auth_module/getUserType"] === VENDOR;

      if (!isLoggedIn || !isVendor) {
        this.$router.push({ path: "/" });
      } else {
        return this.$route.path === "/vendor/home"
          ? null
          : this.$router.push({ path: "/vendor/home" });
      }
    }
  }
};
</script>