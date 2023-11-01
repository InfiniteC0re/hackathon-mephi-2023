<template>
    <div class="view-wrap">
        <form class="auth-form" v-on:submit.prevent>
            <h1>Авторизация</h1>
            <input placeholder="Логин" v-model="login" type="text">
            <input placeholder="Пароль" v-model="password" type="password">
            <button @click="submitForm" :disabled="isLoginButtonDisabled">Войти</button>
            <span class="error">{{ error }}</span>
        </form>

        <!-- Кнопки для быстрого ввода логинов/паролей -->
        <div class="cheats">
            <button @click="fillCredentials('Team 5.0', '0U1gjAk4IG')">Team 5.0</button>
            <button @click="fillCredentials('Team 5.1', '0U1gjAk4IG')">Team 5.1</button>
            <button @click="fillCredentials('Team 5.2', '0U1gjAk4IG')">Team 5.2</button>
            <button @click="fillCredentials('Team 5.3', '0U1gjAk4IG')">Team 5.3</button>
            <button @click="fillCredentials('Team 5.4', '0U1gjAk4IG')">Team 5.4</button>
        </div>
    </div>
</template>

<script>
import API from "../utils/api"

export default {
    data() {
        return {
            login: "",
            password: "",
            error: ""
        }
    },
    computed: {
        isLoginButtonDisabled() {
            return this.login == "" || this.password == "";
        }
    },
    methods: {
        fillCredentials(login, password) {
            this.login = login;
            this.password = password;
        },
        submitForm() {
            API.CreateToken(this.login, this.password).then(res => {
                this.$store.commit('setAuthentication', res.data);
                this.$router.push("/");
            }).catch(err => {
                if (err.response.data.non_field_errors) {
                    this.error = err.response.data.non_field_errors[0];
                }

                this.$store.commit('setAuthentication', null);
            })
        }
    },
    mounted() {
        if (this.$store.state.authToken) {
            this.$store.commit('checkToken', {
                callbackSuccess: () => {
                    this.$router.push("/");
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.view-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .auth-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 50%;
        max-width: 400px;

        h1 {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 8px;
        }

        input {
            outline: none;
            border: 0;
            padding: 10px;
            font-weight: bold;
            border-radius: 4px;
            // height: 20px;
        }

        .error {
            color: rgb(243, 16, 65);
            font-weight: bold;
        }
    }

    .cheats {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        margin-left: 24px;
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, .15);
        border-radius: 8px;
    }
}
</style>