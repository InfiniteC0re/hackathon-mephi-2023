<template>
    <div class="header-wrap">
        <h1>Задачник</h1>

        <div class="profile" v-if="isAuthorized">
            <div class="sprint-status">
                <div class="cirle"></div>
                <div class="text">Спринт запущен</div>
            </div>
            <button @click="isMenuOpened = !isMenuOpened">
                <i class="fa-solid fa-cog"></i>
                Управление
            </button>
            <div class="menu" v-if="isMenuOpened">
                <button @click="startSprint">
                    <i class="fa-solid fa-play"></i>
                    Обычный спринт
                </button>
                <button @click="fastSprint">
                    <i class="fa-solid fa-hourglass-start"></i>
                    Быстрый спринт
                </button>
                <button @click="resetSprint">
                    <i class="fa-solid fa-power-off"></i>
                    Сброс спринта
                </button>
                <button @click="refresh">
                    <i class="fa-solid fa-arrows-rotate"></i>
                    Обновить
                </button>
            </div>

            <button @click="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                Выход
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        isMenuOpened: false
    }),
    computed: {
        isAuthorized() {
            return this.$store.state.isAuthorized;
        }
    },
    methods: {
        startSprint() {
            this.$store.commit('startSprint');
            this.isMenuOpened = false;
        },
        fastSprint() {
            this.$store.commit('fastForwardSprint');
            this.isMenuOpened = false;
        },
        resetSprint() {
            this.$store.commit('resetSprint');
            this.isMenuOpened = false;
        },
        refresh() {
            this.$store.commit('getStatuses');
            this.isMenuOpened = false;
        },
        logout() {
            this.$store.commit('logout', {
                callback: () => {
                    this.$router.push("/login");
                }
            });
        },
    },
}
</script>

<style lang="scss" scoped>
.header-wrap {
    width: 100%;
    height: 70px;
    min-height: 70px;
    display: flex;
    padding: 0 32px;
    background: var(--panel-color);
    align-items: center;
    box-sizing: border-box;

    h1 {
        font-size: 1.3rem;
    }

    .profile {
        display: flex;
        gap: 8px;
        margin-left: auto;
        text-align: left;
        position: relative;

        .sprint-status {
            display: flex;
            align-items: center;
        }

        button {
            font-weight: bold;

            i {
                margin-right: 8px;
            }
        }

        @keyframes menu-appear {
            0% {
                opacity: 0;
                transform: translateX(100%);
            }

            50% {
                opacity: 0.1;
            }
            
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .menu {
            display: flex;
            flex-direction: column;
            animation: menu-appear 0.25s;
            gap: 8px;
            position: absolute;
            left: 0;
            right: 0;
            top: 100%;
            margin-top: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, .1);
            border-radius: 8px;
            backdrop-filter: blur(24px);
            padding: 8px;
            z-index: 1;

            button {
                width: 100%;
                display: flex;
                justify-content: left;

                i {
                    margin-right: 1.2em;
                }
            }
        }
    }
}
</style>