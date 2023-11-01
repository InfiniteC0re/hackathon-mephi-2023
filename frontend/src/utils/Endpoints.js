const BASE_ADDRESS1 = "http://92.51.44.167:8080";
const BASE_ADDRESS2 = "http://hackathon.hlsr.tk:8000"; // TODO: replace ip before deploying

export default {
    API1: {
        TEST: () => BASE_ADDRESS1 + "/test",
        LOGOUT: () => BASE_ADDRESS1 + "/api/token/logout",
        TOKEN: () => BASE_ADDRESS1 + "/api/token",
        TOKEN_CHECK: () => BASE_ADDRESS1 + "/api/token/check",
        TASK_CREATE: () => BASE_ADDRESS1 + "/task/create",
        TASK_DELETE: () => BASE_ADDRESS1 + "/task/delete",
        TASKS: () => BASE_ADDRESS1 + "/tasks",
        TASKS_STATUS: (status) => BASE_ADDRESS1 + "/tasks/" + status,
        STATUSES: () => BASE_ADDRESS1 + "/statuses"
    },
    API2: {
        
    }
}
