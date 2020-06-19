<template>
    <div class="header-container">
        <img class="logo" src="@/assets/logo.svg" />
        <div class="user-container">
            <div class="user">
                <img class="user-icon" src="@/assets/user-icon.svg" />
                <div v-if="this.$route.name === 'director'" class="user-name">Director</div>
                <div v-else class="user-name">Operator</div>
            </div>
            <div class="wallet">-150 000Р</div>

            <img class="logout" src="@/assets/logout-icon.svg" @click="logout" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    methods: {
        logout() {
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
.header-container,
.header-container * {
    display: flex;
    flex-direction: row;
}
.header-container {
    background-color: #ececec;
    width: 100%;
    height: 55px;
    justify-content: space-between;
    line-height: 55px;
    text-align: center;
}

.logo {
    margin-left: 50px;
}

.user-container {
    margin-right: 50px;
}

.user {
    height: 100%;
    margin-right: 120px;
}
.user-name {
    margin-left: 8px;

    font-size: 12px;
}

.wallet {
    font-size: 14px;
    margin-right: 70px;
}
.logout {
    width: 14px;
    cursor: pointer;
}

@media only screen and (min-width: 451px) and (max-width: 1280px) {
    .header-container {
        height: 45px;
        line-height: 45px;
    }
    .logo {
        margin-left: 40px;
    }
    .user-container {
        margin-right: 18px;
    }
    .user {
        margin-right: 87px;
    }
    .user-name {
        margin-left: 5px;
        font-size: 10px;
    }
    .wallet {
        font-size: 12px;
        margin-right: 48px;
    }
}
</style>