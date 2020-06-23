<template>
    <div class="order-info-container">
        <div class="order-info-header">
            <div class="header-control-btn" @click="returnToMain">
                <img alt="go-back-icon" id="go-back" :src="require('@/assets/drop-icon.svg')" />
                <p class="btn-text">Назад</p>
            </div>
            <div class="separator"></div>
            <div class="header-control-btn">
                <div class="control-name" @click="toggleDropdownSettings">{{ orderInfoWindow }}</div>
                <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                <div v-if="showDropdownSettings" class="dropdown-settings">
                    <div class="dropdown-item" @click="selectSetting('Чек')">Чек</div>
                    <div class="dropdown-item" @click="selectSetting('Информация')">Информация</div>
                </div>
            </div>
        </div>
        <simplebar v-if="orderInfoWindow === 'Чек'" class="order-info-body">
            <div class="order-number">&#8470;{{ "*api" }}</div>
            <div class="client-info">
                <div class="number">
                    <div>Телефон клиента:</div>
                    <div>х-ххх-ххх-хх-хх</div>
                    <img src="@/assets/acceptcall-icon.svg" class="call-button" />
                </div>
                <div
                    class="long-block"
                >Комментарии к клиенту: ххххххххххххххххххххххххххххххххххххххххххххххххххх</div>
                <div class="client-group">Клиентская группа: ххххххххххххххх</div>
            </div>
            <div class="destinations">
                <div class="origin">
                    <div>Адрес подачи:</div>
                    <div class="address">
                        <p>{{ this.orderObject.source }}</p>
                        <img src="@/assets/pinpoint-icon.svg" />
                    </div>
                </div>
                <div class="stops">
                    <div
                        v-for="(stop, index) in orderObject.stops"
                        :key="index"
                        class="destination"
                    >
                        <div>Адресс назаначения {{ index + 1 }}</div>
                        <div class="address">
                            <p>{{ stop.address }}</p>
                            <img src="@/assets/pinpoint-icon.svg" />
                        </div>
                    </div>
                </div>
                <div class="destination">
                    <div>Место назаначения:</div>
                    <div class="address">
                        <p>{{ this.orderObject.destination }}</p>
                        <img src="@/assets/pinpoint-icon.svg" />
                    </div>
                </div>
            </div>
            <div class="periferal-info">
                <div
                    class="long-block"
                >Аттрибуты: ххххххххххххххххххххххххххххххххххххххххххххххххххх</div>
                <div
                    class="long-block"
                >Комментарии к заказу: ххххххххххххххххххххххххххххххххххххххххххххххххххх</div>
            </div>
            <div class="timestamps">
                <div class="accepted">
                    <p>Время принятия:</p>
                    <div>
                        <img src="@/assets/time-icon.svg" />
                        <p>13:45</p>
                        <p>12/05/2020</p>
                    </div>
                </div>
                <div class="preorder">
                    <p>Предварительный:</p>
                    <div>
                        <img src="@/assets/time-icon.svg" />
                        <p>13:45</p>
                        <p>12/05/2020</p>
                    </div>
                </div>
            </div>
            <div class="driver-info">
                <p>Группа: Группа 1</p>
                <p>Экипаж: Экипаж 1</p>
                <p>Статус: Заказ отправлен водителю</p>
                <p>Время подачи авто: 3:40 минуты</p>
                <div class="number">
                    <div>Телефон водителя:</div>
                    <div>х-ххх-ххх-хх-хх</div>
                    <img src="@/assets/acceptcall-icon.svg" class="call-button" />
                </div>
            </div>
            <div class="price">
                <p>Тариф: Тариф 1</p>
                <p>Стоимость: 240 руб</p>
                <p>Чек заказа: хххххх</p>
            </div>
            <div class="client-history">
                <p>История заказов клиента:</p>
                <p>Количество заказов: 5</p>
                <p>Количество отказов: 0</p>
                <p>Количество бонусов: 100</p>
            </div>
        </simplebar>
        <simplebar v-else class="order-info-body">
            <table style="width: 100%">
                <tr class="titles">
                    <th></th>
                    <th>Значение</th>
                    <th>Сумма</th>
                </tr>
                <tr>
                    <td class="category">Общее время</td>
                    <td>0:03:04</td>
                    <td>0:03:04</td>
                </tr>
                <tr>
                    <td class="category">Общее расстояние</td>
                    <td>2.26 км</td>
                    <td>2.26 км</td>
                </tr>
                <tr>
                    <td class="category">По городу</td>
                    <td>0.00 км</td>
                    <td>0.00 км</td>
                </tr>
                <tr>
                    <td class="category">За городом</td>
                    <td>2.23 км</td>
                    <td>2.23 км</td>
                </tr>
                <tr>
                    <td class="category">Простой</td>
                    <td>0:00:11</td>
                    <td>0:00:11</td>
                </tr>
                <tr>
                    <td class="category">Минимум</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td class="category">Сумма без скидки</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td class="category">Сумма со скидкой</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </table>
        </simplebar>
        <div class="operations">
            <div class="operations-buttons">
                <div class="operations-button add-order" @click="newOrder">+ &nbsp; &nbsp; Заказ</div>
                <div class="operations-button refresh">Обновить</div>
            </div>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
    name: "OrderInfo",
    components: {
        simplebar
    },
    data() {
        return {
            orderInfoWindow: "Чек",
            showDropdownSettings: false
        };
    },
    props: {
        orderObject: Object
    },
    methods: {
        returnToMain() {
            this.$emit("close-order-info");
        },
        toggleDropdownSettings() {
            this.showDropdownSettings = !this.showDropdownSettings;
        },
        selectSetting(setting) {
            this.orderInfoWindow = setting;
            this.toggleDropdownSettings();
        },
        newOrder() {
            this.$emit("openNewOrder");
        }
    }
};
</script>

