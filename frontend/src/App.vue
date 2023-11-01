<template>
  <div class="wrap-content" v-if="isReady">
    <Header />
    <router-view></router-view>
  </div>
  <div class="wrap-loading" v-else>
    <LoadingIndicator/>
  </div>
</template>

<script>
import LoadingIndicator from "@/components/LoadingIndicator.vue"
import Header from "@/components/Header.vue"

export default {
  components: {
    Header,
    LoadingIndicator
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

<style lang="scss" scoped>
.wrap-content {
  width: 100vw;
  height: 100%;
}
.wrap-loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
