import ENDPOINTS from "./endpoints";
import axios from "axios";

async function _makeRequestGET(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(resolve).catch(reject);
    });
}

async function _makeRequestPOST(url, data, headers) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, { headers }).then(resolve).catch(reject);
    });
}

async function _requestGET(url) {
    return new Promise((resolve, reject) => {
        _makeRequestGET(url).then(resolve).catch(reject);
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
    CheckToken: async (token) => await _requestPOST(ENDPOINTS.API1.TOKEN_CHECK(), null, _generateAuthHeaders(token)),
}