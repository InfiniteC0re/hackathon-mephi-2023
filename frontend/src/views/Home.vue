<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="@assets/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="@assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    components: {
        HelloWorld
    },
    mounted() {
        let redirectToLogin = !this.$store.state.authToken;

        if (!redirectToLogin) {
            this.$store.commit('checkToken', {
                callbackError: () => {
                    this.$router.push("/login");
                }
            });
        }
    }
}

</script>

<style lang="scss" scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;

    &:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }

    &.vue:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
    }
}
</style>