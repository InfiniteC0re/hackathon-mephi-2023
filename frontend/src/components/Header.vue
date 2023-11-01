<template>
    <div class="header-wrap">
        <h1>Заголовок</h1>

        <div class="profile" v-if="isAuthorized">
            <button @click="logout">Выход</button>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        isAuthorized() {
            return this.$store.state.isAuthorized;
        }
    },
    methods: {
        logout() {
            this.$store.commit('logout', {
                callback: () => {
                    this.$router.push("/login");
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.header-wrap {
    width: 100%;
    height: 70px;
    display: flex;
    padding: 0 32px;
    background: var(--panel-color);
    align-items: center;
    box-sizing: border-box;

    h1 {
        font-size: 1.3rem;
    }

    .profile {
        margin-left: auto;
        text-align: left;

        button {
            background: rgba(0, 0, 0, 0.5);
            // color: #000;
            font-weight: bold;
        }
    }
}
</style>