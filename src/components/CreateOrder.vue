<template>
    <div class="create-order-container">
        <div class="create-order-header">
            <h3 class="header" @click="$emit('close-create-order')">Заказ</h3>
        </div>
        <simplebar class="scrollable-form" data-simplebar-auto-hide="false">
            <div class="form-section">
                <label for="client" class="form-label primary">Клиент</label>
                <div class="form-field">
                    <input
                        type="text"
                        name="client-number"
                        v-model="clientNumber"
                        class="form-input"
                        placeholder="x-xxx-xxx-xx-x"
                    />
                </div>
                <div class="form-field">
                    <label for="client-name-autocomplete" class="form-label">Имя клиента:</label>
                    <input
                        type="text"
                        name="client-name"
                        v-model="clientName"
                        class="form-input"
                        placeholder="Введите имя"
                    />
                </div>
                <div class="form-field">
                    <label for="client-group-autocomplete" class="form-label">Клиентская группа:</label>
                    <input
                        type="text"
                        class="form-input"
                        v-model="clientGroup"
                        name="client-group"
                        placeholder="Введите группы"
                    />
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper">
                        <Checkbox
                            :checked="saveClientName"
                            @toggle-checked="toggleCheckBox('saveClientName')"
                        />
                        <p class="control-text">Сохранить</p>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <label for="route" class="form-label primary">Маршрут</label>
                <div class="form-field">
                    <div class="form-input extended">
                        <input
                            type="text"
                            name="origin"
                            v-model="origin"
                            placeholder="Адрес подачи"
                        />
                        <img
                            alt="pinpoint"
                            id="pinpoint"
                            :src="require('@/assets/pinpoint-icon.svg')"
                        />
                        <img alt="drop" id="drop" :src="require('@/assets/drop-icon.svg')" />
                    </div>
                    <div class="form-input extended">
                        <input
                            type="text"
                            name="destitation"
                            v-model="destination"
                            placeholder="Адрес назначения"
                        />
                        <img
                            alt="pinpoint"
                            id="pinpoint"
                            :src="require('@/assets/pinpoint-icon.svg')"
                        />
                        <img alt="drop" id="drop" :src="require('@/assets/drop-icon.svg')" />
                    </div>
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper">
                        <Checkbox
                            :checked="twoWayRide"
                            @toggle-checked="toggleCheckBox('twoWayRide')"
                        />
                        <p class="control-text">Обратно</p>
                    </div>
                    <div class="control-wrapper">
                        <Checkbox
                            :checked="saveClientName"
                            @toggle-checked="toggleCheckBox('saveClientName')"
                        />
                        <p class="control-text">Добавить адрес</p>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <label for="client" class="form-label primary">Клиент</label>
                <div class="form-input extended">
                    <input
                        type="text"
                        name="destitation"
                        v-model="destination"
                        placeholder="Адрес назначения"
                    />
                    <img alt="drop" id="drop" :src="require('@/assets/drop-icon.svg')" />
                </div>
            </div>
        </simplebar>
        <div class="create-order-footer">
            <button class="footer-btn total">
                <span id="total-num">{{travelCost.total}}</span> Р
            </button>
            <button class="footer-btn save">Сохранить</button>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import Checkbox from "@/components/UI/Checkbox.vue";

export default {
    name: "CreateOrder",
    components: {
        simplebar,
        Checkbox
    },
    computed: {
        tarrifs: () => this.$store.orderDetails.tarrifs,
        crewGroups: () => this.$store.orderDetails.crewGroups,
        crews: () => this.$store.state.orderDetails.crews,
        orderStates: () => this.$store.state.orderDetails.orderStates
    },
    data() {
        return {
            clientNumber: "",
            clientName: "",
            clientGroup: "",
            saveClientName: false,
            origin: "",
            stops: [],
            destination: "",
            twoWayRide: false,
            attributes: {
                childSeat: false
            },
            orderComment: "",
            crewGroupId: 1,
            crewId: 1,
            autoMatch: false,
            serveTime: null,
            tarrifId: 1,
            hourlyPayment: false,
            orderStateId: 1,
            timestamp: {
                minutes: null,
                date: null
            },
            preOrder: false,
            travelCost: {
                total: 215,
                cash: null,
                card: null
            }
        };
    },
    methods: {
        toggleCheckBox(fieldName) {
            this[fieldName] = !this[fieldName];
        }
    }
};
</script>

<style scoped>
.create-order-container {
    position: absolute;
    top: 0;
    left: calc(100% + 20px);
    width: 240px;
    height: 551px;
}
.create-order-header {
    padding: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    height: 45px;
    background: #ececec;
    border-radius: 8px 8px 0px 0px;
}
.create-order-header .header {
    margin: 0;
    line-height: 45px;
    font-weight: normal;
    font-size: 13px;
    color: #181c21;
}

.scrollable-form {
    width: 100%;
    height: 448px;
    padding: 0 25px 25px 15px;
    overflow-y: scroll;
    background: #fafafa;
}

.form-section {
    margin-top: 15px;
    margin-bottom: 5px;
}

.form-label {
    display: block;
    font-size: 11px;
    color: #181c21;
}

.form-label.primary {
    font-size: 14px;
    margin-bottom: 3px;
}
.form-label.inline {
    display: inline-block;
}
.form-input {
    margin-top: 5px;
    margin-bottom: 10px;
    width: 100%;
    padding: 10px;
    background: #ececec;
    border-radius: 5px;
    border: none;
    font-size: 11px;
    color: #6b6565;
    outline: none;
}

.form-input.extended {
    display: flex;
    align-items: center;
}

.form-input.extended input {
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    font-size: 11px;
    border: none;
    width: 70%;
}

.form-input.extended img {
    margin: 0 7px;
}

.form-input.extended img#pinpoint {
    height: 17px;
    width: 11px;
    margin: 0 10px;
}
.form-input.extended img#drop {
    height: 6px;
    width: 8px;
    margin: 0 5px;
}

.form-section-controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.control-wrapper {
    display: flex;
    align-items: center;
}

.control-text {
    font-family: "Poppins";
    font-style: normal;
    font-weight: normal;
    white-space: nowrap;
    font-size: 11px;
    line-height: 15px;
    margin-left: 2px;
    color: #181c21;
}

.create-order-footer {
    width: 100%;
    height: 65px;
    padding: 15px;
    background: #e5e5e5;
    border-radius: 0px 0px 8px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.footer-btn {
    height: 100%;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    color: #000;
    outline: none;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    cursor: pointer;
}

.footer-btn.total {
    width: 65px;
    background-color: #fafafa;
    cursor: default;
}
.footer-btn.total #total-num {
    font-variant-numeric: tabular-nums;
}

.footer-btn.save {
    width: 120px;
    background-color: #fdbf5a;
}
</style>