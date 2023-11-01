<template>
    <div class="header-wrap">
        <h1>Заголовок</h1>

        <div class="profile" v-if="isAuthorized">
            <button @click="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                Выход
            </button>
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
            font-weight: bold;

            i {
                margin-right: 8px;
            }
        }
    }
}
</style>