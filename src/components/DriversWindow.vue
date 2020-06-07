<template>
    <div class="whole-container">
        <div class="container-manage">
            <div class="controls">
                <div class="control filters">
                    <div class="control-name">Водитель</div>
                    <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                </div>
                <div class="control currents">
                    <div class="control-name">Группа 1</div>
                    <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                </div>
                <div class="separator"></div>
            </div>
            <simplebar class="scrollable-drivers" data-simplebar-auto-hide="false" ref="scroll">
                <Driver v-for="driver in drivers" :key="driver.driver_id" :driverInfo="driver" />
                <!--<OrderMin
                    v-for="order in orders"
                    :key="order.id"
                    :orderInfo="order"
                    @change-status="toggleSettings"
                />-->
                <div class="blank-separator"></div>
            </simplebar>
            <div class="operations">
                <div class="operations-buttons">
                    <div
                        class="operations-button all-drivers"
                        @click="toggleCreateDriver(true)"
                    >+ Водитель</div>
                    <div class="operations-button photo">Фотоосмотр</div>
                </div>
                <div class="driver-counter">{{ this.drivers.length }}/100</div>
            </div>
        </div>
        <StatusSettings
            v-if="this.settings"
            class="status-settings"
            @close-settings="updateStatus"
        />
        <CreateDriver v-if="showCreateDriver" @close-create-driver="toggleCreateDriver(false)" />
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

import Driver from "./Driver.vue";
import StatusSettings from "./StatusSettings.vue";
import CreateDriver from "./CreateDriver.vue";

export default {
    components: {
        simplebar,
        Driver,
        StatusSettings,
        CreateDriver
    },
    data() {
        return {
            drivers: [
                {
                    driver_id: 1,
                    name: "DRIVER_NAME1",
                    balance: 100.0,
                    birthday: "01.01.1980",
                    car_id: 1,
                    license: "1234567890",
                    home_phone: "123456",
                    mobile_phone: "+79123456788",
                    is_locked: false,
                    is_dismissed: false,
                    order_params: [3, 4],
                    phones: [
                        {
                            phone: "79999999999",
                            is_default: true,
                            use_for_call: true
                        },
                        {
                            phone: "79999999999",
                            is_default: false,
                            use_for_call: true
                        }
                    ],
                    term_account: "00008"
                },
                {
                    driver_id: 2,
                    name: "DRIVER_NAME2",
                    balance: -50.0,
                    birthday: "01.01.1980",
                    car_id: 2,
                    license: "1234567899",
                    home_phone: "123457",
                    mobile_phone: "+79123456789",
                    is_locked: true,
                    is_dismissed: true,
                    order_params: [5, 6],
                    phones: [
                        {
                            phone: "79999999999",
                            is_default: true,
                            use_for_call: true
                        },
                        {
                            phone: "79999999999",
                            is_default: false,
                            use_for_call: false
                        }
                    ],
                    term_account: "00009"
                }
            ],
            settings: false,
            showCreateDriver: false,
            driverIdWaitingForChange: null
        };
    },
    methods: {
        toggleSettings(orderId) {
            if (this.orderIdWaitingForChange === orderId) {
                this.settings = false;
                this.orderIdWaitingForChange = null;
            } else {
                this.orderIdWaitingForChange = orderId;
                this.settings = true;
            }
        },
        toggleCreateDriver(value) {
            if (this.showCreateDriver === value) return;
            this.showCreateDriver = value;
        },
        updateStatus(status) {
            this.orders[this.orderIdWaitingForChange - 1].status = status;
            this.settings = false;
            this.orderIdWaitingForChange = null;
        },
        handleScroll() {
            console.log("scroll");
        }
    }
};
</script>

<style scoped>
.whole-container {
    max-width: calc(15px + 27vw);
    width: calc(15px + 27vw);
    min-width: 300px;
    position: relative;
}
.container-manage {
    background-color: #fafafa;

    display: flex;
    flex-direction: column;

    max-width: calc(15px + 27vw);
    min-width: 300px;
    min-height: 215px;
    height: 80vh;
    max-height: 80vh;
    border-radius: 8px;

    resize: vertical;
    overflow-y: auto;
    position: relative;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
}
.controls {
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;

    border-radius: 8px 8px 0 0;

    position: relative;
}
.separator {
    position: absolute;
    width: 2px;
    height: 70%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fdbf5a;
}
.control {
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 45px;
    font-size: 14px;
    position: relative;
    background-color: #e5e5e5;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
}
.control:hover {
    background-color: #d8d8d8;
}
.dropdown-icon {
    height: 4px;

    position: absolute;
    top: 21px;
    right: 10%;
}

.scrollable-drivers {
    width: 100%;
    height: calc(100% - 125px);
    max-height: calc(100% - 125px);
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    z-index: 10;
}
.orders {
    width: 100%;
    height: auto;
    overflow: hidden;
    /*padding-bottom: 95px;*/

    background-color: #fafafa;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
}
.blank-separator {
    width: 100%;
    height: 10px;
    background-color: #fafafa;
}
.operations {
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0px;
    background-color: #e5e5e5;

    display: flex;
    flex-direction: column;
}
.operations-buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.operations-button {
    font-size: 12px;
    width: 38%;
    height: 35px;
    border-radius: 5px;

    line-height: 35px;
    text-align: center;

    margin-top: 14px;

    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);

    cursor: pointer;

    transition: color 0.2s ease-in-out;
}
.operations-button:hover {
    color: #6b6565;
}

.all-drivers {
    background-color: #fdbf5a;
}
.photo {
    background-color: #f4f4f4;
    transition: background-color 0.2s ease-in-out;
}
.photo:hover {
    background-color: #fafafa;
}
.driver-counter {
    margin: 0 auto;
    margin-top: 8px;
    font-size: 12px;
}

.status-settings {
    position: absolute;
    z-index: 2;

    top: 45px;
    left: calc(100% - 13px);
}
</style>