const BASE_ADDRESS1 = "http://92.51.44.167:8080";
const BASE_ADDRESS2 = "http://hackathon.hlsr.tk:8000"; // TODO: replace ip before deploying

export default {
    API1: {
        TEST: () => BASE_ADDRESS1 + "/test",
        TOKEN: () => BASE_ADDRESS1 + "/api/token",
        TOKEN_CHECK: () => BASE_ADDRESS1 + "/api/token/check",
        TASK: () => BASE_ADDRESS1 + "/tasks"
    },
    API2: {
        
    }
}
