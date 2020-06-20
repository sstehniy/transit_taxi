<template>
    <div class="whole-container">
        <div class="container-manage">
            <div class="controls">
                <div class="control filters" :class="{active: showFilters}">
                    <div class="control-name" @click="toggleFilters">Фильтры</div>
                    <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                    <div v-if="showFilters && !showStatus" class="filters-dropdown">
                        <div class="dropdown-field">
                            <p class="field-name">Группа</p>
                            <div class="dropdown-input extended">
                                <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                                <p
                                    class="input-current"
                                    @click="showGroups=!showGroups"
                                >{{orderGroupFilters.find(g=>g.id===selectedGroupFilterId).title}}</p>
                                <div v-if="showGroups" class="input-dropdown">
                                    <div
                                        v-for="group in orderGroupFilters"
                                        :key="group.id"
                                        class="dropdown-item"
                                        :class="{selected: group.id === selectedGroupFilterId}"
                                        @click="selectGroupFilter(group.id)"
                                    >
                                        <p class="item-text">{{group.title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-field">
                            <p class="field-name">Экипаж</p>
                            <div class="dropdown-input extended">
                                <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                                <p
                                    class="input-current"
                                    @click="showCrews=!showCrews"
                                >{{orderCrewFilters.find(c=>c.id===selectedCrewFilterId).title}}</p>
                                <div v-if="showCrews" class="input-dropdown">
                                    <div
                                        v-for="crew in orderCrewFilters"
                                        :key="crew.id"
                                        class="dropdown-item"
                                        :class="{selected: crew.id === selectedCrewFilterId}"
                                        @click="selectCrewFilter(crew.id)"
                                    >
                                        <p class="filter-title">{{crew.title}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-field">
                            <p class="field-name">Дата</p>
                            <input
                                type="text"
                                class="dropdown-input"
                                :value="filterDate"
                                @keyup="setFormattedDate"
                                placeholder="12/05/2020"
                                maxlength="10"
                            />
                        </div>
                        <div class="dropdown-footer">
                            <div class="footer-btn primary" @click="setFilters">
                                <p class="btn-text">Подтвердить</p>
                            </div>
                            <div class="footer-btn">
                                <p class="btn-text" @click="cancelFilters">Отменить</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="control currents">
                    <div
                        class="control-name"
                        @click="toggleStatus"
                    >{{orderStatusFilters.find(s=>s.id===selectedStatusFilterId).title}}</div>
                    <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                    <div v-if="showStatus && !showFilters" class="status-dropdown">
                        <div
                            v-for="status in orderStatusFilters"
                            :key="status.id"
                            class="status-item"
                            :class="{selected: status.id === selectedStatusFilterId}"
                            @click="setStatusFilter(status.id)"
                        >
                            <p class="status-title">{{status.title}}</p>
                        </div>
                    </div>
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
            :statuses="orderStatuses"
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

import { eventBus } from "@/main.js";

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
        },
        orderGroupFilters() {
            return this.$store.state.orderDetails.crewGroups;
        },
        orderCrewFilters() {
            return this.$store.state.orderDetails.crews;
        },
        orderStatusFilters() {
            return this.$store.state.orderDetails.status;
        },
        orderStatuses() {
            return this.$store.state.orderDetails.orderStatuses;
        }
    },
    created() {
        eventBus.$on("orderFromCall", () => {
            this.toggleCreateOrder(true);
        });
    },
    data() {
        return {
            numberOfOrders: 0,
            settings: false,
            showCreateOrder: false,
            orderIdWaitingForChange: null,
            showFilters: false,
            showGroups: false,
            showCrews: false,
            showStatus: false,
            selectedGroupFilterId: 1,
            selectedCrewFilterId: 1,
            selectedStatusFilterId: 1,
            viewFilters: {
                groupId: null,
                crewId: null,
                statusId: null
            },
            filterDate: ""
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
            this.settings = false;
            this.showCreateOrder = value;
        },
        toggleFilters() {
            this.showStatus = false;
            this.showFilters = !this.showFilters;
        },
        toggleStatus() {
            this.showFilters = false;
            this.showStatus = !this.showStatus;
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
        },
        selectGroupFilter(id) {
            this.selectedGroupFilterId = id;
            this.showGroups = false;
        },
        selectCrewFilter(id) {
            this.selectedCrewFilterId = id;
            this.showCrews = false;
        },
        setFilters() {
            this.viewFilters = {
                groupId: this.selectedGroupFilterId,
                crewId: this.selectedCrewFilterId,
                statusId: this.selectedStatusFilterId
            };
            this.showFilters = false;
        },
        setStatusFilter(id) {
            this.selectedStatusFilterId = id;
            this.showStatus = false;
        },
        cancelFilters() {
            this.viewFilters = {
                groupId: null,
                crewId: null,
                statusId: null
            };
            this.showFilters = false;
        },
        setFormattedDate(e) {
            if (e.keyCode !== 8) {
                const valueArr = e.target.value.split("");
                if (valueArr.length === 2 || valueArr.length === 5) {
                    valueArr.push("/");
                }
                this.filterDate = valueArr.join("");
            } else this.filterDate = "";
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
    height: calc(90vh - 105px);
    max-height: calc(90vh - 105px);
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

    font-size: 14px;
    position: relative;
    background-color: #e5e5e5;
    transition: background-color 0.3s ease-in-out;
}
.control:hover {
    background-color: #d8d8d8;
}

.control.active {
    background-color: #d8d8d8;
}

.control-name {
    line-height: 45px;
    cursor: pointer;
}

.dropdown-icon {
    height: 4px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10%;
}

.filters-dropdown {
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 0;
    right: -100%;
    height: 240px;
    padding: 20px;
    background-color: #d8d8d8;
}

.dropdown-field {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.field-name {
    font-size: 14px;
}

.dropdown-input {
    width: 200px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: #fafafa;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
}

.dropdown-input.extended {
    position: relative;
}

.input-current {
    width: 100%;
    line-height: 35px;
}

.input-dropdown {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    max-height: 110px;
    overflow-y: scroll;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #ececec;
}

.dropdown-item {
    height: 25px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: #fafafa;
}

.dropdown-item.selected {
    background-color: #fafafa;
}

.dropdown-item:not(:last-child) {
    margin-bottom: 5px;
}

.dropdown-footer {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
}

.footer-btn {
    height: 35px;
    width: 120px;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    border-radius: 5px;
    outline: none;
    cursor: pointer;
}

.footer-btn.primary {
    background-color: #fdbf5a;
    transition: color 0.2s ease-in-out;
}

.footer-btn.primary:hover {
    color: #f4f4f4;
}

.footer-btn .btn-text {
    font-size: 12px;
}

.status-dropdown {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    background: #d8d8d8;
    border-radius: 0px 8px 5px 5px;
    padding: 5px 10px;
}

.status-item {
    height: 25px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-item:hover {
    background-color: #fafafa;
}

.status-item.selected {
    background-color: #fafafa;
}

.status-item:not(:last-child) {
    margin-bottom: 5px;
}

.status-title {
    font-size: 14px;
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
    z-index: 100000;
    top: 45px;
    left: calc(100% - 13px);
}
</style>