<style scoped>
.order-info-container {
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

    background: lightcoral;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 8px;
}
.order-info-header {
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
    cursor: pointer;
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

.control-name {
    line-height: 45px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    font-size: var(--text-middle);
}

.dropdown-icon {
    height: 4px;
    position: absolute;
    top: 21px;
    right: 10%;
    cursor: pointer;
}

.dropdown-settings {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 5px 10px;
    background: #d8d8d8;
    border-radius: 0px 5px 5px 5px;
}

.dropdown-item {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    font-size: var(--text-middle);
}

.dropdown-item:not(:last-child) {
    margin-bottom: 5px;
}
.dropdown-item:hover {
    background-color: #fafafa;
}

.dropdown-item.selected {
    background-color: #fafafa;
}

.order-info-body {
    width: 100%;
    height: calc(100% - 125px);
    max-height: calc(100% - 125px);
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    padding: 15px 20px 0 15px;
    background-color: var(--light-grey-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--text-middle);
    padding-bottom: 20px;
}

.client-info {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 3px;
    border-bottom: 1px black solid;
}
.client-info > *,
.periferal-info > *,
.destinations > *,
.timestamps > *,
.driver-info > *,
.price > *,
.client-history > * {
    margin-top: 3px;
}
.destinations,
.periferal-info,
.timestamps,
.driver-info,
.price,
.client-history {
    margin-top: 20px;
    border-bottom: 1px black solid;
    padding-bottom: 3px;
}
.number {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.long-block {
    word-break: break-all;
}

.address {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.timestamps > * {
    display: flex;
    flex-direction: row;
}
.timestamps > * p {
    margin-right: 8%;
}
.timestamps > * div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
table {
    border-collapse: collapse;
}
th,
td {
    text-align: center;
    padding-bottom: 5px;
    padding-top: 10px;
}
th {
    padding-top: 5px;
    padding-bottom: 15px;
    font-weight: normal;
}
tr {
    border-bottom: 1px solid #e2dfdf;
}
.category {
    text-align: start;
    padding-left: 10px;
}
.titles {
    border: none;
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
</style>