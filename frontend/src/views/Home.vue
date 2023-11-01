<template>
    <div class="cards-wrap" v-if="gotStatuses">
        <TasksCard v-for="status in statuses" :caption="status.status_ru" :filter="(task) => task.status.id == status.id" />
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
        }
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