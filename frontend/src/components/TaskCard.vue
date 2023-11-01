<template>
    <div class="card" @click.self="menu = false" :class="{ 'backdrop': menu }">
        <div class="header">
            <h4 :title="task.title" class="title">{{ task.title }}</h4>
        </div>
        <div class="info">
            <p class="text">{{ task.description }}</p>
            <div class="performer" v-if="task.assigned_to">{{ getPerformerText(task) }}</div>
            <div class="dates">
                <p class="date" v-for="text in getDateTexts(task)">{{ text }}</p>
            </div>
        </div>
        <div class="menu-button" @click="menu = canDelete" v-if="canDelete">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div class="menu" v-if="menu">
            <button @click="deleteCard">Удалить</button>
            <button @click="menu = false">Отмена</button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        menu: false
    }),
    props: {
        task: Object,
        canDelete: Boolean
    },
    methods: {
        deleteCard() {
            this.menu = false;
            this.$store.commit("openOverlay", {
                caption: "Удалить?",
                closeCallback: (result) => {
                    if (result == 0) {
                        this.$store.commit("deleteTask", { id: this.task.id });
                    }
                }
            });
        },
        getPerformerText(task) {
            if (task.executed_ts) {
                return `Выполнил ${task.assigned_to.first_name} ${task.assigned_to.second_name}`;
            } else {
                return `Выполняет ${task.assigned_to.first_name} ${task.assigned_to.second_name}`;
            }
        },
        getDateTexts(task) {
            let texts = [];

            if (task.created_ts) {
                texts.push(`Создана: ${new Date(task.created_ts).toLocaleString("ru-ru")}`);
            }

            if (!task.executed_ts) {
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
.card {
    position: relative;
    padding: 8px 12px;
    background: rgba(22, 27, 34, 1);
    border: 1px solid rgba(255, 255, 255, .1);
    border-radius: 8px;
    transition: 0.1s;
    cursor: pointer;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transition: 0.1s;
        pointer-events: none;
        backdrop-filter: blur(32px);
        opacity: 0;
        border-radius: 8px;
        background: rgba(0, 0, 0, .3);
        z-index: 9998;
    }

    &.backdrop::after {
        opacity: 1;
        pointer-events: all;
    }

    .menu {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        gap: 8px;
        flex-direction: column;
        z-index: 9999;

        button {
            font-size: 0.9rem;
            height: 30px;
            padding: 0 16px;
        }
    }

    &:hover {
        background: rgb(29, 33, 51);
    }

    .header {
        .title {
            max-width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 0.9rem;
            margin-bottom: 4px;
        }
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

    .menu-button {
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 8px;
        height: 28px;
        width: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: 0.25s;
        color: rgba(255, 255, 255, .5);

        &:hover {
            color: #fff;
            background: rgba(255, 255, 255, .1);
        }

        &:active {
            transform: scale(1.1);
            background: rgba(255, 255, 255, .2);
        }
    }
}
</style>