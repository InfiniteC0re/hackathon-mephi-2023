import session from './utils/Session';
import API from "./utils/api";

import { createStore } from 'vuex';

export default () => {
    return createStore({
        state() {
            return {
                count: 0,
                authToken: session.getAuthToken()
            }
        },
        mutations: {
            increment(state) {
                state.count++
            },
            setAuthentication(state, obj) {
                if (obj) {
                    state.authToken = obj.token;
                    session.setAuthentication(obj.token, obj.user_id);
                } else {
                    state.authToken = null;
                    session.clear();
                }
            },
            checkToken(state, obj) {
                API.CheckToken(state.authToken).then(res => {
                    if (obj.callbackSuccess) {
                        obj.callbackSuccess();
                    }
                }).catch(err => {
                    if (obj.callbackError) {
                        obj.callbackError();
                    }
                });
            }
        },
    });
}