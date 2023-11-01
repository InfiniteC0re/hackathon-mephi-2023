<template>
    
</template>

<script>

export default {
    components: {
        
    },
    mounted() {
        let redirectToLogin = !this.$store.state.authToken;

        if (!redirectToLogin) {
            this.$store.commit('checkToken', {
                callbackError: () => {
                    this.$router.push("/login");
                }
            });
        } else {
            this.$router.push("/login");
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