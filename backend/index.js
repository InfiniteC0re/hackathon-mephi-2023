import fetch from "node-fetch";
import express from "express";

const app = express();

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
    next();
});

const sprintInfo = {
    speedLimit: 100,
    isStarted: false,
    totalTasks: 0,
    updateInterval: null,
    disableTimeout: null,
    days: []
};

const VIRTUAL_DAY_TO_MINUTES = 2.6;
const HOST = "http://92.51.44.167:8080";

function updateSprintInfo(headers) {
    return new Promise((resolve, reject) => {
        fetch(`${HOST}/tasks/in-progress`, { method: "GET", headers }).then(async (r) => {
            let inProgressTasks = await r.json();

            if (inProgressTasks.length == 0) {
                sprintInfo.isStarted = false;
            }

            fetch(`${HOST}/tasks/executed`, { method: "GET", headers }).then(async (r) => {
                let tasks = await r.json();
    
                for (let i = 0; i < tasks.length; i++) {
                    let task = tasks[i];
                    let day = Math.ceil((new Date(task.executed_ts) - new Date(task.in_progress_ts)) / (1000 * 60 * 60) / 24) - 1;
    
                    if (!sprintInfo.days[day]) {
                        sprintInfo.days[day] = [];
                    }
    
                    if (!sprintInfo.days[day].find(x => x.id == task.id)) {
                        sprintInfo.days[day].push(task);
                    }
                }
    
                resolve();
            }).catch(reject);
        }).catch(reject);
    });
}

function generateResults() {
    return {
        isStarted: sprintInfo.isStarted,
        totalTasks: sprintInfo.totalTasks,
        statsDays: sprintInfo.days
    };
}

function resetSprint(headers) {
    if (sprintInfo.updateInterval != null) {
        clearInterval(sprintInfo.updateInterval);
        sprintInfo.updateInterval = null;
    }

    if (sprintInfo.disableTimeout != null) {
        clearTimeout(sprintInfo.disableTimeout);
        sprintInfo.disableTimeout = null;
    }

    return new Promise((resolve, reject) => {
        fetch(`${HOST}/sprint/reset`, { method: "POST", headers }).then(async (r) => {
            sprintInfo.isStarted = false;
            resolve();
        }).catch((err) => {
            reject();
        });
    });
}

app.get("/sprint/status", (req, res) => {
    res.send({ started: sprintInfo.isStarted });
});

app.post("/sprint/start", (req, res) => {
    const headers = {
        Authorization: req.headers.authorization
    };

    resetSprint(headers).then(() => {
        sprintInfo.days = [];
        for (let i = 0; i < 14; i++) {
            sprintInfo.days[i] = [];
        }

        fetch(`${HOST}/sprint/start`, { method: "POST", headers })
            .then(async (r) => {
                setTimeout(() => {
                    fetch(`${HOST}/tasks`, { method: "GET", headers })
                        .then(async (r) => {
                            let allTasks = await r.json();
                            let allPlannedTasks = allTasks.filter(x => x.status.status_en == "in-progress" || x.status.status_en == "assigned" || x.status.status_en == "planned");

                            sprintInfo.isStarted = true;
                            sprintInfo.totalTasks = allPlannedTasks.length;

                            sprintInfo.updateInterval = setInterval(() => updateSprintInfo(headers), 4000);
                            sprintInfo.setTimeout = setTimeout(() => {
                                clearInterval(sprintInfo.updateInterval);
                                sprintInfo.updateInterval = null;
                                sprintInfo.setTimeout = null;
                                sprintInfo.isStarted = false;
                            }, 14 * VIRTUAL_DAY_TO_MINUTES * 60 * 1000);

                            res.send(allPlannedTasks);
                        }).catch((err) => {
                            res.send("error");
                        });
                }, 500);
            }).catch((err) => {
                res.send("error");
            });
    });
});

app.post("/sprint/reset", (req, res) => {
    const headers = {
        Authorization: req.headers.authorization
    };

    resetSprint(headers).then(() => {
        res.send("ok");
    }).catch(() => {
        res.send("error");
    });
});

app.post("/sprint/fast-forward", (req, res) => {
    const headers = {
        Authorization: req.headers.authorization
    };

    resetSprint(headers).then(() => {
        sprintInfo.days = [];
        for (let i = 0; i < 14; i++) {
            sprintInfo.days[i] = [];
        }

        setTimeout(() => {
            fetch(`${HOST}/tasks`, { method: "GET", headers }).then(async (r) => {
                let allTasks = await r.json();
                let allPlannedTasks = allTasks.filter(x => x.status.status_en == "in-progress" || x.status.status_en == "assigned" || x.status.status_en == "planned");

                sprintInfo.isStarted = true;
                sprintInfo.totalTasks = allPlannedTasks.length;

                fetch(`${HOST}/sprint/fast-forward`, { method: "POST", headers }).then(async (r) => {
                    sprintInfo.isStarted = false;

                    setTimeout(() => {
                        updateSprintInfo(headers).then(() => {
                            res.send(generateResults());
                        })
                    }, 500);
                }).catch((err) => {
                    res.send("error");
                });

            }).catch((err) => {
                res.send("error");
            });
        }, 500);
    }).catch(() => {
        res.send("error");
    })
});

app.get("/sprint/results", (req, res) => {
    res.send(generateResults());
})

app.get("/team/speed", (req, res) => {
    res.send({ speed: sprintInfo.speedLimit });
});

app.listen(8080, () => {
    console.log(`Server has been started!`);
});