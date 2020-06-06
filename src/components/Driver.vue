<template>
    <div class="driver-full-container">
        <div class="driver-container">
            <img src="@/assets/user-icon.svg" alt class="driver-icon" />
            <div class="driver-info">
                <div class="driver-name">{{ this.driverInfo.name }}</div>
                <div class="driver-details">
                    <div class="driver-id">№{{ this.driverInfo.driver_id }}</div>
                    <div class="driver-phone">{{ this.driverInfo.mobile_phone }}</div>
                </div>
            </div>
            <div class="driver-settings" @click="toggleSettings">
                <img src="@/assets/status-changer-icon.svg" />
            </div>
        </div>
        <div
            v-if="this.settings"
            class="settings-block"
            :style="this.delete ? { 'background-color': '#fdbf5a' } : { 'background-color': '#ececec' }"
        >
            <div v-if="this.delete" class="delete-popup">
                <div class="delete-confirm">Удалить водителя №{{ this.driverInfo.driver_id }}?</div>
                <div class="delete-options">
                    <div class="setting-button option" @click="toggleDelete">Отмена</div>
                    <div class="setting-button option confirm">Да</div>
                </div>
            </div>
            <div v-else class="settings-lite">
                <div class="setting-button">Изменить</div>
                <div class="setting-button" @click="toggleDelete">Удалить</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        driverInfo: Object
    },
    data() {
        return {
            settings: false,
            delete: false
        };
    },
    methods: {
        toggleSettings() {
            this.settings = !this.settings;
            this.delete = false;
        },
        toggleDelete() {
            this.delete = !this.delete;
        }
    }
};
</script>

<style scoped>
.driver-full-container {
    display: flex;
    flex-direction: column;
}
.driver-container {
    width: calc(100% - 20px);
    height: 60px;
    margin-left: 5px;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    transition: background-color 0.3s ease-in-out;
    background-color: #fafafa;
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
}
.driver-icon {
    margin-left: 20px;
    min-height: 25px;
}
.driver-info {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    width: calc(100% - 20px);
}
.driver-name {
    font-size: 14px;
    line-height: 14px;
}
.driver-details {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    font-size: 12px;
    line-height: 12px;
    width: 85%;
    justify-content: space-between;
}
.driver-settings {
    position: absolute;
    top: 8px;
    right: 10px;
    cursor: pointer;
}
.settings-block {
    width: calc(100% - 20px);
    height: 30px;
    margin-left: 5px;
    margin-bottom: 1px;
    border-radius: 0 0 5px 5px;
    transition: background-color 0.2s ease-in-out;
}
.settings-block > * {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
}
.setting-button {
    width: 70px;
    height: 20px;
    margin-top: 5px;
    font-size: 13px;
    text-align: center;
    line-height: 20px;
    color: black;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
}
.setting-button:hover {
    background-color: #f4f4f4;
}
.delete-popup {
    font-size: 13px;
    line-height: 20px;
}
.delete-confirm {
    margin-top: 5px;
}
.delete-options {
    display: flex;
    flex-direction: row;
    width: 25%;
    justify-content: space-between;
}
.option {
    width: 50px;
    transition: color 0.2s ease-in-out;
}
.confirm {
    width: 15px;
}
.option:hover {
    background-color: transparent;
    color: #6b6565;
}
</style>