<template>
    <div class="header-container">
        <img class="logo" src="@/assets/logo.svg" />
        <div class="user-container">
            <div class="director">
                <img class="director-icon" src="@/assets/user-icon.svg" />
                <div class="director-name">Director</div>
            </div>
            <div class="wallet">-150 000Р</div>
            <img class="logout" src="@/assets/logout-icon.svg" />
        </div>
    </div>
</template>


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

.director {
    height: 100%;
    margin-right: 120px;
}
.director-name {
    margin-left: 8px;

    font-size: 12px;
}

.wallet {
    font-size: 14px;
    margin-right: 70px;
}
.logout {
    width: 14px;
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
    .director {
        margin-right: 87px;
    }
    .director-name {
        margin-left: 5px;
        font-size: 10px;
    }
    .wallet {
        font-size: 12px;
        margin-right: 48px;
    }
}
@media only screen and (min-width: 1920px) {
    .header-container {
        height: 80px;
        line-height: 80px;
    }
    .logo {
        margin-left: 70px;
        width: 50px;
    }
    .user-container {
        margin-right: 50px;
    }
    .director {
        margin-right: 150px;
    }
    .director-icon {
        width: 25px;
    }
    .director-name {
        font-size: 18px;
        margin-left: 10px;
    }
    .wallet {
        font-size: 20px;
        margin-right: 80px;
    }
    .logout {
        width: 22px;
    }
}
</style>