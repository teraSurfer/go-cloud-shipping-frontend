<template>
  <b-container class="d-flex justify-content-center" fluid>
    <b-card
      class="shadow-sm border-0 w-25"
      header-bg-variant="dark"
      header-class="text-center text-light border-0"
    >
      <template v-slot:header>
        <h6 class="mb-0">Profile</h6>
      </template>
      <div class="text-center">
        <b-img width="150px" rounded="circle" thumbnail src="@/assets/occupation.svg" />
      </div>
      <b-list-group class="mt-2">
        <b-list-group-item>Name: {{user.name}}</b-list-group-item>
        <b-list-group-item>Email: {{user.email}}</b-list-group-item>
      </b-list-group>
      <b-btn class="mt-2" @click="logout" variant="dark" block>Logout</b-btn>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data: () => ({
    user: {}
  }),
  created() {
    this.user = this.$store.getters["auth_module/getUser"];
  },
  methods: {
    logout() {
      window.localStorage.clear();
      window.location.href = "/";
    }
  }
};
</script>