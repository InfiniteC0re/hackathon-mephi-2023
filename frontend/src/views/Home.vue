<template>
    <div class="cards-wrap" v-if="gotStatuses">
        <TasksCard v-for="status in statuses"
            :canAssignPersonal="status.status_en == 'planned'"
            :canAddNew="status.status_en == 'created'"
            :canDelete="status.status_en != 'executed'"
            :caption="status.status_ru"
            :highlight="(status.status_en == 'planned' || status.status_en == 'assigned') && usedSize > maxSize"
            :filter="(task) => task.status.id == status.id"
        />
    </div>
    <div class="loading-wrap" v-else>
        <LoadingIndicator />
    </div>
</template>

<script>
import LoadingIndicator from '../components/LoadingIndicator.vue';
import TasksCard from '../components/TasksCard.vue';

export default {
    components: {
        LoadingIndicator,
        TasksCard
    },
    computed: {
        statuses() {
            return this.$store.state.statuses;
        },
        gotStatuses() {
            return this.$store.state.gotStatuses;
        },
        inProgressTasks() {
            return this.$store.state.tasks.filter(x => x.status.status_en == "planned" || x.status.status_en == "assigned");
        },
        usedSize() {
            return this.inProgressTasks.reduce((sum, val) => sum + val.supposed_size, 0);
        },
        maxSize() {
            return 100;
        },
    },
    mounted() {
        let redirectToLogin = !this.$store.state.authToken;

        if (!redirectToLogin) {
            this.$store.commit('checkToken', {
                callbackError: () => {
                    this.$router.push("/login");
                },
                callbackSuccess: () => {
                    this.$store.commit('getStatuses');
                    this.$store.commit('getPersonal');
                    this.$store.commit('getPriorities');
                }
            });
        } else {
            this.$router.push("/login");
        }
    }
}

</script>

<style lang="scss" scoped>
.cards-wrap {
    display: flex;
    gap: 8px;
    max-height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    margin: 16px;
    padding-bottom: 8px;
    height: 100%;
}
</style>