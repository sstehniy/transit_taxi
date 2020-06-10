<template>
    <div class="edit-driver-container">
        <div class="edit-driver-header">
            <div class="header-control-btn" @click="returnToMain">
                <img alt="go-back-icon" id="go-back" :src="require('@/assets/drop-icon.svg')" />
                <p class="btn-text">Назад</p>
            </div>
            <div class="separator"></div>
            <div class="header-control-btn" :class="{active: showBalance}">
                <p class="btn-text" @click="toggleShowBalance">Баланс</p>
                <img alt="drop-icon" id="drop" :src="require('@/assets/drop-icon.svg')" />
                <div v-if="showBalance" class="balance-dropdown">
                    <div class="dropdown-section top">
                        <div class="action-select">
                            <p
                                class="select-text"
                                @click="toggleActionSelect"
                            >{{balanceAction === "charge"? "Списать": balanceAction === "fund"? "Пополнить": ""}}</p>
                            <img
                                alt="drop-icon"
                                id="select-drop"
                                :src="require('@/assets/drop-icon.svg')"
                            />
                            <div class="select-dropdown" v-if="showActionSelect">
                                <div v-if="balanceAction === 'charge'">
                                    <div class="select-item active" @click="selectAction('charge')">
                                        <p class="select-text">Списать</p>
                                    </div>
                                    <div class="select-item" @click="selectAction('fund')">
                                        <p class="select-text">Пополнить</p>
                                    </div>
                                </div>
                                <div v-else-if="balanceAction === 'fund'">
                                    <div class="select-item active" @click="selectAction('fund')">
                                        <p class="select-text">Пополнить</p>
                                    </div>
                                    <div class="select-item" @click="selectAction('charge')">
                                        <p class="select-text">Списать</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            class="dropdown-input"
                            type="number"
                            v-model="actionValue"
                            placeholder="xxxxxxx"
                        />
                    </div>
                    <div class="dropdown-section bottom">
                        <button
                            class="dropdown-btn primary"
                            @click="acceptBalanceAction"
                        >Подтвердить</button>
                        <button class="dropdown-btn" @click="cancelBalanceAction">Отменить</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="currentView==='overview'" class="edit-driver-body">
            <div class="review-item">
                <p class="item-title">Ф.И.О</p>
                <p class="item-value">{{name}}</p>
            </div>
            <div class="review-item">
                <p class="item-title">Статус</p>
                <p class="item-value">Не работает</p>
            </div>
            <div class="review-item">
                <p class="item-title">ИД водителя</p>
                <p class="item-value">{{driver_id}}</p>
            </div>
            <div class="review-item">
                <p class="item-title">Позывной</p>
                <p class="item-value">{{name_for_taxophone}}</p>
            </div>
            <div class="review-item">
                <p class="item-title">Телефон</p>
                <p class="item-value">{{phones[0].phone}}</p>
            </div>
            <div class="review-item">
                <p class="item-title">Баланс</p>
                <p class="item-value">{{balance}}</p>
            </div>
            <div class="review-item">
                <p class="item-title">Автомобиль</p>
                <p
                    class="item-value"
                >{{auto_color}} {{auto_model}} {{auto_number}} хххххххххххххххххххххх хххххххххххххххххххххх</p>
            </div>
            <div class="review-item">
                <p class="item-title">Атрибуты</p>
                <p class="item-value">
                    <span
                        v-for="attribute in auto_attributes"
                        :key="`attr_${attribute.id}`"
                    >{{attribute.title}}&nbsp;</span>
                </p>
            </div>
        </div>
        <div v-if="currentView==='editMain'" class="edit-driver-body">
            <p class="form-title primary">Изменить водителя</p>
            <div class="form-field">
                <label for="name" class="field-label">Ф.И.О</label>
                <input
                    name="name"
                    class="field-input"
                    :class="{invalid: validationErrors.name}"
                    type="text"
                    v-model="name"
                />
            </div>
            <div class="form-field">
                <label for="driver_id" class="field-label">ИД водителя</label>
                <input
                    name="driver_id"
                    class="field-input"
                    :class="{invalid: validationErrors.driver_id}"
                    type="text"
                    v-model="driver_id"
                />
            </div>
            <div class="form-field">
                <label for="name_for_taxophone" class="field-label">Позывной</label>
                <input
                    name="name_for_taxophone"
                    class="field-input"
                    :class="{invalid: validationErrors.name_for_taxophone}"
                    type="text"
                    v-model="name_for_taxophone"
                />
            </div>
            <div class="form-field">
                <label for="driver_phone" class="field-label">Телефон</label>
                <input
                    name="driver_phone"
                    class="field-input"
                    :class="{invalid: validationErrors.driver_phone}"
                    type="text"
                    :value="phones[0].phone"
                    @keyup="setDriverPhone"
                    minlength="15"
                    maxlength="15"
                />
            </div>
            <div class="form-field">
                <label for="password" class="field-label">Пароль</label>
                <input
                    name="password"
                    class="field-input"
                    :class="{invalid: validationErrors.password}"
                    type="text"
                    v-model="password"
                />
            </div>
            <div class="form-field">
                <label class="field-label">Автомобиль</label>
                <button
                    class="field-input"
                    :class="{invalid: validationErrors.auto_modell || validationErrors.auto_color || validationErrors.auto_number}"
                    type="text"
                    @click="currentView='editSub'"
                >Изменить</button>
            </div>
            <div class="form-field large">
                <label for="comment" class="field-label">Комментарии</label>
                <textarea name="comment" class="field-input" type="text" v-model="comment" />
            </div>
        </div>
        <div v-else-if="currentView==='editSub'" class="edit-driver-body">
            <p class="form-title primary">Выбор автомобиля</p>
            <div class="form-field">
                <label class="field-label">Марка</label>
                <input
                    name="auto_model"
                    class="field-input"
                    :class="{invalid: validationErrors.auto_model}"
                    type="text"
                    v-model="auto_model"
                />
            </div>
            <div class="form-field">
                <label class="field-label">Цвет</label>
                <input
                    name="auto_color"
                    class="field-input"
                    :class="{invalid: validationErrors.auto_color}"
                    type="text"
                    v-model="auto_color"
                />
            </div>
            <div class="form-field">
                <label class="field-label">Номер</label>
                <input
                    name="auto_number"
                    class="field-input"
                    :class="{invalid: validationErrors.auto_number}"
                    type="text"
                    v-model="auto_number"
                />
            </div>
            <div class="attributes-section">
                <p class="form-title">Атрибуты</p>
                <div class="attributes-container">
                    <div
                        class="attribute-wrapper"
                        v-for="attribute in autoAttributes"
                        :key="attribute.id"
                    >
                        <Checkbox
                            :checked="!!auto_attributes.find(a=>a.id===attribute.id)"
                            @click.native="toggleAutoAttribute(attribute.id)"
                        />
                        <p class="attribute-text">{{attribute.title}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="edit-driver-footer">
            <button
                v-if="currentView==='overview'"
                class="footer-btn primary"
                @click="currentView='editMain'"
            >Редактировать</button>
            <button
                v-else-if="currentView!=='overview'"
                class="footer-btn primary"
                @click="submitChanges"
            >Сохранить</button>
            <button class="footer-btn" @click="$emit('close-edit-driver')">Отменить</button>
        </div>
    </div>
</template>

<script>
import Checkbox from "../UI/Checkbox";

export default {
    name: "EditDriver",
    components: {
        Checkbox
    },
    computed: {
        autoAttributes() {
            return this.$store.state.driverAutoDetails.attributes;
        }
    },

    props: ["driverInfo"],
    data() {
        /*
      --overview
      --editMain
      --editSub
       */
        return {
            currentView: "overview",
            showBalance: false,
            showActionSelect: false,
            actionValue: null,
            balanceAction: "charge",
            id: this.driverInfo.id,
            name: this.driverInfo.name,
            balance: this.driverInfo.balance,
            driver_id: this.driverInfo.driver_id,
            name_for_taxophone: this.driverInfo.name_for_taxophone,
            phones: JSON.parse(JSON.stringify(this.driverInfo.phones)),
            comment: this.driverInfo.comment,
            password: this.driverInfo.password,
            auto_model: this.driverInfo.auto_model,
            auto_color: this.driverInfo.auto_color,
            auto_number: this.driverInfo.auto_number,
            auto_attributes: [...this.driverInfo.auto_attributes],
            validationErrors: {}
        };
    },

    methods: {
        returnToMain() {
            if (this.currentView === "editSub") this.currentView = "editMain";
        },
        selectAction(value) {
            this.balanceAction = value;
            this.showActionSelect = false;
        },
        acceptBalanceAction() {
            console.log("action accepted, type: ", this.balanceAction);
            if (this.actionValue) {
                switch (this.balanceAction) {
                    case "charge":
                        this.balance -= this.actionValue;
                        break;
                    case "fund":
                        this.balance += this.actionValue;
                        break;
                }
                this.balanceAction = "charge";
                this.actionValue = null;
                this.showBalance = false;
            }
        },
        cancelBalanceAction() {
            console.log("action cancelled");
            this.balanceAction = "charge";
            this.actionValue = null;
            this.showBalance = false;
        },
        setDriverPhone(e) {
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
                this.phones[0].phone = valueArr.join("");
            } else this.phones[0].phone = "";
        },
        submitChanges() {
            const fieldsToValidate = [
                "name",
                "driver_id",
                "name_for_taxophone",
                "password",
                "auto_model",
                "auto_color",
                "auto_number"
            ];
            this.validateFields(fieldsToValidate);
            if (!Object.keys(this.validationErrors).length) {
                const newDriver = {
                    id: this.id,
                    name: this.name,
                    driver_id: this.driver_id,
                    name_for_taxophone: this.name_for_taxophone,
                    phones: [...this.phones],
                    comment: this.comment,
                    password: this.password,
                    auto_model: this.auto_model,
                    auto_color: this.auto_color,
                    auto_number: this.auto_number,
                    auto_attributes: this.auto_attributes
                };
                this.$emit("edit-driver", newDriver);
                this.toggleCurrentView("overview");
            }
        },
        validateFields(fields) {
            console.log("in validation block");
            this.validationErrors = {};
            for (const field of fields) {
                if (typeof field === "string") {
                    if (!this[field]) this.validationErrors[field] = true;
                } else if (typeof field === "object" && Array.isArray(field)) {
                    const [fieldName, ...properties] = field;
                    for (const prop of properties) {
                        if (!this[fieldName][prop]) {
                            if (!this.validationErrors[fieldName])
                                this.validationErrors[fieldName] = { [prop]: true };
                            else this.validationErrors[fieldName][prop] = true;
                        }
                    }
                }
            }
        },
        toggleActionSelect() {
            this.showActionSelect = !this.showActionSelect;
        },
        toggleShowBalance() {
            console.log(this.showBalance);
            this.showBalance = !this.showBalance;
            console.log(this.showBalance);
        },
        toggleCurrentView(value) {
            this.currentView = value;
        },
        updateFieldToEdit(e) {
            this[e.target.name] = e.target.value;
        },
        toggleAutoAttribute(id) {
            if (this.auto_attributes.find(a => a.id === id)) {
                this.auto_attributes = this.auto_attributes.filter(a => a.id !== id);
            } else {
                this.auto_attributes = [
                    ...this.auto_attributes,
                    { ...this.autoAttributes.find(a => a.id === id) }
                ];
            }
        }
    }
};
</script>

