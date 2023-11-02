import session from './utils/Session';
import API from "./utils/api";

import { createStore } from 'vuex';

function updateTasks(state, obj) {
    return new Promise((resolve, reject) => {
        API.GetTasks(state.authToken).then(async res => {
            state.tasks = res.data;

            API.GetSprintStatus().then((res) => {
                state.sprintStarted = res.data.started;
    
                API.GetSprintResults().then((res) => {
                    state.sprintResults = res.data;
                    resolve();
                    console.log(state.sprintStarted, state.sprintResults);
                });
            });
        })
    });
}

function fetchTasks(state, obj) {
    state.gotStatuses = false;

    API.GetStatuses(state.authToken).then(async res => {
        state.statuses = res.data;
        await updateTasks(state, obj);
        state.teamSpeed = (await API.GetTeamSpeed()).data.speed;
        state.gotStatuses = true;
    })
}

export default () => {
    return createStore({
        state() {
            return {
                authToken: session.getAuthToken(),
                isAuthorized: false,
                teamSpeed: 100,
                statuses: [],
                tasks: [],
                personal: [],
                priorities: [],
                gotStatuses: false,
                sprintStarted: false,
                sprintResults: {},
                sprintOverlay: false,
                overlay: {}
            }
        },
        mutations: {
            updateSeamlessly(state, obj) {
                updateTasks(state, obj);
            },
            getStatuses(state, obj) {
                fetchTasks(state, obj);
            },
            getPriorities(state, obj) {
                API.GetPriorities(state.authToken).then((res) => {
                    state.priorities = res.data;
                });
            },
            getPersonal(state, obj) {
                API.GetPersonal(state.authToken).then((res) => {
                    state.personal = res.data;
                });
            },
            createTask(state, obj) {
                API.CreateTask(state.authToken, obj.title, obj.description, obj.size, obj.priority).then((res) => {
                    fetchTasks(state, obj);
                });
            },
            planTask(state, obj) {
                API.PlanTask(state.authToken, obj.id).then((res) => {
                    fetchTasks(state, obj);
                });
            },
            taskAssign(state, obj) {
                API.TaskAssign(state.authToken, obj.personal, obj.task).then((res) => {
                    fetchTasks(state, obj);
                });
            },
            deleteTask(state, obj) {
                API.DeleteTask(state.authToken, obj.id).then((res) => {
                    fetchTasks(state, obj);
                });
            },
            startSprint(state, obj) {
                API.StartSprint(state.authToken).then((res) => {
                    fetchTasks(state, obj);
                });
            },
            resetSprint(state, obj) {
                API.ResetSprint(state.authToken).then((res) => {
                    fetchTasks(state, obj);
                });
            },
            fastForwardSprint(state, obj) {
                API.FastForwardSprint(state.authToken).then((res) => {
                    fetchTasks(state, obj);
                });
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
                API.Logout(state.authToken).then(res => {
                    if (obj.callback) {
                        state.isAuthorized = false;
                        state.gotStatuses = false;
                        state.statuses = [];
                        state.tasks = [];
                        session.clear();
                        obj.callback();
                    }
                });
            },
            openOverlay(state, obj) {
                state.overlay = obj;
                state.overlay.visible = true;
            }
        },
    });
}