<template>
    <div class="create-order-container">
        <div class="create-order-header">
            <h3 class="header">Заказ</h3>
            <div class="close-order" style="opacity: 50%;" @click="$emit('close-create-order')">+</div>
        </div>
        <simplebar class="scrollable-form" data-simplebar-auto-hide="false">
            <div class="form-section" style="margin-top: 10px">
                <label for="client" class="form-label primary">Клиент</label>
                <div class="form-field">
                    <input
                        type="text"
                        name="client-number"
                        :value="clientNumber"
                        @keydown="setClientNumber"
                        maxlength="15"
                        minlength="15"
                        class="form-input"
                        :class="{'invalid': validationErrors.clientNumber}"
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
                        :class="{'invalid': validationErrors.clientName}"
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
                        :class="{'invalid': validationErrors.clientGroup}"
                        placeholder="Введите группу"
                    />
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper" @click="toggleCheckBox('saveClientName')">
                        <Checkbox :checked="saveClientName" />
                        <p class="control-text">Сохранить</p>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <label for="route" class="form-label primary">Маршрут</label>
                <div class="form-field">
                    <div class="form-input extended" :class="{'invalid': validationErrors.origin}">
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
                        v-for="(stop, i) in stops"
                        class="form-input extended"
                        :class="{'invalid': validationErrors.stops&& validationErrors.stops[i]}"
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
                    <div
                        class="form-input extended"
                        :class="{'invalid': validationErrors.destination}"
                    >
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
                    <div class="control-wrapper" @click="toggleCheckBox('twoWayRide')">
                        <Checkbox :checked="twoWayRide" />
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
                            @click="toggleAttributesDropdown"
                        >{{newAttribute? newAttribute.title: "Выберите атрибут"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="toggleAttributesDropdown"
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
                    <div
                        class="form-input extended"
                        :class="{'invalid': validationErrors.crewGroup}"
                    >
                        <p
                            @click="toggleCrewGroupsDropdown"
                        >{{crewGroup.id? crewGroup.title: "Выберите группу"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="toggleCrewGroupsDropdown"
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
                    <div class="form-input extended" :class="{'invalid': validationErrors.crew}">
                        <p @click="toggleCrewsDropdown">{{crew.id? crew.title: "Выберите экипаж"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="toggleCrewsDropdown"
                        />
                        <FormDropdownSelect
                            v-if="showCrews"
                            :options="getCrews"
                            @select-option="setCrew"
                        />
                    </div>
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper" @click="toggleCheckBox('autoMatch')">
                        <Checkbox :checked="autoMatch" />
                        <p class="control-text">Автоподбор</p>
                    </div>
                </div>
                <div class="form-field inline">
                    <label for="serve-time" class="form-label">Время подачи авто</label>
                    <input
                        type="number"
                        v-model="serveTime"
                        class="form-input number"
                        :class="{'invalid': validationErrors.serveTime}"
                        id="serve-time"
                        placeholder="мин"
                    />
                </div>
            </div>
            <div class="form-section">
                <label class="form-label primary" for="tariff">Тариф</label>
                <div class="form-field">
                    <div class="form-input extended" :class="{'invalid': validationErrors.tariff}">
                        <p
                            @click="toggleTariffsDropdown"
                        >{{tariff.id? tariff.title: "Выберите тариф"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="toggleTariffsDropdown"
                        />
                        <FormDropdownSelect
                            v-if="showTariffs"
                            :options="getTariffs"
                            @select-option="setTariff"
                        />
                    </div>
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper" @click="toggleCheckBox('hourlyPayment')">
                        <Checkbox :checked="hourlyPayment" />
                        <p class="control-text">Почасовой</p>
                    </div>
                </div>
            </div>
            <div class="form-section">
                <label for="state" class="form-label primary">Состояние</label>
                <div class="form-field">
                    <div
                        class="form-input extended"
                        :class="{'invalid': validationErrors.orderState}"
                    >
                        <p
                            @click="toggleOrderStatesDropdown"
                        >{{orderState.id? orderState.title: "Выберите состояние"}}</p>
                        <img
                            alt="drop"
                            id="drop"
                            :src="require('@/assets/drop-icon.svg')"
                            @click="toggleOrderStatesDropdown"
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
                            :class="{'invalid': validationErrors.timestamp && validationErrors.timestamp.minutes}"
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
                            :value="timestamp.date"
                            @keyup="setFormattedDate"
                            class="form-input"
                            :class="{'invalid': validationErrors.timestamp && validationErrors.timestamp.date}"
                            id="state-date"
                            placeholder="12/05/2020"
                            maxlength="10"
                        />
                    </div>
                </div>
                <div class="form-section-controls">
                    <div class="control-wrapper" @click="toggleCheckBox('preOrder')">
                        <Checkbox :checked="preOrder" />
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
                        :class="{'invalid': validationErrors.travelCost && validationErrors.travelCost.total}"
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
            <button class="footer-btn save" @click="submit">Сохранить</button>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import FormDropdownSelect from "@/components/UI/FormDropdownSelect.vue";
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
            return this.$store.state.orderDetails.orderStatuses;
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
                total: null,
                cash: null,
                card: null
            },
            validationErrors: {}
        };
    },
    methods: {
        toggleCheckBox(fieldName) {
            this[fieldName] = !this[fieldName];
        },
        toggleAttributesDropdown() {
            this.showCrewGroups = false;
            this.showCrews = false;
            this.showTariffs = false;
            this.showOrderStates = false;
            this.showAttributes = !this.showAttributes;
        },
        toggleCrewGroupsDropdown() {
            this.showCrews = false;
            this.showTariffs = false;
            this.showOrderStates = false;
            this.showAttributes = false;
            this.showCrewGroups = !this.showCrewGroups;
        },
        toggleCrewsDropdown() {
            this.showCrewGroups = false;
            this.showTariffs = false;
            this.showOrderStates = false;
            this.showAttributes = false;
            this.showCrews = !this.showCrews;
        },
        toggleTariffsDropdown() {
            this.showCrewGroups = false;
            this.showOrderStates = false;
            this.showAttributes = false;
            this.showCrews = false;
            this.showTariffs = !this.showTariffs;
        },
        toggleOrderStatesDropdown() {
            this.showCrewGroups = false;
            this.showTariffs = false;
            this.showAttributes = false;
            this.showCrews = false;
            this.showOrderStates = !this.showOrderStates;
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
                ((this.attributes.length && !this.attributes.find(attr => attr.id === $event.id)) ||
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
        setClientNumber(e) {
            if (e.keyCode !== 8) {
                const valueArr = e.target.value.split("");
                if (
                    valueArr.length === 1 ||
                    valueArr.length === 5 ||
                    valueArr.length === 9 ||
                    valueArr.length === 12
                ) {
                    valueArr.push("-");
                }
                this.clientNumber = valueArr.join("");
            } else this.clientNumber = "";
        },
        setFormattedDate(e) {
            if (e.keyCode !== 8) {
                const valueArr = e.target.value.split("");
                if (valueArr.length === 2 || valueArr.length === 5) {
                    valueArr.push("/");
                }
                this.timestamp.date = valueArr.join("");
            } else this.timestamp.date = "";
        },

        submit() {
            const fieldsToValidate = [
                "clientNumber",
                "clientName",
                "clientGroup",
                ["origin", "address"],
                ["stops", "address"],
                ["destination", "address"],
                ["crewGroup", "id"],
                ["crew", "id"],
                "serveTime",
                ["tariff", "id"],
                ["orderState", "id"],
                ["timestamp", "minutes", "date"],
                ["travelCost", "total"]
            ];
            this.validateFields(fieldsToValidate);
            if (Object.keys(this.validationErrors).length) {
                return;
            }
            const newOrder = {
                comment: this.orderComment,
                // this example id will be replaced by id created in db
                id: Math.floor(Math.random() * 100000),
                state_id: this.orderState.id,
                state_kind: this.orderState.kind,
                source: this.origin.address,
                source_lat: this.origin.lat,
                source_lon: this.origin.lon,
                destination: this.destination.address,
                destination_lat: this.destination.lat,
                destination_lon: this.destination.lon,
                stops: [...this.stops],
                customer: this.clientName,
                passanger: this.clientName,
                crew_id: this.crew.id,
                order_crew_group_id: this.crewGroup.id,
                is_prior: this.preOrder,
                auto_search_driver: this.autoMatch,
                name: this.clientName,
                phone: this.clientNumber,
                save_client: this.saveClientName,
                tariff_id: this.tariff.id,
                hourly_payment: this.hourlyPayment,
                two_way_ride: this.twoWayRide,
                attributes: [...this.attributes, this.newAttribute].filter(attr => attr !== null),
                total_cost: this.travelCost.total,
                cashless_sum: this.travelCost.card,
                cash_sum: this.travelCost.cash,
                timestamp: this.timestamp
            };
            this.$emit("create-order", newOrder);
        },
        // ! A method to get pseudo-coordinates while creating addresses(only for testimg purposes)
        getRandomCoord() {
            return +(40 + Math.random() * 20).toFixed(6);
        },
        validateFields(fields) {
            this.validationErrors = {};
            for (const field of fields) {
                if (Array.isArray(field)) {
                    const [fieldName, ...properties] = field;
                    if (Array.isArray(this[fieldName]) && this[fieldName].length) {
                        this[fieldName].forEach((item, i) => {
                            for (const prop of properties) {
                                console.log(this[fieldName][i][prop]);
                                if (!this[fieldName][i][prop]) {
                                    if (
                                        this.validationErrors[fieldName] &&
                                        this.validationErrors[fieldName][i]
                                    ) {
                                        this.validationErrors[fieldName][i] = [
                                            ...this.validationErrors[fieldName][i],
                                            { [prop]: true }
                                        ];
                                    } else {
                                        this.validationErrors[fieldName] = [];
                                        this.validationErrors[fieldName][i] = { [prop]: true };
                                    }
                                }
                            }
                        });
                    } else if (!Array.isArray(this[fieldName])) {
                        for (const prop of properties) {
                            if (!this[fieldName][prop]) {
                                this.validationErrors[fieldName] = {
                                    ...this.validationErrors[fieldName],
                                    [prop]: true
                                };
                            }
                        }
                    }
                } else {
                    if (!this[field]) {
                        this.validationErrors[field] = true;
                    }
                }
            }
        }
    }
};
</script>

<style scoped>
.create-order-container {
    --font-size-s: 8px;
    --font-size-m: 12px;
    --font-size-l: 14px;
    --font-size-xl: 15px;
    --font-size-footer: 14px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.create-order-header {
    padding: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    height: 45px;
    background: #fff;
    border-radius: 8px 8px 0px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.create-order-header .header {
    margin: 0;
    line-height: 45px;
    font-weight: normal;
    font-size: var(--font-size-l);
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
    height: calc(100% - 125px);
    max-height: calc(100% - 125px);
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
    user-select: none;
    font-size: var(--font-size-l);
    color: #181c21;
}

.form-label.primary {
    font-size: var(--font-size-xl);
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
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    border: none;
    font-size: var(--font-size-m);
    color: #181c21;
    outline: none;
}

.form-input.invalid {
    border: 1px solid rgba(255, 0, 0, 0.7);
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
    font-size: var(--font-size-l);
    text-align: center;
    width: 75px;
    -moz-appearance: textfield;
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
}

.form-input.extended input,
p {
    user-select: none;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    font-size: var(--font-size-l);
    border: none;
    width: 70%;
    line-height: 37px;
}

.form-input.extended img {
    user-select: none;
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
    margin: 5px 5px;
}

.form-input.extended span#delete {
    font-size: 25px;
    line-height: 90%;
    color: rgba(222, 29, 29, 0.776);
    cursor: pointer;
    position: absolute;
    top: -7px;
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
    cursor: pointer;
}

.control-text {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: normal;
    white-space: nowrap;
    font-size: var(--font-size-m);
    line-height: 15px;
    margin-left: 2px;
    color: #181c21;
}

.create-order-footer {
    width: 100%;
    height: 80px;
    padding: 15px;
    background: #fff;
    border-radius: 0px 0px 8px 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.footer-btn {
    height: 35px;
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: var(--font-size-footer);
    text-align: center;
    color: #000;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #fafafa;
    box-shadow: 0px 2px 15px rgba(103, 103, 103, 0.3);
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