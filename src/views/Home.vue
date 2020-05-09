  
<template>
  <section class="home">
    <banner />
    <chat-label class="chat" />
  </section>
</template>

<script>
import Banner from '@/components/home/Banner.vue';
import ChatLabel from '@/components/home/ChatLabel.vue';
export default {
  name: 'home',
  components: {
    Banner,
    ChatLabel
  }
}
</script>

<style lang="scss" scoped>
.chat {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 2rem;
  margin-bottom: 2rem;
}
</style>