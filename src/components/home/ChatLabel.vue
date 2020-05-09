<template>
  <div class="chat">
    <b-btn
      v-b-toggle.collapse-1
      @click="toggleChat"
      class="rounded-circle"
      size="lg"
      variant="primary"
    >
      <fa v-if="!isVisible" icon="comment-dots" size="1x" />
      <fa v-if="isVisible" icon="times" size="1x" />
    </b-btn>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card
        class="shadow p-0"
        header-bg-variant="primary"
        header-class="text-white text-center"
        body-class="p-2"
      >
        <template v-slot:header>
          <h6 class="mb-0">Chat with us</h6>
        </template>
        <div id="chat-box" class="chat-box">
        <b-card
          v-for="(m, i) of messages"
          :key="i"
          :bg-variant="m.user !== 'bot' ? 'primary' : 'light'"
          :class="`shadow-sm border-0 mb-1 chat-${m.user === 'bot'}`"
          body-class="p-1"
        >
          <p class="px-2 mb-0">{{m.user === 'bot' ? 'Support' : 'You'}}: {{m.message}}</p>
        </b-card>
        </div>
        <b-form @submit.prevent="sendMessage">
          <b-form-textarea
            id="textarea"
            v-model="userMessage"
            placeholder="Enter something..."
            rows="2"
            max-rows="2"
          ></b-form-textarea>
          <b-btn
            block
            type="submit"
            :disabled="userMessage === ''"
            class="mt-2"
            variant="primary"
          >Send</b-btn>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import { chatWithBot } from "@/services";
export default {
  data: () => ({
    isVisible: false,
    userMessage: "",
    messages: [],
    user: ""
  }),
  created() {
    this.user = this.$store.getters["auth_module/isLoggedIn"]
      ? this.$store.getters["auth_module/getUser"].email
      : Date.now().toString();
  },
  methods: {
    toggleChat() {
      this.isVisible = !this.isVisible;
    },
    async sendMessage() {
      try {
        this.messages.push({
          user: this.user,
          message: this.userMessage
        });
        const response = await chatWithBot(this.user, this.userMessage);
        this.userMessage = "";
        this.messages.push({
          user: "bot",
          message: response.data.message
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-label {
  z-index: 999;
}

.chat-true{
  width: 75%;
  margin-left: 25%;
}
.chat-false {
  width: 75%;
  color: white;
}

.chat-box {
  width: 400px;
  max-height: 40vh;
  overflow-y: scroll;
}
</style>