<template>
    <div class="header-wrap">
        <h1>Задачник</h1>

        <div class="profile" v-if="isAuthorized">
            <div class="sprint-status" :class="{ 'active': isSprintActive }" @click="openAnalytics">
                <div class="circle"></div>
                <div class="text">
                    <p>{{ sprintStatusText }}</p>
                    <p :class="{ 'error': usedSize > teamSpeed }">Сложность: {{ usedSize }} / {{ teamSpeed }}</p>
                </div>
            </div>
            <button @click="isMenuOpened = !isMenuOpened">
                <i class="fa-solid fa-cog"></i>
                Управление
            </button>
            <div class="menu" v-if="isMenuOpened">
                <button @click="openAnalytics" :disabled="!hasTasksInSprint">
                    <i class="fa-solid fa-chart-simple"></i>
                    Отчет по последнему спринту
                </button>
                <button @click="startSprint" :disabled="usedSize > teamSpeed">
                    <i class="fa-solid fa-play"></i>
                    Обычный спринт
                </button>
                <button @click="fastSprint" :disabled="usedSize > teamSpeed">
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
        },
        inProgressTasks() {
            return this.$store.state.tasks.filter(x => x.status.status_en == "in-progress");
        },
        plannedTasks() {
            return this.$store.state.tasks.filter(x => x.status.status_en == "planned" || x.status.status_en == "assigned" || x.status.status_en == "in-progress");
        },
        isSprintActive() {
            return this.$store.state.sprintStarted;
        },
        usedSize() {
            return this.plannedTasks.reduce((sum, val) => sum + val.supposed_size, 0);
        },
        teamSpeed() {
            return this.$store.state.teamSpeed;
        },
        hasTasksInSprint() {
            return this.$store.state.sprintResults.totalTasks;
        },
        sprintStatusText() {
            if (this.isSprintActive) {
                return "Спринт запущен";
            } else {
                return "Спринт остановлен";
            }
        },
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
        openAnalytics() {
            if (this.hasTasksInSprint) {
                this.$store.state.sprintOverlay = true;
                this.isMenuOpened = false;
            }
        }
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
            font-weight: 100;
            margin-right: 16px;
            opacity: 0.7;
            font-size: 15px;
            transition: opacity 0.1s;
            line-height: 18px;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }

            p:nth-last-child(1) {
                color: rgba(255, 255, 255, .5);
                font-size: 13px;

                &.error {
                    color: rgb(255, 22, 88);
                    font-weight: 500;
                    text-decoration: underline;
                }
            }

            .circle {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-right: 12px;
                background: rgb(248, 81, 73);
                filter: drop-shadow(0px 0px 6px rgb(248, 81, 73));
            }

            &.active {
                .circle {
                    background: rgb(68, 230, 79);
                    filter: drop-shadow(0px 0px 6px rgb(68, 230, 79));
                }
            }
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