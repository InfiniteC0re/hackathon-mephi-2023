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
    CreateTask: async (token, title, description) => await _requestPOST(ENDPOINTS.API1.TASK_CREATE(), { title, description }, _generateAuthHeaders(token)),
    DeleteTask: async (token, id) => await _requestPOST(ENDPOINTS.API1.TASK_DELETE(), { id }, _generateAuthHeaders(token)),
    CheckToken: async (token) => await _requestPOST(ENDPOINTS.API1.TOKEN_CHECK(), null, _generateAuthHeaders(token)),
    GetTasksByStatus: async (token, status) => await _requestGET(ENDPOINTS.API1.TASKS_STATUS(status), _generateAuthHeaders(token)),
    GetStatuses: async (token) => await _requestGET(ENDPOINTS.API1.STATUSES(), _generateAuthHeaders(token)),
    GetTasks: async (token) => await _requestGET(ENDPOINTS.API1.TASKS(), _generateAuthHeaders(token)),
    Logout: async (token) => await _requestPOST(ENDPOINTS.API1.LOGOUT(), null, _generateAuthHeaders(token)),
}