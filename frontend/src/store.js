import session from './utils/Session';
import API from "./utils/api";

import { createStore } from 'vuex';

export default () => {
    return createStore({
        state() {
            return {
                count: 0,
                authToken: session.getAuthToken(),
                isAuthorized: false
            }
        },
        mutations: {
            increment(state) {
                state.count++
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