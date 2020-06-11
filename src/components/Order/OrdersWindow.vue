<template>
    <div class="whole-container">
        <div class="container-manage">
            <div class="controls">
                <div class="control filters">
                    <div class="control-name">Фильтры</div>
                    <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                </div>
                <div class="control currents">
                    <div class="control-name">Текущие</div>
                    <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                </div>
                <div class="separator"></div>
            </div>
            <simplebar class="scrollable-orders" data-simplebar-auto-hide="false">
                <OrderMin
                    v-for="order in orders"
                    :key="order.id"
                    :orderInfo="order"
                    @change-status="toggleSettings"
                />
                <div class="blank-separator"></div>
            </simplebar>
            <div class="operations">
                <div class="operations-buttons">
                    <div
                        class="operations-button add-order"
                        @click="toggleCreateOrder(true)"
                    >+ &nbsp; &nbsp; Заказ</div>
                    <div class="operations-button refresh">Обновить</div>
                </div>
                <div class="order-counter">{{ this.orders.length }}/100</div>
            </div>
        </div>
        <StatusSettings
            v-if="this.settings"
            class="status-settings"
            @close-settings="updateStatus"
        />
        <CreateOrder
            v-if="this.showCreateOrder"
            @close-create-order="toggleCreateOrder(false)"
            @create-order="createOrder"
        />
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import OrderMin from "./OrderMin.vue";
import StatusSettings from "../StatusSettings.vue";
import CreateOrder from "./CreateOrder.vue";

export default {
    components: {
        simplebar,
        OrderMin,
        StatusSettings,
        CreateOrder
    },
    computed: {
        orders() {
            return this.$store.state.orders;
        }
    },
    data() {
        return {
            numberOfOrders: 0,
            settings: false,
            showCreateOrder: false,
            orderIdWaitingForChange: null
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
        toggleCreateOrder(value) {
            if (value === this.createOrder) return;
            this.showCreateOrder = value;
        },
        updateStatus(status_id) {
            this.$store.dispatch("updateStatus", {
                order_id: this.orderIdWaitingForChange,
                status_id
            });
            this.settings = false;
            this.orderIdWaitingForChange = null;
        },
        createOrder($event) {
            this.$store.dispatch("createOrder", $event);
            this.showCreateOrder = false;
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
/*.control {
    width: 50%;
    height: 100%;

    text-align: center;
    line-height: 45px;
    font-size: 14px;
    position: relative;
    background-color: #ececec;
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
}*/
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
.orders-container {
    width: 100%;
    height: calc(100% - 125px);
    max-height: calc(100% - 135px);
    overflow-y: scroll;
}
.scrollable-orders {
    width: 100%;
    height: calc(100% - 125px);
    max-height: calc(100% - 125px);
    overflow-y: scroll;
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
    background-color: #ececec;

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

.add-order {
    background-color: #fdbf5a;
}
.refresh {
    background-color: #f4f4f4;
    transition: background-color 0.2s ease-in-out;
}
.refresh:hover {
    background-color: #fafafa;
}
.order-counter {
    margin: 0 auto;
    margin-top: 8px;
    font-size: 12px;
}

.status-settings {
    position: absolute;
    z-index: 2;
}

.add-order {
    background-color: #fdbf5a;
}
.refresh {
    background-color: #f4f4f4;
    transition: background-color 0.2s ease-in-out;
}
.refresh:hover {
    background-color: #fafafa;
}
.order-counter {
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