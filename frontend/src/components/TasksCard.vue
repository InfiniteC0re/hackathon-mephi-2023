<template>
    <div class="tasks-card-wrap" v-if="tasks">
        <h3 class="header">{{ caption }} <span>{{ tasks.length }}</span></h3>
        <div class="cards">
            <div class="card" v-for="task in tasks" @click="() => { console.log(task) }">
                <h4 :title="task.title" class="title">{{ task.title }}</h4>
                <div class="info">
                    <p class="text">{{ task.description }}</p>
                    <div class="performer" v-if="task.assigned_to">{{ getPerformerText(task) }}</div>
                    <div class="dates">
                        <p class="date" v-for="text in getDateTexts(task)">{{ text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        caption: String,
        tasks: Object,
    },
    methods: {
        getPerformerText(task) {
            if (task.executed_ts) {
                return `Выполнил ${task.assigned_to.first_name} ${task.assigned_to.second_name}`;
            } else {
                return `Выполняет ${task.assigned_to.first_name} ${task.assigned_to.second_name}`;
            }
        },
        getDateTexts(task) {
            let texts = [];

            if (!task.executed_ts) {
                if (task.created_ts) {
                    texts.push(`Создана: ${new Date(task.created_ts).toLocaleString("ru-ru")}`);
                }

                if (task.assigned_ts) {
                    texts.push(`Присвоена: ${new Date(task.assigned_ts).toLocaleString("ru-ru")}`);
                }
            }

            if (task.in_progress_ts) {
                texts.push(`Начата: ${new Date(task.in_progress_ts).toLocaleString("ru-ru")}`);
            }

            if (task.executed_ts) {
                texts.push(`Выполнена: ${new Date(task.executed_ts).toLocaleString("ru-ru")}`);

                let completionTime = new Date(task.executed_ts) - new Date(task.in_progress_ts);
                texts.push(`Выполнена за ${completionTime / (60 * 60 * 1000)} часов`);
            }

            return texts;
        }
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
    min-width: 300px;
    max-width: 300px;
    border-radius: 8px;
    padding: 12px;

    h3.header {
        font-size: 1rem;
        margin-bottom: 12px;

        span {
            padding: 2px 6px;
            font-size: 0.9rem;
            font-weight: 400;
            border-radius: 9999px;
            background: rgba(255, 255, 255, .2);
            margin-left: 4px;
        }
    }

    .cards {
        display: grid;
        overflow: auto;
        gap: 8px;

        .card {
            padding: 8px 12px;
            background: rgba(22, 27, 34, 1);
            border: 1px solid rgba(255, 255, 255, .1);
            border-radius: 8px;
            transition: 0.1s;
            cursor: pointer;

            &:hover {
                background: rgb(29, 33, 51);
            }

            .title {
                max-width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 0.9rem;
                margin-bottom: 4px;
            }

            .info {
                .text {
                    font-size: 0.9rem;
                    line-height: 20px;
                    color: rgba(255, 255, 255, .8)
                }

                .dates {
                    margin-top: 4px;
                    line-height: 16px;

                    .date {
                        color: rgba(255, 255, 255, .4);
                        font-size: 0.7rem;
                    }
                }

                .performer {
                    color: rgba(255, 255, 255, .7);
                    font-size: 0.8rem;
                    margin-top: 2px;
                }
            }

            h4 {
                font-size: 1rem;
            }
        }
    }
}
</style>