<template>
    <div class="view-wrap">
        <form class="auth-form" v-on:submit.prevent>
            <h1>Авторизация</h1>
            <div class="input-wrap">
                <p>Логин</p>
                <input placeholder="Логин" v-model="login" type="text">
            </div>
            <div class="input-wrap">
                <p>Пароль</p>
                <input placeholder="Пароль" v-model="password" type="password">
            </div>
            <button @click="submitForm" :disabled="isLoginButtonDisabled">Войти</button>
            <span class="error">{{ error }}</span>
        </form>
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
        if (this.$store.state.isAuthorized) {
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss" scoped>
.view-wrap {
    display: flex;
    flex-direction: column;
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

        .input-wrap {
            position: relative;
            display: flex;
            flex-direction: column;

            p {
                line-height: 28px;
                text-align: left;
                font-weight: 100;
                opacity: 0.8;
            }

            input {
                outline: none;
                border: 0;
                padding: 10px;
                font-weight: bold;
                font-size: 1rem;
                border-radius: 4px;
                background: var(--button-color);
                border: 1px solid rgba(255, 255, 255, .12);
                transition: border-color 0.25s;
                opacity: 1.0;

                &:focus {
                    border-color: var(--button-active-color);
                }
            }
        }

        .error {
            color: rgb(243, 16, 65);
            font-weight: bold;
        }
    }

    .quick-login {
        display: flex;
        margin-top: 12px;
        gap: 8px;
        padding: 8px;
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, .15);
        border-radius: 8px;
    }
}
</style>