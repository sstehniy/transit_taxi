<template>
    <div class="create-driver-container">
        <div class="create-driver-header">
            <div class="header-control-btn" @click="returnToMain">
                <img alt="go-back-icon" id="go-back" :src="require('@/assets/drop-icon.svg')" />
                <p class="btn-text">Назад</p>
            </div>
            <div class="separator"></div>
            <div class="header-control-btn">
                <p class="btn-text">Баланс</p>
                <img alt="drop-icon" id="drop" :src="require('@/assets/drop-icon.svg')" />
            </div>
        </div>
        <div v-if="currentForm==='main'" class="create-driver-body">
            <p class="form-title">Добавить водителя</p>
            <div class="form-field">
                <label class="field-label">Ф.И.О</label>
                <input class="field-input" type="text" v-model="full_name" />
            </div>
            <div class="form-field">
                <label class="field-label">ИД водителя</label>
                <input class="field-input" type="text" v-model="driver_id" />
            </div>
            <div class="form-field">
                <label class="field-label">Позывной</label>
                <input class="field-input" type="text" v-model="call" />
            </div>
            <div class="form-field">
                <label class="field-label">Телефон</label>
                <input class="field-input" type="text" v-model="driver_phone" />
            </div>
            <div class="form-field">
                <label class="field-label">Пароль</label>
                <input class="field-input" type="text" v-model="password" />
            </div>
            <div class="form-field">
                <label class="field-label">Автомобиль</label>
                <button class="field-input" type="text" @click="currentForm='sub'">Добавить</button>
            </div>
            <div class="form-field large">
                <label class="field-label">Комментарии</label>
                <textarea class="field-input" type="text" />
            </div>
        </div>
        <div v-else-if="currentForm==='sub'" class="create-driver-body">
            <p class="form-title">Выбор автомобиля</p>
        </div>
        <div class="create-driver-footer">
            <button class="footer-btn primary">Сохранить</button>
            <button class="footer-btn" @click="$emit('close-create-driver')">Отменить</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateDriver",
    data() {
        return {
            currentForm: "main",
            full_name: "",
            driver_id: "",
            call: "",
            driver_phone: "",
            password: "",
            driver_auto: {
                auto_model: null,
                auto_color: null,
                auto_number: null,
                auto_attributes: []
            }
        };
    },
    methods: {
        returnToMain() {
            if (this.currentForm === "main") return;
            this.currentForm = "main";
        },
        updateAutoInfo(fieldName, value) {
            this.driver_auto[fieldName] = value;
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
}

.create-driver-container {
    --text-small: 12px;
    --text-middle: 13px;
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
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out;
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
    height: 467px;
    padding: 20px 30px 0 20px;
    background-color: var(--light-grey-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.create-driver-body .form-title {
    line-height: 100%;
    font-size: var(--text-large);
    margin-bottom: 20px;
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

.form-field button.field-input {
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
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
    width: 130px;
    height: 35px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    cursor: pointer;
    transition: color 0.15s ease-in-out;
}
.footer-btn.primary {
    background-color: var(--btn-primary-bg);
}
.footer-btn.primary:hover {
    color: var(--btn-primary-selected);
}
</style>