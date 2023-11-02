const BASE_ADDRESS1 = "http://92.51.44.167:8080";
const BASE_ADDRESS2 = "http://localhost:8080"; 

export default {
    API1: {
        TEST: () => BASE_ADDRESS1 + "/test",
        LOGOUT: () => BASE_ADDRESS1 + "/api/token/logout",
        TOKEN: () => BASE_ADDRESS1 + "/api/token",
        TOKEN_CHECK: () => BASE_ADDRESS1 + "/api/token/check",
        TASK_ASSIGN: () => BASE_ADDRESS1 + "/task/assign",
        TASK_CREATE: () => BASE_ADDRESS1 + "/task/create",
        TASK_DELETE: () => BASE_ADDRESS1 + "/task/delete",
        TASK_PLAN: () => BASE_ADDRESS1 + "/task/plan",
        SPRINT_STATUS: () => BASE_ADDRESS2 + "/sprint/status",
        SPRINT_RESULTS: () => BASE_ADDRESS2 + "/sprint/results",
        SPRINT_START: () => BASE_ADDRESS2 + "/sprint/start",
        SPRINT_RESET: () => BASE_ADDRESS2 + "/sprint/reset",
        SPRINT_FAST_FORWARD: () => BASE_ADDRESS2 + "/sprint/fast-forward",
        TASKS: () => BASE_ADDRESS1 + "/tasks",
        TASKS_STATUS: (status) => BASE_ADDRESS1 + "/tasks/" + status,
        STATUSES: () => BASE_ADDRESS1 + "/statuses",
        PERSONAL: () => BASE_ADDRESS1 + "/personal",
        PRIORITIES: () => BASE_ADDRESS1 + "/priorities",
    }
}
