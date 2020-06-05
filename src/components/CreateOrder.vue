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
                        class="form-input"
                        placeholder="x-xxx-xxx-xx-x"
                    />
                </div>
                <div class="form-field">
                    <label for="client-name" class="form-label">Имя клиента:</label>
                    <input
                        type="text"
                        name="client-name"
                        class="form-input"
                        placeholder="Ввести имя"
                    />
                </div>
                <div class="form-field">
                    <label for="client-group" class="form-label">Клиентская группа:</label>
                    <input
                        type="text"
                        group="client-name"
                        class="form-input"
                        placeholder="Ввести имя"
                    />
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

export default {
    name: "CreateOrder",
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
    components: {
        simplebar
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
    height: 40px;
    background: #ececec;
    border-radius: 8px 8px 0px 0px;
}
.create-order-header .header {
    margin: 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #181c21;
}

.scrollable-form {
    width: 100%;
    height: 448px;
    padding: 15px 25px 25px 15px;
    overflow-y: scroll;
    background: #fafafa;
}

.form-label {
    display: block;
    font-family: "Poppins";
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px;
    color: #181c21;
}
.form-label.primary {
    font-size: 12px;
    line-height: 18px;
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
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px;
    color: #6b6565;
    outline: none;
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