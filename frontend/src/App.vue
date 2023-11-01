<template>
  <Header />
  <router-view v-if="isReady"></router-view>
</template>

<script>
import Header from "@/components/Header.vue"

export default {
  components: {
    Header
  },
  data: () => ({
    isReady: false
  }),
  beforeMount() {
    if (this.$store.state.authToken) {
      this.$store.commit('checkToken', {
        callbackSuccess: () => {
          this.isReady = true;
          this.$store.state.isAuthorized = true;
        },
        callbackError: () => {
          this.isReady = true;
          this.$store.state.isAuthorized = false;
        }
      });
    } else {
      this.isReady = true;
    }
  }
}
</script>

<style lang="scss" scoped></style>
