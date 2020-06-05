<template>
    <div class="driver-container">
        <img src="@/assets/user-icon.svg" alt class="driver-icon" />
        <div class="driver-info">
            <div class="driver-name">{{ this.driverInfo.name }}</div>
            <div class="driver-details">
                <div class="driver-id">№ {{ this.driverInfo.driver_id }}</div>
                <div class="driver-phone">{{ this.driverInfo.mobile_phone }}</div>
            </div>
        </div>
        <div class="driver-settings">
            <img src="@/assets/status-changer-icon.svg" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        driverInfo: Object
    }
};
</script>

<style scoped>
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
</style>