<style scoped>
*:not(input) {
    user-select: none;
}
* {
    font-family: "Poppins", sans-serif;
    font-weight: normal;
    font-style: normal;
    line-height: 100%;
    outline: none;
}

.edit-driver-container {
    --text-small: 12px;
    --text-middle: 14px;
    --text-large: 16px;
    --dark-grey-bg: #e5e5e5;
    --light-grey-bg: #fafafa;
    --btn-text-color: #181c21;
    --btn-primary-selected: #f4f4f4;
    --btn-primary-bg: #fdbf5a;
    --btn-normal-bg: #f4f4f4;
    --btn-normal-selected-bg: #d8d8d8;

    position: absolute;
    top: 0;
    left: calc(100% + 20px);
    width: 360px;
    height: 585px;
}
.edit-driver-header {
    position: relative;
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
}

.header-control-btn {
    flex: 1;
    height: 100%;
    background-color: var(--dark-grey-bg);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out;
}
.header-control-btn.active {
    background-color: var(--btn-normal-selected-bg);
}

.header-control-btn:hover {
    background-color: var(--btn-normal-selected-bg);
}
.header-control-btn:first-child {
    border-top-left-radius: 8px;
}
.header-control-btn:last-child {
    border-top-right-radius: 8px;
}

.header-control-btn .btn-text {
    flex: 1;
    line-height: 45px;
    cursor: pointer;
    font-size: var(--text-middle);
    text-align: center;
}

