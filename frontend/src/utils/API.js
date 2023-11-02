import ENDPOINTS from "./endpoints";
import axios from "axios";

async function _makeRequestGET(url, headers) {
    return new Promise((resolve, reject) => {
        axios.get(url, { headers }).then(resolve).catch(reject);
    });
}

async function _makeRequestPOST(url, data, headers) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, { headers }).then(resolve).catch(reject);
    });
}

async function _requestGET(url, headers = {}) {
    return new Promise((resolve, reject) => {
        _makeRequestGET(url, headers).then(resolve).catch(reject);
    });
}

async function _requestPOST(url, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        _makeRequestPOST(url, data, headers).then(resolve).catch(reject);
    });
}

function _generateAuthHeaders(token) {
    return { Authorization: `Token ${token}` };
}

export default {
    GetTest: async () => await _requestGET(ENDPOINTS.API1.TEST()),
    PostTest: async () => await _requestPOST(ENDPOINTS.API1.TEST()),
    CreateToken: async (username, password) => await _requestPOST(ENDPOINTS.API1.TOKEN(), { username, password }),
    GetSprintStatus: async () => await _requestGET(ENDPOINTS.API1.SPRINT_STATUS()),
    GetSprintResults: async () => await _requestGET(ENDPOINTS.API1.SPRINT_RESULTS()),
    StartSprint: async (token) => await _requestPOST(ENDPOINTS.API1.SPRINT_START(), null, _generateAuthHeaders(token)),
    ResetSprint: async (token) => await _requestPOST(ENDPOINTS.API1.SPRINT_RESET(), null, _generateAuthHeaders(token)),
    FastForwardSprint: async (token) => await _requestPOST(ENDPOINTS.API1.SPRINT_FAST_FORWARD(), null, _generateAuthHeaders(token)),
    CreateTask: async (token, title, description, supposed_size, priority) => await _requestPOST(ENDPOINTS.API1.TASK_CREATE(), { title, description, supposed_size, priority }, _generateAuthHeaders(token)),
    DeleteTask: async (token, id) => await _requestPOST(ENDPOINTS.API1.TASK_DELETE(), { id }, _generateAuthHeaders(token)),
    PlanTask: async (token, id) => await _requestPOST(ENDPOINTS.API1.TASK_PLAN(), { id }, _generateAuthHeaders(token)),
    TaskAssign: async (token, personal_id, task_id) => await _requestPOST(ENDPOINTS.API1.TASK_ASSIGN(), { personal_id, task_id }, _generateAuthHeaders(token)),
    CheckToken: async (token) => await _requestPOST(ENDPOINTS.API1.TOKEN_CHECK(), null, _generateAuthHeaders(token)),
    GetTasksByStatus: async (token, status) => await _requestGET(ENDPOINTS.API1.TASKS_STATUS(status), _generateAuthHeaders(token)),
    GetStatuses: async (token) => await _requestGET(ENDPOINTS.API1.STATUSES(), _generateAuthHeaders(token)),
    GetTasks: async (token) => await _requestGET(ENDPOINTS.API1.TASKS(), _generateAuthHeaders(token)),
    GetPriorities: async (token) => await _requestGET(ENDPOINTS.API1.PRIORITIES(), _generateAuthHeaders(token)),
    GetPersonal: async (token) => await _requestGET(ENDPOINTS.API1.PERSONAL(), _generateAuthHeaders(token)),
    GetTeamSpeed: async () => await _requestGET(ENDPOINTS.API1.TEAM_SPEED()),
    Logout: async (token) => await _requestPOST(ENDPOINTS.API1.LOGOUT(), null, _generateAuthHeaders(token)),
}