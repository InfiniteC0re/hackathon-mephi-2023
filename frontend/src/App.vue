<template>
  <div class="content-wrap" v-if="isReady">
    <Header />
    <Overlay />
    <router-view></router-view>
  </div>
  <div class="loading-wrap" v-else>
    <LoadingIndicator />
  </div>
</template>

<script>
import LoadingIndicator from "@/components/LoadingIndicator.vue"
import Header from "@/components/Header.vue"
import Overlay from "./components/Overlay.vue";

export default {
  components: {
    Header,
    LoadingIndicator,
    Overlay
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
.content-wrap {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.loading-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
