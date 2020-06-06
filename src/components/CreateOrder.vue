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
                            @click.native="toggleCheckBox('saveClientName')"
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
                            v-model="origin.adress"
                            placeholder="Адрес подачи"
                        />
                        <img
                            alt="pinpoint"
                            id="pinpoint"
                            :src="require('@/assets/pinpoint-icon.svg')"
                        />
                        <img alt="drop" id="drop" :src="require('@/assets/drop-icon.svg')" />
                    </div>
                    <div class="form-input extended" v-for="stop in stops" :key="stop.id">
                        <input
                            type="text"
                            name="new-stop"
                            v-model="stop.adress"
                            placeholder="Новый адрес"
                        />
                        <img
                            alt="pinpoint"
                            id="pinpoint"
                            :src="require('@/assets/pinpoint-icon.svg')"
                        />
                        <img alt="drop" id="drop" :src="require('@/assets/drop-icon.svg')" />
                        <span id="delete" @click="removeStop(stop.id)">+</span>
                    </div>
                    <div class="form-input extended">
                        <input
                            type="text"
                            name="destitation"
                            v-model="destination.adress"
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
                            @click.native="toggleCheckBox('twoWayRide')"
                        />
                        <p class="control-text">Обратно</p>
                    </div>
                    <div class="control-wrapper">
                        <AddIcon @click.native="addStop" />
                        <p class="control-text">Добавить адрес</p>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <label for="client" class="form-label primary">Клиент</label>
                <div class="form-input extended" v-for="attr in attributes" :key="attr.id">
                    <p>{{attr.title}}</p>
                    <span id="delete" @click="removeAttribute(attr.id)">+</span>
                </div>
                <div class="form-field">
                    <div class="form-input extended">
                        <p>{{newAttribute? newAttribute.title: "Выберите атрибут"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="showAttributes=!showAttributes"
                        />
                        <FormDropdownSelect
                            v-if="showAttributes"
                            :options="getAttributes"
                            @select-option="setNewAttribute"
                        />
                    </div>
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper">
                        <AddIcon @click.native="addAttribute" />
                        <p class="control-text">Добавить атрибут</p>
                    </div>
                </div>
                <input
                    class="form-input"
                    type="text"
                    name="order-comment"
                    v-model="orderComment"
                    placeholder="Комментари к заказу"
                />
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
import FormDropdownSelect from "./UI/FormDropdownSelect.vue";
import Checkbox from "@/components/UI/Checkbox.vue";
import AddIcon from "@/components/UI/AddIcon.vue";

export default {
    name: "CreateOrder",
    components: {
        simplebar,
        Checkbox,
        AddIcon,
        FormDropdownSelect
    },
    computed: {
        getTarrifs() {
            return this.$store.state.orderDetails.tarrifs;
        },
        getAttributes() {
            return this.$store.state.orderDetails.attributes;
        },
        getCrewGroups() {
            return this.$store.state.orderDetails.crewGroups;
        },
        getCrews() {
            return this.$store.state.orderDetails.crews;
        },
        getOrderStates() {
            return this.$store.state.orderDetails.orderStates;
        }
    },
    data() {
        return {
            clientNumber: "",
            clientName: "",
            clientGroup: "",
            saveClientName: false,
            origin: {
                adress: "",
                lat: null,
                lon: null
            },
            stops: [],
            destination: {
                adress: "",
                lat: null,
                lon: null
            },
            twoWayRide: false,
            newAttribute: null,
            attributes: [],
            showAttributes: false,
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
        },
        addStop() {
            this.stops = [
                ...this.stops,
                {
                    address: "",
                    lat: this.getRandomCoord(),
                    lon: this.getRandomCoord(),
                    id: this.stops.length
                }
            ];
        },
        removeStop(id) {
            this.stops = this.stops.filter(s => s.id !== id);
        },
        setNewAttribute($event) {
            if (
                (this.attributes.length &&
                    !this.attributes.find(attr => attr.id === $event.id)) ||
                !this.attributes.length
            ) {
                this.newAttribute = { id: $event.id, title: $event.title };
                this.showAttributes = false;
                console.log("added new attr");
            } else {
                console.log("did not add new attr");
            }
        },
        addAttribute() {
            if (this.newAttribute) {
                this.attributes = [...this.attributes, this.newAttribute];
                this.newAttribute = null;
            }
        },
        removeAttribute(id) {
            this.attributes = this.attributes.filter(attr => attr.id !== id);
        },
        // ! method to get pseudo-coordinates while creating adresses(only for testimg purposes)
        getRandomCoord() {
            return 40 + Math.random() * 20;
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
    font-size: 14px;
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
    height: 37px;
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
    position: relative;
}

.form-input.extended input,
p {
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    font-size: 11px;
    border: none;
    width: 70%;
}

.form-input.extended img {
    margin: 0 7px;
    cursor: pointer;
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

.form-input.extended span#delete {
    font-size: 23px;
    line-height: 90%;
    color: red;
    cursor: pointer;
    position: absolute;
    top: -8px;
    right: -4px;

    transform: rotate(45deg);
}

.form-section-controls {
    width: 100%;
    margin: 5px 0;
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