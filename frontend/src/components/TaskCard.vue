<template>
    <div class="card" @click.self="menu = 0" :class="{ 'backdrop': menu }">
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
        <div class="menu-buttons">
            <div class="menu-button" @click="menu = 2" v-if="canAssign">
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="menu-button" @click="menu = 1" v-if="canDelete">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
        </div>
        <div class="menu users" v-if="menu == 2">
            <div class="list-wrap">
                <div class="selected" @click="listOpened = true">
                    <div class="text">{{ performer }}</div>
                    <div class="icon"><i class="fa-solid fa-caret-down"></i></div>
                </div>
                <div class="list" v-if="listOpened">
                    <div class="entry" v-for="(person, index) in personal" @click="() => { selectedPerformer = index; listOpened = false; }">{{ person.first_name }} {{ person.second_name }}</div>
                </div>
            </div>
            <button @click="setPerformer">ОК</button>
        </div>
        <div class="menu" v-else-if="menu == 1">
            <button @click="deleteCard">Удалить</button>
            <button @click="menu = 0">Отмена</button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        menu: 0,
        selectedPerformer: -1,
        listOpened: false
    }),
    computed: {
        performer() {
            if (this.selectedPerformer >= 0) {
                let obj = this.$store.state.personal[this.selectedPerformer];
                return `${obj.first_name} ${obj.second_name}`;
            } else {
                return "Никто";
            }
        },
        personal() {
            return this.$store.state.personal;
        }
    },
    props: {
        task: Object,
        canDelete: Boolean,
        canAssign: Boolean,
    },
    methods: {
        deleteCard() {
            this.menu = 0;
            this.$store.commit("openOverlay", {
                caption: "Удалить?",
                closeCallback: (result) => {
                    if (result == 0) {
                        this.$store.commit("deleteTask", { id: this.task.id });
                    }
                }
            });
        },
        setPerformer() {
            if (this.selectedPerformer != -1) {
                this.$store.commit("taskAssign", { personal: this.personal[this.selectedPerformer].id, task: this.task.id });
            }
            this.menu = 0;
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

    &.backdrop {
        min-height: 200px;
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

        &.users {
            flex-direction: row;
        }

        .list-wrap {
            position: relative;
            display: flex;
            width: 200px;
            height: 30px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            background: var(--button-color);
            border: 1px solid rgba(255, 255, 255, .2);
            border-radius: 8px;
            z-index: 9999;

            .selected {
                margin: 0 12px;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            .list {
                display: flex;
                flex-direction: column;
                font-size: 0.9rem;
                max-height: 100px;
                overflow: auto;
                position: absolute;
                background: rgb(18, 20, 31);
                padding: 4px 0;
                width: 100%;
                top: -1px;
                left: -1px;
                padding-right: 4px;

                .entry {
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    box-sizing: border-box;
                    background: rgb(29, 33, 51);
                    font-weight: 100;
                    transition: 0.1s;

                    &:hover {
                        letter-spacing: 0.5px;
                    }

                    &:nth-child(2n) {
                        background: rgb(36, 42, 63);
                    }
                }
            }
        }

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

    .menu-buttons {
        display: flex;
        gap: 8px;
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 8px;

        .menu-button {
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
}
</style>