<template>
    <div id="overlay" v-if="overlayVisible && $store.state.sprintResults.statsDays">
        <div class="overlay-form">
            <h2>Отчет по последнему спринту</h2>
            <div class="content">
                <h3 v-if="isSprintActive">Задач выполнено {{ solvedTasks }} из {{ totalTasks }} (спринт активен)</h3>
                <h3 v-else>Задач выполнено {{ solvedTasks }} из {{ totalTasks }} за {{ solvedInDays }} дней</h3>
                <div class="progress-wrap">
                    <div class="bar" :style="{ width: `${solvedTasks / totalTasks * 100}%` }"></div>
                </div>
                <h3>Зайдествованная скорость ({{ totalDifficult }} из {{ teamSpeed }})</h3>
                <div class="progress-wrap">
                    <div class="bar" :style="{ width: `${totalDifficult / teamSpeed * 100}%` }"></div>
                </div>
                <div class="table-wrap">
                    <p class="head">Номер дня</p>
                    <p class="head">Кол-во задач</p>
                    <template v-for="(day, index) in $store.state.sprintResults.statsDays">
                        <p>{{ index + 1 }}</p>
                        <p>{{ day.length }}</p>
                    </template>
                </div>
            </div>
            <div class="buttons">
                <button @click="closeOverlay">Закрыть</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        overlayVisible() {
            // return true;
            return this.$store.state.sprintOverlay;
        },
        isSprintActive() {
            return this.$store.state.sprintStarted;
        },
        totalTasks() {
            return this.$store.state.sprintResults.totalTasks;
        },
        solvedTasks() {
            let days = this.$store.state.sprintResults.statsDays;

            if (days) {
                return days.reduce((sum, val) => sum + val.length, 0)
            } else {
                return 0;
            }
        },
        solvedInDays() {
            let days = this.$store.state.sprintResults.statsDays;

            if (days) {
                let sum = 0;

                for (let i = 0; i < days.length; i++) {
                    sum += days[i].length;

                    if (sum == this.totalTasks) {
                        return i + 1;
                    }
                }
            } else {
                return 0;
            }
        },
        teamSpeed() {
            return this.$store.state.teamSpeed;
        },
        totalDifficult() {
            let days = this.$store.state.sprintResults.statsDays;

            if (days) {
                return days.reduce((sum, val) => {
                    for (let i = 0; i < val.length; i++) {
                        sum += val[i].supposed_size;
                    }

                    return sum;
                }, 0)
            } else {
                return 0;
            }
        }
    },
    methods: {
        closeOverlay() {
            this.$store.state.sprintOverlay = false;
        }
    },
}
</script>

<style lang="scss" scoped>
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
    z-index: 9999;
    box-sizing: border-box;
    overflow: auto;
    padding: 32px 0;

    @keyframes overlay-form-appear {
        0% {
            opacity: 0;
            transform: translateY(100%);
        }

        50% {
            opacity: 0.2;
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .overlay-form {
        max-width: 430px;
        max-height: 70vh;
        overflow: auto;
        width: 70%;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, .2);
        background: var(--background-color);
        display: flex;
        flex-direction: column;
        animation: overlay-form-appear 0.3s;

        h2 {
            margin-bottom: 8px;
        }

        .content {
            text-align: left;
            margin-bottom: 8px;

            h3 {
                font-size: 16px;
                margin-bottom: 4px;
                margin-left: 4px;
                font-weight: 500;
            }

            .progress-wrap {
                width: 100%;
                height: 8px;
                background: var(--button-color);
                border-radius: 32px;
                border: 1px solid rgba(255, 255, 255, .2);
                overflow: hidden;
                margin-bottom: 8px;

                .bar {
                    height: 100%;
                    width: 50%;
                    background: var(--button-active-color);
                    transition: 0.1s width;
                    filter: drop-shadow(0 0 8px var(--button-active-color));
                    border-radius: 32px;
                }
            }

            .table-wrap {
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 8px 16px;
                box-sizing: border-box;
                background: var(--button-color);
                border: 1px solid rgba(255, 255, 255, .2);
                border-radius: 8px;
                gap: 2px;
                margin-top: 12px;

                p {
                    padding: 1px;

                    &.head {
                        font-weight: bold;
                    }
                }
            }
        }

        .buttons {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 8px;
        }
    }
}
</style>