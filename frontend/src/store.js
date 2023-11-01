import session from './utils/Session';
import API from "./utils/api";

import { createStore } from 'vuex';

export default () => {
    return createStore({
        state() {
            return {
                count: 0,
                authToken: session.getAuthToken(),
                isAuthorized: false,
                statuses: [],
                gotStatuses: false
            }
        },
        mutations: {
            increment(state) {
                state.count++
            },
            getStatuses(state, obj) {
                state.gotStatuses = false;
                
                API.GetStatuses(state.authToken).then(async res => {
                    state.statuses = res.data;

                    for (let i = 0; i < state.statuses.length; i++) {
                        state.statuses[i].tasks = (await API.GetTasksByStatus(state.authToken, state.statuses[i].status_en)).data;
                    }

                    state.gotStatuses = true;
                })
            },
            setAuthentication(state, obj) {
                if (obj) {
                    state.authToken = obj.token;
                    state.isAuthorized = true;
                    session.setAuthentication(obj.token, obj.user_id);
                } else {
                    state.isAuthorized = false;
                    state.authToken = null;
                    session.clear();
                }
            },
            checkToken(state, obj) {
                API.CheckToken(state.authToken).then(res => {
                    if (obj.callbackSuccess) {
                        state.isAuthorized = true;
                        obj.callbackSuccess();
                    }
                }).catch(err => {
                    if (obj.callbackError) {
                        state.isAuthorized = false;
                        obj.callbackError();
                    }
                });
            },
            logout(state, obj) {
                if (obj.callback) {
                    state.isAuthorized = false;
                    session.clear();
                    obj.callback();
                }
            }
        },
    });
}