<template>
    <div class="order-container">
        <div class="status-line"></div>
        <div class="order-manage-block">
            <div class="order-info">
                <div class="number-status">
                    <div class="order-number"> &#8470;{{ orderInfo.number }}</div>
                    <div class="order-status"> {{ orderInfo.status }}</div>
                </div>
                <div class="origin">{{ orderInfo.origin }}<img class="path-icon" src="@/assets/path-icon.svg"></div>
                <div class="destination">{{ orderInfo.destination }}</div>
                <div class="details">
                    <div class="order-time">
                        <img class="time-icon" src="@/assets/time-icon.svg">
                        <div>{{ orderInfo.timestamp }}</div>
                    </div>
                    <div class="order-date">{{ orderInfo.date }}</div>
                    <div class="driver">
                        <div class="driver-number">&#8470;{{ orderInfo.driverNumber }}</div>
                        <div class="driver-name">{{ orderInfo.driverName }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="changeStatus" class="status-changer"><img src="@/assets/status-changer-icon.svg"></div>
        <div class="pinpoint"><img src="@/assets/pinpoint-icon.svg"></div>
    </div>
</template>

<script>
export default {
    props: {
        orderInfo: Object
    },
    methods: {
        changeStatus() {
            this.$emit('change-status', this.orderInfo.id)
        }
    }
}
</script>

<style scoped>
    .order-container {
        width: calc(100% - 20px);
        min-height: 90px;
        height: 90px;

        margin-left: 5px;
        background-color: #FAFAFA;
        box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
        transition: background-color 0.3s ease-in-out;

        display: flex;
        flex-direction: row;

        position: relative;
    }
    .order-container:hover {
        background-color: rgba(236, 236, 236, 0.75);
    }
    .status-line {
        width: 4px;
        height: 74px;
        margin-top: 8px;
        margin-left: 5px;
        margin-right: 5px;
        background-color: #219653;
    }
    .order-manage-block {
        width: calc(100% - 20px);
        height: 74px;
        margin-top: 8px;
    }
    .order-info {
        width: 92%;
        height: 74px;
    }
    .order-info * {
        font-size: 12px;
        color: #020202;
        
    }
    .number-status {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .origin {
        margin-top: 1px;
    }
    .path-icon {
        width: 25px;
        padding-bottom: 4px;
        margin-left: 12px;
    }
    .destination {
        margin-top: 1px;
    }
    .details {
        margin-top: 1px;
        display: flex;
        flex-direction: row;
    }
    .order-time {
        display: flex;
        flex-direction: row;
        margin-right: 6%;
    }
    .time-icon {
        padding-bottom: 1px;
        margin-right: 5px;
    }
    .order-date {
        margin-right: 12%;
    }
    .driver {
        display: flex;
        flex-direction: row;
    }
    .driver-number {
        margin-right: 5px;
    }
    .status-changer {
        position: absolute;
        top: 6px;
        right: 10px;
    }
    .pinpoint {
        position: absolute;
        top: 35px;
        right: 12.5px;
    }
    .status-changer:hover, .pinpoint:hover {
        cursor: pointer;
    }

</style>