<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/common/AppNavbar.vue';
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
  @import "./scss/app.scss";
  @import '~bootstrap-vue/src/index.scss';
  .app-content {
    height: calc(100vh - 56px);
    margin: 0;
  }


  .main-content {
    width: 100%;
    overflow-y: scroll;
  }
</style>