.header-control-btn img {
    position: absolute;
    height: 6px;
    width: 8px;
}

.header-control-btn img#go-back {
    left: 10px;
    transform: rotate(90deg);
}

.header-control-btn img#drop {
    right: 10px;
}

.separator {
    position: absolute;
    width: 4px;
    height: 70%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fdbf5a;
}

.edit-driver-body {
    width: 100%;
    height: 467px;
    padding: 20px 30px 0 20px;
    background-color: var(--light-grey-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.edit-driver-body .form-title {
    line-height: 100%;
    font-size: var(--text-middle);
    margin-bottom: 20px;
}

.edit-driver-body .form-title.primary {
    font-size: var(--text-large);
}

.edit-driver-body .form-field {
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.review-item {
    width: 100%;
    font-size: var(--text-middle);
    display: flex;
    justify-content: space-between;
    margin-top: 17px;
}

.review-item:first-child {
    margin-top: 0;
}

.review-item p {
    width: 50%;
    line-height: 18px;
}

.form-field .field-label {
    font-size: var(--text-middle);
    letter-spacing: 0.5px;
}

.form-field .field-input {
    height: 35px;
    width: 200px;
    padding: 10px;
    font-size: var(--text-middle);
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #ececec;
}

.form-field .field-input[name="driver-phone"] {
    letter-spacing: 1.5px;
}

.form-field button.field-input {
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
}
.field-input.invalid {
    border: 1px solid rgba(255, 0, 0, 0.7);
}

.form-field.large {
    align-items: flex-start;
}
.form-field.large .field-label {
    margin-top: 8px;
}

.form-field.large .field-input {
    height: 56px;
    resize: none;
}

.attributes-section {
    width: 100%;
    margin-top: 20px;
}

.attributes-section .form-title {
    font-size: var(--text-middle);
    text-align: center;
}
.attributes-container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1.1fr;
    grid-template-rows: repeat(4, 17px) 20px;
    grid-row-gap: 20px;
}

.attribute-wrapper {
    display: flex;
    align-items: center;
}
.attribute-wrapper:nth-child(5n) {
    align-items: flex-start;
}

.attribute-wrapper .attribute-text {
    font-size: 12px;
    margin-left: 3px;
}

.edit-driver-footer {
    width: 100%;
    height: 80px;
    padding: 15px 20px 30px 20px;
    background: var(--dark-grey-bg);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 0px 0px 8px 8px;
}

.footer-btn {
    width: 130px;
    height: 35px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    cursor: pointer;
    transition: color 0.15s ease-in-out;
}
button.primary {
    background-color: var(--btn-primary-bg);
}
button.primary:hover {
    color: var(--btn-primary-selected);
}

/* Dropdown-related styles */
.balance-dropdown {
    position: absolute;
    top: 100%;
    left: -100%;
    width: 360px;
    height: 130px;
    z-index: 5;
    padding: 20px;
    background-color: var(--btn-normal-selected-bg);
}
.dropdown-section {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dropdown-section:first-child {
    align-items: flex-start;
}
.dropdown-section:last-child {
    align-items: flex-end;
}

.action-select,
.dropdown-input,
.dropdown-btn {
    width: 125px;
    height: 35px;
    border: none;
    border-radius: 5px;
    font-family: "Poppins", sans-serif;
    font-size: var(--text-middle);
}
.action-select,
.dropdown-btn {
    cursor: pointer;
    background-color: var(--btn-normal-bg);
}

.action-select {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.action-select .select-text {
    flex: 1;
    text-align: center;
    line-height: 35px;
}
.action-select img#select-drop {
    position: absolute;
    right: 10px;
}

.select-dropdown {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.select-item {
    width: 100%;
    height: 35px;
    padding: 5px 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ececec;
}
.select-item:first-child {
    border-radius: 5px 5px 0 0;
}
.select-item:last-child {
    border-radius: 0 0 5px 5px;
}
.select-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    transition: background-color 0.2s ease-in-out;
}
.select-item:not(.active) .select-text:hover {
    background-color: var(--light-grey-bg);
    cursor: pointer;
}

.dropdown-input {
    outline: none;
    text-align: center;
}

.dropdown-input::-webkit-outer-spin-button,
.dropdown-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>