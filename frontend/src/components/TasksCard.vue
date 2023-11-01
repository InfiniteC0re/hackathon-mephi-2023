<template>
    <div class="tasks-card-wrap">
        <div class="header">
            <div class="title">
                <h3>{{ caption }} <span>{{ tasks.length }}</span></h3>
                <div class="buttons">
                    <button v-if="canAddNew"><i class="fa-solid fa-plus"></i></button>
                    <button @click="showFilters = !showFilters" :class="{ 'active': showFilters }">
                        <i class="fa-solid fa-filter"></i>
                    </button>
                </div>
            </div>
            <div class="filters" v-if="showFilters">
                <div class="search-bar">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" v-model="searchPrompt" ref="search">
                </div>
                <div class="sort-panel">
                    <button :class="{ 'active': sortType == 0 }" @click="sortType = 0">По алфавиту</button>
                    <button :class="{ 'active': sortType == 1 }" @click="sortType = 1">По дате создания</button>
                    <button class="squared" @click="sortOrder = (sortOrder + 1) % 2">
                        <i class="fa-solid fa-sort-up" v-if="sortOrder == 0"></i>
                        <i class="fa-solid fa-sort-down" v-else></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="cards" ref="cards" :class="{ 'scroll': hasScroll }">
            <TaskCard v-for="task in tasks" @click="() => { console.log(task) }" :task="task" :canDelete="canDelete" />
        </div>
    </div>
</template>

<script>
import TaskCard from "./TaskCard.vue"

export default {
    components: {
        TaskCard
    },
    props: {
        caption: String,
        filter: Function,
        canAddNew: Boolean,
        canDelete: Boolean,
    },
    data: () => ({
        mounted: false,
        showFilters: false,
        sortType: 0,
        sortOrder: 0,
        searchPrompt: ""
    }),
    computed: {
        tasks() {
            return this.$store.state.tasks.filter((task) => {
                return this.filter(task) && (
                    task.title.toLowerCase().includes(this.searchPrompt.toLowerCase()) ||
                    task.description.toLowerCase().includes(this.searchPrompt.toLowerCase())
                );
            }).sort((a, b) => {
                if (this.sortType == 0) {
                    if (this.sortOrder == 0) {
                        if (a.title < b.title) return 1;
                        if (a.title > b.title) return -1;
                    } else {
                        if (a.title < b.title) return -1;
                        if (a.title > b.title) return 1;
                    }
                } else {
                    if (this.sortOrder == 0) {
                        return new Date(a.created_ts) - new Date(b.created_ts);
                    } else {
                        return new Date(b.created_ts) - new Date(a.created_ts);
                    }
                }

                return 0;
            });
        },
        hasScroll() {
            return this.mounted && this.$refs.cards.scrollHeight > this.$refs.cards.clientHeight;
        }
    },
    mounted() {
        this.mounted = true;
    }
}
</script>

<style lang="scss" scoped>
.tasks-card-wrap {
    display: flex;
    flex-direction: column;
    text-align: left;
    background: var(--panel-color);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, .2);
    min-width: 345px;
    max-width: 345px;
    border-radius: 8px;
    padding: 12px;

    .header {
        font-size: 1rem;
        margin-bottom: 12px;

        .title {
            display: flex;

            span {
                padding: 2px 6px;
                font-size: 0.8rem;
                font-weight: 400;
                border-radius: 9999px;
                background: rgba(255, 255, 255, .2);
                margin-left: 4px;
                height: 100%;
            }

            .buttons {
                display: flex;
                margin-left: auto;
                gap: 6px;

                button {
                    font-size: 1rem;
                    width: 32px;
                    height: 32px;
                    padding: 0;
                }
            }
        }

        @keyframes filters-appear {
            0% {
                opacity: 0;
                transform: translateY(100%);
            }

            50% {
                opacity: 0;
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .filters {
            animation: filters-appear 0.3s forwards;

            .search-bar {
                display: flex;
                align-items: center;
                background: rgb(22, 27, 34);
                width: 100%;
                height: 36px;
                padding-left: 12px;
                box-sizing: border-box;
                margin-top: 8px;
                border-radius: 4px;

                input {
                    width: 100%;
                    height: 100%;
                    outline: none;
                    border: none;
                    background: none;
                    box-sizing: border-box;
                    padding: 0 12px;
                    font-family: 'Rubik';
                    font-weight: 200;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, .4);
                    transition: color 0.1s;

                    &:focus {
                        color: #fff;
                    }
                }
            }

            .sort-panel {
                display: flex;
                gap: 6px;
                margin-top: 12px;
                height: 36px;

                button {
                    flex: 1;
                    height: 36px;
                    padding: 0 8px;
                    font-size: 0.9rem;

                    &.squared {
                        flex: unset;
                        width: 36px;
                    }
                }
            }
        }
    }

    .cards {
        display: grid;
        overflow: auto;
        gap: 8px;

        &.scroll {
            padding-right: 8px;
        }
    }
}
</style>