<template>
  <div class="content-wrap" v-if="isReady">
    <Header />
    <router-view></router-view>
    <div id="overlay" v-if="overlayVisible">
      <div class="overlay-form">
        <h2>{{ overlayCaption }}</h2>
        <div class="input-wrap" v-for="field in overlayFields">
          <p>{{ field.hint }}</p>
          <input :placeholder="field.placeholder" v-model="field.value" type="text">
        </div>
        <div class="buttons">
          <button @click="() => closeOverlay(0)">ОК</button>
          <button @click="() => closeOverlay(1)">Отмена</button>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-wrap" v-else>
    <LoadingIndicator />
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
  computed: {
    overlayVisible() {
      return this.$store.state.overlay.visible;
    },
    overlayCaption() {
      return this.$store.state.overlay.caption;
    },
    overlayFields() {
      return this.$store.state.overlay.fields;
    },
    overlayCallback() {
      return this.$store.state.overlay.closeCallback;
    }
  },
  methods: {
    closeOverlay(result) {
      this.overlayCallback(result);
      this.$store.state.overlay.visible = false;
    }
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

#overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .4);
  backdrop-filter: blur(24px);
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay-form {
    max-width: 400px;
    width: 70%;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, .2);
    background: var(--background-color);
    display: flex;
    flex-direction: column;

    h2 {
      margin-bottom: 8px;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 8px;
    }

    .input-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;

      p {
        line-height: 28px;
        text-align: left;
        font-weight: 400;
        margin-left: 4px;
        opacity: 0.8;
      }

      input {
        font-weight: 400;
        outline: none;
        border: 0;
        padding: 10px;
        font-size: 1rem;
        border-radius: 4px;
        background: var(--button-color);
        border: 1px solid rgba(255, 255, 255, .12);
        transition: border-color 0.25s;
        opacity: 1.0;

        &:focus {
          border-color: var(--button-active-color);
        }
      }
    }
  }
}
</style>
