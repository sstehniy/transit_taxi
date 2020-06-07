<template>
    <div class="create-order-container">
        <div class="create-order-header">
            <h3 class="header">Заказ</h3>
            <div class="close-order" @click="$emit('close-create-order')">+</div>
        </div>
        <simplebar class="scrollable-form" data-simplebar-auto-hide="false">
            <div class="form-section" style="margin-top: 10px">
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
                        placeholder="Введите группу"
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
                            :value="origin.address"
                            @input="setNewOrigin"
                            placeholder="Адрес подачи"
                        />
                        <img
                            alt="pinpoint"
                            id="pinpoint"
                            :src="require('@/assets/pinpoint-icon.svg')"
                        />
                        <img alt="drop" id="drop" :src="require('@/assets/drop-icon.svg')" />
                    </div>
                    <div
                        class="form-input extended"
                        v-for="stop in stops"
                        :key="stop.id"
                        :id="stop.id"
                    >
                        <input
                            type="text"
                            name="new-stop"
                            :value="stop.address"
                            @input="updateStop"
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
                            :value="destination.address"
                            @input="setNewDestination"
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
                <label for="attributes" class="form-label primary">Атрибуты</label>
                <div class="form-input extended" v-for="attr in attributes" :key="attr.id">
                    <p>{{attr.title}}</p>
                    <span id="delete" @click="removeAttribute(attr.id)">+</span>
                </div>
                <div class="form-field">
                    <div class="form-input extended">
                        <p
                            @click="showAttributes=!showAttributes"
                        >{{newAttribute? newAttribute.title: "Выберите атрибут"}}</p>
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
            <div class="form-section">
                <label for="crew-group" class="form-label primary">Группа экипажа</label>
                <div class="form-field">
                    <div class="form-input extended">
                        <p
                            @click="showCrewGroups=!showCrewGroups"
                        >{{crewGroup.id? crewGroup.title: "Выберите группу"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="showCrewGroups=!showCrewGroups"
                        />
                        <FormDropdownSelect
                            v-if="showCrewGroups"
                            :options="getCrewGroups"
                            @select-option="setCrewGroup"
                        />
                    </div>
                </div>
                <label for="crew" class="form-label primary">Экипаж</label>
                <div class="form-field">
                    <div class="form-input extended">
                        <p @click="showCrews=!showCrews">{{crew.id? crew.title: "Выберите экипаж"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="showCrews=!showCrews"
                        />
                        <FormDropdownSelect
                            v-if="showCrews"
                            :options="getCrews"
                            @select-option="setCrew"
                        />
                    </div>
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper">
                        <Checkbox :checked="autoMatch" @click.native="toggleCheckBox('autoMatch')" />
                        <p class="control-text">Автоподбор</p>
                    </div>
                </div>
                <div class="form-field inline">
                    <label for="serve-time" class="form-label">Время подачи авто</label>
                    <input
                        type="number"
                        v-model="serveTime"
                        class="form-input number"
                        id="serve-time"
                        placeholder="мин"
                    />
                </div>
            </div>
            <div class="form-section">
                <label class="form-label primary" for="tariff">Тариф</label>
                <div class="form-field">
                    <div class="form-input extended">
                        <p
                            @click="showTarifsf=!showTariffs"
                        >{{tariff.id? tariff.title: "Выберите тариф"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="showTariffs=!showTariffs"
                        />
                        <FormDropdownSelect
                            v-if="showTariffs"
                            :options="getTariffs"
                            @select-option="setTariff"
                        />
                    </div>
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper">
                        <Checkbox
                            :checked="hourlyPayment"
                            @click.native="toggleCheckBox('hourlyPayment')"
                        />
                        <p class="control-text">Почасовой</p>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <label for="state" class="form-label primary">Состояние</label>
                <div class="form-field">
                    <div class="form-input extended">
                        <p
                            @click="showOrderStates=!showOrderStates"
                        >{{orderState.id? orderState.title: "Выберите состояние"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="showOrderStates=!showOrderStates"
                        />
                        <FormDropdownSelect
                            v-if="showOrderStates"
                            :options="getOrderStates"
                            @select-option="setOrderState"
                        />
                    </div>
                </div>
            </div>
            <div class="form-section">
                <label for="state" class="form-label primary">Время</label>
                <div class="inline-fields-container">
                    <div class="form-field inline">
                        <img alt="clock-icon" id="clock" :src="require('@/assets/time-icon.svg')" />
                        <input
                            type="number"
                            v-model="timestamp.minutes"
                            class="form-input number"
                            id="state-minutes"
                            placeholder="мин"
                        />
                    </div>
                    <div class="form-field inline">
                        <img
                            alt="calender-icon"
                            id="calender"
                            :src="require('@/assets/calender-icon.svg')"
                        />
                        <input
                            type="text"
                            :value="timestamp.date | formatDate"
                            @input="setDate"
                            class="form-input"
                            id="state-date"
                            placeholder="12/05/2020"
                            maxlength="10"
                        />
                    </div>
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper">
                        <Checkbox :checked="preOrder" @click.native="toggleCheckBox('preOrder')" />
                        <p class="control-text">Предварительный</p>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <label class="form-label primary">Стоимость поездки</label>
                <div class="form-field inline">
                    <label for="serve-time" class="form-label">Сумма</label>
                    <input
                        type="number"
                        v-model="travelCost.total"
                        class="form-input number"
                        id="travel-cost"
                        placeholder="ххх Р"
                    />
                </div>
                <div class="form-field inline">
                    <label for="serve-time" class="form-label">Наличные</label>
                    <input
                        type="number"
                        v-model="travelCost.cash"
                        class="form-input number"
                        id="travel-cost"
                        placeholder="ххх Р"
                    />
                </div>
                <div class="form-field inline">
                    <label for="serve-time" class="form-label">Карта</label>
                    <input
                        type="number"
                        v-model="travelCost.card"
                        class="form-input number"
                        id="travel-cost"
                        placeholder="ххх Р"
                    />
                </div>
            </div>
        </simplebar>
        <div class="create-order-footer">
            <button class="footer-btn total">
                <span id="total-num">{{travelCost.total? travelCost.total: "0"}}</span> Р
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
        getTariffs() {
            return this.$store.state.orderDetails.tariffs;
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
                address: "",
                lat: null,
                lon: null
            },
            stops: [],
            destination: {
                address: "",
                lat: null,
                lon: null
            },
            twoWayRide: false,
            newAttribute: null,
            attributes: [],
            showAttributes: false,
            orderComment: "",
            crewGroup: {
                title: "",
                id: null
            },
            showCrewGroups: false,
            crew: {
                title: "",
                id: null
            },
            showCrews: false,
            autoMatch: false,
            serveTime: null,
            tariff: {
                title: "",
                id: null
            },
            showTariffs: false,
            hourlyPayment: false,
            orderState: {
                title: "",
                id: null
            },
            showOrderStates: false,
            timestamp: {
                minutes: null,
                date: null
            },
            preOrder: false,
            travelCost: {
                total: 600,
                cash: null,
                card: null
            }
        };
    },
    methods: {
        toggleCheckBox(fieldName) {
            this[fieldName] = !this[fieldName];
        },
        setNewOrigin({ target }) {
            this.origin = {
                address: target.value,
                lat: this.getRandomCoord(),
                lon: this.getRandomCoord()
            };
        },
        setNewDestination({ target }) {
            this.destination = {
                address: target.value,
                lat: this.getRandomCoord(),
                lon: this.getRandomCoord()
            };
        },
        addStop() {
            this.stops = [
                ...this.stops,
                {
                    address: "",
                    lat: null,
                    lon: null,
                    id: this.stops.length
                }
            ];
        },
        updateStop({ target }) {
            const stop = this.stops.find(s => s.id === +target.parentNode.id);
            stop.address = target.value;
            stop.lat = this.getRandomCoord();
            stop.lon = this.getRandomCoord();
        },
        removeStop(id) {
            this.stops = this.stops.filter(s => s.id !== id);
        },
        setNewAttribute($event) {
            if (
                ((this.attributes.length &&
                    !this.attributes.find(attr => attr.id === $event.id)) ||
                    !this.attributes.length) &&
                $event
            ) {
                this.newAttribute = { id: $event.id, title: $event.title };
                this.showAttributes = false;
                console.log("added new attr");
            } else {
                this.newAttribute = null;
                this.showAttributes = false;
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
        setCrewGroup(crewGroup) {
            this.crewGroup = { ...crewGroup };
            this.showCrewGroups = false;
        },
        setCrew(crew) {
            this.crew = { ...crew };
            this.showCrews = false;
        },
        setTariff(tariff) {
            this.tariff = { ...tariff };
            this.showTariffs = false;
        },
        setOrderState(orderState) {
            this.orderState = { ...orderState };
            this.showOrderStates = false;
        },
        setDate({ target }) {
            this.timestamp.date = target.value;
        },
        submit() {
            // const newOrder = {
            //     // this example id will be replaced by id created in db
            //     id: Math.random() * 1000,
            //     state_id: this.orderState.id,
            //     state_kind: this.orderState.title
            //         .toLowerCase()
            //         .split(" ")
            //         .join("_"),
            //     server_time_offset: 0,
            //     start_time: "20130204181111",
            //     source_time: "20130204181111",
            //     source: this.origin.address,
            //     source_lat: this.origin.lat,
            //     source_lon: this.origin.lon,
            //     destination: this.destination.address,
            //     destination_lat: this.destination.lat,
            //     destination_lon: this.destination.lon,
            //     stops: [...this.stops],
            //     customer: this.clientName,
            //     passanger: this.clientName,
            //     crew_id: this.crew.id,
            //     prior_crew_id: 0,
            //     driver_id: 0,
            //     car_id: 0,
            //     phone: this.clientNumber,
            //     client_id: 140,
            //     tariff_id: this.tariff.id,
            //     order_crew_group_id: this.crewGroup.id,
            //     creation_way: "operator",
            //     client_employee_id: 1,
            //     is_prior: false,
            //     is_really_prior: false,
            //     email: "mail@mail.ru",
            //     prior_to_current_before_minutes: 30,
            //     flight_number: "123/123123-0"
            // };
        },
        // ! method to get pseudo-coordinates while creating addresses(only for testimg purposes)
        getRandomCoord() {
            return +(40 + Math.random() * 20).toFixed(6);
        }
    },
    filters: {
        formatDate(value) {
            if (!value) return;
            const valueArr = value.split("");
            if (valueArr.length === 2) {
                valueArr.push("/");
                return valueArr.join("");
            }
            if (valueArr.length === 5) {
                valueArr.push("/");
                return valueArr.join("");
            }
            return valueArr.join("");
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.create-order-header .header {
    margin: 0;
    line-height: 45px;
    font-weight: normal;
    font-size: 14px;
    color: #181c21;
}
.create-order-header .close-order {
    font-size: 25px;
    line-height: 47px;
    color: #181c21;
    opacity: 50%;
    transform: rotate(45deg);
    cursor: pointer;
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
.form-section:last-child {
    margin-bottom: 0;
}
.form-section > .form-input:last-child {
    margin-bottom: 0;
}

.form-field.inline,
.inline-fields-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.form-field.inline img#clock {
    height: 15px;
    width: 15px;
}
.form-field.inline img#calender {
    height: 13px;
    width: 15px;
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
    flex: 1;
    white-space: nowrap;
}

.form-input {
    margin: 5px 0;
    width: 100%;
    height: 37px;
    line-height: 17px;
    padding: 10px;
    background: #ececec;
    border-radius: 5px;
    border: none;
    font-size: 11px;
    color: #181c21;
    outline: none;
}
.form-input::placeholder {
    color: #6b6565;
}

.form-input#state-minutes {
    width: 50px;
    margin-left: 10px;
}

.form-input#state-date {
    width: 75px;
    margin-left: 10px;
}
.form-input#travel-cost {
    width: 120px;
}
.form-input.number {
    font-size: 11px;
    text-align: center;
    width: 75px;
    -moz-appearance: textfield;
    line-height: 37px;
}

.form-input.number::-webkit-outer-spin-button,
.form-input.number::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.form-input.extended {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    line-height: 20px;
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
    margin: 7px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.control-wrapper {
    display: flex;
    align-items: center;
}

.control-text {
    font-family: "Poppins", sans-serif;
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
    transition: color 0.2s ease-in-out;
}
.footer-btn.save:hover {
    color: #6b6565;
}
</style>