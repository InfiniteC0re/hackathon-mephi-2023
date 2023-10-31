import ENDPOINTS from "./endpoints";
import axios from "axios";

async function _makeRequestGET(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(resolve).catch(reject);
    });
}

async function _makeRequestPOST(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(resolve).catch(reject);
    });
}

async function _requestGET(url) {
    return new Promise((resolve, reject) => {
        _makeRequestGET(url).then(resolve).catch(reject);
    });
}

async function _requestPOST(url, data = {}) {
    return new Promise((resolve, reject) => {
        _makeRequestPOST(url, data).then(resolve).catch(reject);
    });
}

export default {
    GetTest: async () => await _requestGET(ENDPOINTS.API1.TEST()),
    PostTest: async () => await _requestPOST(ENDPOINTS.API1.TEST())
}