<template>
    <div class="login-container">
        <div class="login-nav"><img class="login-nav-logo" src="@/assets/logo.svg"></div>
        <div class="login">
            <div class="login-title">Вход в аккаунт</div>
            <div class="fields">
                <div class="field">
                    <label for="login">Имя</label>
                    <input v-if="director" name="login" placeholder="Director">
                    <input v-else name="login" placeholder="Operator">
                </div>
                <div class="field">
                    <label for="password">Пароль</label>
                    <input name="passsword" placeholder="*************">
                </div>
            </div>
            <router-link v-if="director" class="login-button" to="/director">Вход</router-link>
            <router-link v-else class="login-button" to="/operator">Вход</router-link>
            <div v-if="director" @click="changeLoginType" class="change-login-type">Вход для оператора</div>
            <div v-else @click="changeLoginType" class="change-login-type">Вход для директора</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            director: true
        }
    },
    methods: {
        changeLoginType(){
            this.director = !this.director
        }
    }
}
</script>
<style scoped>
    .login-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', sans-serif;
    }
    .login-nav {
        width: 100%;
        height: 60px;
        background-color: rgba(236, 236, 236, 0.3);
        display: flex;
    }
    .login-nav-logo {
        margin: 0 auto;
    }
    .login {
        width: 460px;
        height: 360px;
        margin: 0 auto;
        margin-top: 80px;
        border: 1px solid #000000;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
    }
    .login-title {
        margin: 0 auto;
        margin-top: 30px;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
    }
    .fields {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }
    .field {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }
    label {
        margin-left: 30px;
        margin-bottom: 15px;
        font-size: 14px;
        line-height: 16px;
    }
    input {
        width: 370px;
        max-width: 400px;
        height: 40px;
        background-color: #FAFAFA;
        border: 1px solid #000000;
        border-radius: 8px;

        font-size: 12px;
        line-height: 40px;
        padding-left: 30px;
    }
    .login-button {
        width: 120px;
        height: 40px;
        margin: 0 auto;
        margin-top: 30px;
        background-color: #FDBF5A;
        color: #020202;
        border: 1px solid #000000;
        border-radius: 8px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        transition: color 0.2s ease-in-out;
    }
    .login-button:hover {
        color: #6B6565;
    }
    .change-login-type {
        width: 114px;
        height: 14px;
        margin-right: 30px;
        margin-left: auto;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
        padding-bottom: 1px;
        border-bottom: 1px solid #000000;
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
</style>