<template>
  <b-container class="d-flex justify-content-center" fluid>
    <b-card class="shadow-sm border-0 w-25" header-bg-variant="dark" header-class="border-0 text-white text-center">
      <template v-slot:header>
        <h6 class="mb-0">
          Scan
        </h6>
      </template>
      
      <p class="error">{{ error }}</p>

      <qrcode-stream @decode="onDecode" @init="onInit" />
    </b-card>
  </b-container>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  components: { QrcodeStream },

  data() {
    return {
      error: ""
    };
  },

  methods: {
    onDecode(result) {
      const params = JSON.parse(result);

      if(params.id && params.u_email) {
        this.$router.push({path: `/vendor/orders/${params.id}/${params.u_email}`});
      } else {
        this.error = "Invalid QR Code try again.";
      }
      
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>