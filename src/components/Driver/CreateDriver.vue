<template>
    <div class="create-driver-container">
        <div class="create-driver-header">
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
                        <button class="dropdown-btn primary" @click="setActionValue">Подтвердить</button>
                        <button class="dropdown-btn" @click="cancelBalanceAction">Отменить</button>
                    </div>
                </div>
            </div>
        </div>
        <simplebar v-if="currentForm==='main'" class="create-driver-body">
            <p class="form-title primary">Добавить водителя</p>
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
                    :value="driver_phone"
                    @keydown="setDriverPhone"
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
                    :class="{invalid: validationErrors.driver_auto}"
                    type="text"
                    @click="currentForm='sub'"
                >Добавить</button>
            </div>
            <div class="form-field large">
                <label for="comment" class="field-label">Комментарии</label>
                <textarea name="comment" class="field-input" type="text" v-model="comment" />
            </div>
        </simplebar>
        <simplebar v-else-if="currentForm==='sub'" class="create-driver-body">
            <p class="form-title primary">Выбор автомобиля</p>
            <div class="form-field">
                <label class="field-label">Марка</label>
                <input
                    class="field-input"
                    :class="{invalid: validationErrors.driver_auto && validationErrors.driver_auto.auto_model}"
                    type="text"
                    v-model="driver_auto.auto_model"
                />
            </div>
            <div class="form-field">
                <label class="field-label">Цвет</label>
                <input
                    class="field-input"
                    :class="{invalid: validationErrors.driver_auto && validationErrors.driver_auto.auto_color}"
                    type="text"
                    v-model="driver_auto.auto_color"
                />
            </div>
            <div class="form-field">
                <label class="field-label">Номер</label>
                <input
                    class="field-input"
                    :class="{invalid: validationErrors.driver_auto && validationErrors.driver_auto.auto_number}"
                    type="text"
                    v-model="driver_auto.auto_number"
                />
            </div>
            <div class="attributes-section">
                <p class="form-title">Атрибуты</p>
                <div class="attributes-container">
                    <div
                        class="attribute-wrapper"
                        v-for="attribute in autoAttributes"
                        :key="attribute.id"
                        @click="toggleAutoAttribute(attribute.id)"
                    >
                        <Checkbox
                            :checked="!!driver_auto.auto_attributes.find(a=>a.id===attribute.id)"
                        />
                        <p class="attribute-text">{{attribute.title}}</p>
                    </div>
                </div>
            </div>
        </simplebar>
        <div class="create-driver-footer">
            <button class="footer-btn primary" @click="submit">Сохранить</button>
            <button class="footer-btn" @click="$emit('close-create-driver')">Отменить</button>
        </div>
    </div>
</template>

<script>
import Checkbox from "@/components/UI/Checkbox.vue";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
export default {
    name: "CreateDriver",
    components: { Checkbox, simplebar },
    data() {
        return {
            currentForm: "main",
            showBalance: false,
            showActionSelect: false,
            balanceAction: "charge",
            balance: 0,
            actionValue: null,
            name: "",
            driver_id: "",
            name_for_taxophone: "",
            driver_phone: "",
            comment: "",
            password: "",
            driver_auto: {
                auto_model: null,
                auto_color: null,
                auto_number: null,
                auto_attributes: []
            },
            validationErrors: {}
        };
    },
    computed: {
        autoAttributes() {
            return this.$store.state.driverAutoDetails.attributes;
        }
    },
    methods: {
        returnToMain() {
            if (this.currentForm === "main") this.$emit("close-create-driver");
            this.currentForm = "main";
        },
        toggleShowBalance() {
            this.showBalance = !this.showBalance;
            this.balanceAction = "charge";
            this.actionValue = null;
        },
        toggleActionSelect() {
            console.log("eeee");
            this.showActionSelect = true;
        },
        selectAction(value) {
            this.balanceAction = value;
            this.showActionSelect = false;
        },
        setActionValue() {
            if (!this.actionValue) return;
            this.showBalance = false;
        },
        cancelBalanceAction() {
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
                this.driver_phone = valueArr.join("");
            } else this.driver_phone = "";
        },
        toggleAutoAttribute(id) {
            if (this.driver_auto.auto_attributes.find(a => a.id === id)) {
                this.driver_auto.auto_attributes = this.driver_auto.auto_attributes.filter(
                    a => a.id !== id
                );
            } else {
                this.driver_auto.auto_attributes = [
                    ...this.driver_auto.auto_attributes,
                    { ...this.autoAttributes.find(a => a.id === id) }
                ];
            }
        },
        submit() {
            const fieldsToValidate = [
                "name",
                "driver_id",
                "name_for_taxophone",
                "driver_phone",
                "password",
                ["driver_auto", "auto_model", "auto_color", "auto_number"]
            ];
            this.validateFields(fieldsToValidate);
            if (!Object.keys(this.validationErrors).length) {
                const newDriver = {
                    name: this.name,
                    driver_id: this.driver_id,
                    name_for_taxophone: this.name_for_taxophone,
                    phones: [{ phone: this.driver_phone, is_default: true, use_for_call: true }],
                    comment: this.comment,
                    password: this.password,
                    auto_model: this.driver_auto.auto_model,
                    auto_color: this.driver_auto.auto_color,
                    auto_number: this.driver_auto.auto_number,
                    auto_attributes: this.driver_auto.auto_attributes
                };
                this.$emit("create-driver", newDriver);
            }
        },
        validateFields(fields) {
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

.create-driver-container {
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
    left: 0;
    right: 0;
    bottom: 0;
    resize: vertical;
    overflow: auto;
    z-index: 100;
}

.create-driver-header {
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

.create-driver-body {
    width: 100%;
    height: calc(100% - 125px);
    max-height: calc(100% - 125px);
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    padding: 20px 30px 0 20px;
    background-color: var(--light-grey-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.create-driver-body .form-title {
    line-height: 100%;
    font-size: var(--text-middle);
    margin-bottom: 20px;
    text-align: center;
}

.create-driver-body .form-title.primary {
    font-size: var(--text-large);
}

.create-driver-body .form-field {
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    cursor: pointer;
}
.attribute-wrapper:nth-child(5n) {
    align-items: flex-start;
}

.attribute-wrapper .attribute-text {
    font-size: 12px;
    margin-left: 3px;
}

.create-driver-footer {
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
    width: 38%;
    height: 35px;
    font-size: var(--text-small);
    line-height: 35px;
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
    right: 0;
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