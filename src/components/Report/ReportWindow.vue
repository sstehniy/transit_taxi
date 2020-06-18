<template>
    <div class="reports-container">
        <div class="reports-header">
            <div class="header-top">
                <div
                    class="header-btn"
                    :class="{active: activeTab==='drivers'}"
                    @click="toggleTab('drivers')"
                >
                    <p class="btn-text">Водители</p>
                </div>
                <div class="separator lg left"></div>
                <div
                    class="header-btn"
                    :class="{active: activeTab==='orders'}"
                    @click="toggleTab('orders')"
                >
                    <p class="btn-text">Заказы</p>
                </div>
                <div class="separator lg right"></div>
                <div class="header-btn extended" :class="{active: showDateFilter}">
                    <p class="btn-text" @click="toggleDateFilter">Сегодня</p>
                    <div class="date-filter-controls" v-if="showDateFilter">
                        <div class="filter-main">
                            <div class="filter-field">
                                <label class="filter-label">Период:</label>
                                <div class="filter-input extended">
                                    <p
                                        class="filter-text"
                                        @click="togglePeriodDropdown"
                                    >{{datePeriods.find(dp=>dp.id===currentDatePeriodId).title}}</p>
                                    <img
                                        alt="drop-icon"
                                        id="drop"
                                        :src="require('@/assets/drop-icon.svg')"
                                    />
                                    <div v-if="showPeriodDropdown" class="dropdown-container">
                                        <div
                                            v-for="period in datePeriods"
                                            :key="period.id"
                                            class="dropdown-item"
                                            :class="{selected: period.id === currentDatePeriodId}"
                                            @click="selectDatePeriod(period.id)"
                                        >
                                            <p class="item-text">{{period.title}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-field">
                                <label for="date" class="filter-label">Дата:</label>
                                <input
                                    type="text"
                                    name="date"
                                    class="filter-input"
                                    placeholder="12/05/2020"
                                    maxlength="10"
                                    :value="dateFilterInput"
                                    @keyup="setFormattedDate"
                                />
                            </div>
                        </div>
                        <div class="filter-footer">
                            <div class="btn primary" @click="confirmDateFilter">
                                <p class="btn-text">Подтвердить</p>
                            </div>
                            <div class="btn" @click="cancelDateFilter">
                                <p class="btn-text">Отмена</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom" v-if="activeTab==='orders'">
                <div class="header-btn">
                    <img alt="drop-icon" id="drop" :src="require('@/assets/drop-icon.svg')" />
                    <p class="btn-text" @click="showOrderGroups = !showOrderGroups">Группа заказа</p>
                    <div v-if="showOrderGroups" class="dropdown-container">
                        <div
                            v-for="group in orderGroups"
                            :key="group.id"
                            class="dropdown-item"
                            :class="{selected: group.id === currentOrderGroupId}"
                            @click="selectOrderGroup(group.id)"
                        >
                            <p class="item-text">{{group.title}}</p>
                        </div>
                    </div>
                </div>
                <div class="separator sm"></div>
                <div class="header-btn">
                    <img alt="drop-icon" id="drop" :src="require('@/assets/drop-icon.svg')" />
                    <p class="btn-text" @click="showExportGroups = !showExportGroups">Группа вывоза</p>
                    <div v-if="showExportGroups" class="dropdown-container">
                        <div
                            v-for="group in exportGroups"
                            :key="group.id"
                            class="dropdown-item"
                            :class="{selected: group.id === currentExportGroupId}"
                            @click="selectExportGroup(group.id)"
                        >
                            <p class="item-text">{{group.title}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom" v-else-if="activeTab==='drivers'">
                <div class="header-btn">
                    <img alt="drop-icon" id="drop" :src="require('@/assets/drop-icon.svg')" />
                    <p class="btn-text" @click="showCrewGroups = !showCrewGroups">Группа экипажа</p>
                    <div v-if="showCrewGroups" class="dropdown-container">
                        <div
                            v-for="group in crewGroups"
                            :key="group.id"
                            class="dropdown-item"
                            :class="{selected: group.id === currentCrewGroupId}"
                            @click="selectCrewGroup(group.id)"
                        >
                            <p class="item-text">{{group.title}}</p>
                        </div>
                    </div>
                </div>
                <div class="separator sm"></div>
                <div class="header-btn">
                    <img alt="drop-icon" id="drop" :src="require('@/assets/drop-icon.svg')" />
                    <p class="btn-text" @click="showCrewMembers = !showCrewMembers">Член экипажа</p>
                    <div v-if="showCrewMembers" class="dropdown-container">
                        <div
                            v-for="group in crewMembers"
                            :key="group.id"
                            class="dropdown-item"
                            :class="{selected: group.id === currentCrewMemberId}"
                            @click="selectCrewMember(group.id)"
                        >
                            <p class="item-text">{{group.title}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <simplebar data-simplebar-auto-hide="false" class="reports-body">
            <div class="header">Статистика за: {{dateFilter.date}}</div>
            <div v-if="activeTab==='orders'" class="reports">
                <div class="report">
                    <p>Количество заказов</p>
                    <p>0</p>
                </div>
                <div class="report">
                    <p>Сумма заказов</p>
                    <p>0 Евро</p>
                </div>
            </div>
            <div v-if="activeTab==='drivers'" class="reports">
                <div class="report">
                    <p>Счёт бригадира</p>
                    <p>0 Евро</p>
                </div>
                <div class="report">
                    <p>Счёт водителя</p>
                    <p>0 Евро</p>
                </div>
                <div class="report">
                    <p>Количество заказов</p>
                    <p>0</p>
                </div>
                <div class="report">
                    <p>Сумма заказов</p>
                    <p>0 Евро</p>
                </div>
                <div class="report">
                    <p>Сумма прихода</p>
                    <p>0 Евро</p>
                </div>
                <div class="report">
                    <p>Сумма расхода</p>
                    <p>0 Евро</p>
                </div>
            </div>
        </simplebar>

        <div class="reports-footer">
            <div class="btn primary">Скачать</div>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
export default {
    name: "ReportWindow",
    components: {
        simplebar
    },
    computed: {
        drivers() {
            return this.$store.state.drivers;
        },
        orders() {
            return this.$store.state.orders;
        },
        datePeriods() {
            return this.$store.state.reportDetails.datePeriods;
        },
        orderGroups() {
            return this.$store.state.reportDetails.orders.orderGroups;
        },
        exportGroups() {
            return this.$store.state.reportDetails.orders.exportGroups;
        },
        crewGroups() {
            return this.$store.state.reportDetails.drivers.crewGroups;
        },
        crewMembers() {
            return this.$store.state.reportDetails.drivers.crewMembers;
        }
    },
    data() {
        return {
            activeTab: "drivers",
            //top header row
            showDateFilter: false,
            showPeriodDropdown: false,
            currentDatePeriodId: 0,
            dateFilterInput: `${new Date().getDate()}/${new Date().getMonth() +
                1}/${new Date().getFullYear()}`,
            dateFilter: {
                period: null,
                date: null
            },
            // bottom header row
            showOrderGroups: false,
            showExportGroups: false,
            showCrewGroups: false,
            showCrewMembers: false,
            currentOrderGroupId: 0,
            currentExportGroupId: 0,
            currentCrewGroupId: 0,
            currentCrewMemberId: 0
        };
    },
    methods: {
        toggleTab(tabName) {
            this.showOrderGroups = false;
            this.showExportGroups = false;
            this.showCrewGroups = false;
            this.showCrewMembers = false;
            this.activeTab = tabName;
        },
        toggleDateFilter() {
            this.showDateFilter = !this.showDateFilter;
        },
        togglePeriodDropdown() {
            this.showPeriodDropdown = !this.showPeriodDropdown;
        },
        confirmDateFilter() {
            if (this.dateFilterInput) {
                this.dateFilter.period = this.datePeriods.find(
                    p => p.id === this.currentDatePeriodId
                );
                this.dateFilter.date = this.dateFilterInput;
                this.toggleDateFilter();
            }
        },
        cancelDateFilter() {
            this.currentDatePeriodId = 0;
            this.dateFilterInput = `${new Date().getDate()}/${new Date().getMonth() +
                1}/${new Date().getFullYear()}`;
            this.toggleDateFilter();
        },
        selectDatePeriod(periodId) {
            this.currentDatePeriodId = periodId;
            this.togglePeriodDropdown();
        },
        setFormattedDate(e) {
            if (e.keyCode !== 8) {
                const valueArr = e.target.value.split("");
                if (valueArr.length === 2 || valueArr.length === 5) {
                    valueArr.push("/");
                }
                this.dateFilterInput = valueArr.join("");
            } else this.dateFilterInput = "";
        },
        selectOrderGroup(groupId) {
            this.currentOrderGroupId = groupId;
            this.showOrderGroups = false;
        },
        selectExportGroup(groupId) {
            this.currentExportGroupId = groupId;
            this.showExportGroups = false;
        },
        selectCrewGroup(groupId) {
            this.currentCrewGroupId = groupId;
            this.showCrewGroups = false;
        },
        selectCrewMember(groupId) {
            this.currentCrewMemberId = groupId;
            this.showCrewMembers = false;
        }
    }
};
</script>

<style scoped>
* {
    font-family: "Poppins", sans-serif;
    font-weight: normal;
    font-style: normal;
    line-height: 100%;
    outline: none;
}

*:not(input) {
    user-select: none;
}

.reports-container {
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

    /* width: 365px;
    height: 585px; */
    max-width: calc(15px + 27vw);
    min-width: 300px;
    width: calc(15px + 20vw);
    min-height: 215px;
    height: 80vh;
    max-height: 80vh;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    background-color: transparent;
    border-radius: 8px;
    resize: vertical;
    overflow-y: auto;
}

.btn {
    width: 120px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: var(--text-small);
    cursor: pointer;
    background-color: var(--btn-normal-bg);
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
}
.btn.primary {
    background-color: var(--btn-primary-bg);
    transition: color 0.15s ease-in-out;
}

.btn.primary:hover {
    color: var(--btn-primary-selected);
}

.reports-header {
    position: relative;
    width: 100%;
    height: 73px;
}

.reports-header .header-top,
.reports-header .header-bottom {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
}

.reports-header .header-top {
    position: absolute;
    z-index: 200;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
}
.reports-header .header-bottom {
    top: 38px;
}

.header-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--dark-grey-bg);
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
}
.header-btn:hover {
    background-color: var(--btn-normal-selected-bg);
}

.header-btn.active {
    background-color: var(--btn-normal-selected-bg);
    color: #383b41;
}

.header-btn.extended {
    position: relative;
}

.header-btn img#drop {
    position: absolute;
    right: 12px;
    height: 6px;
    width: 8px;
}
.header-btn .btn-text {
    text-align: center;
    line-height: 400%;
    flex: 1;
    cursor: pointer;
}
.header-top .header-btn .btn-text {
    font-size: var(--text-middle);
}

.header-bottom .header-btn .btn-text {
    font-size: var(--text-small);
}

.header-top .header-btn {
    width: 50%;
    height: 38px;
}

.header-top .header-btn:first-child {
    border-radius: 8px 0px 0px 0px;
}

.header-top .header-btn:last-child {
    border-radius: 0px 8px 0px 0px;
}

.header-bottom .header-btn {
    width: 100%;
    height: 35px;
    background-color: #ececec;
}

.separator {
    position: absolute;
    width: 3px;
    background-color: #fdbf5a;
}
.separator.sm {
    height: 25px;
    left: 50%;
    transform: translateX(-50%);
}

.separator.lg {
    height: 28px;
}

.separator.lg.left {
    right: 66%;
}
.separator.lg.right {
    right: 33%;
}

/* Date filter section */

.date-filter-controls {
    position: absolute;
    top: 100%;
    left: -200%;
    right: 0;

    padding: 20px;
    background-color: var(--btn-normal-selected-bg);
}

.date-filter-controls .filter-main {
    display: flex;
    flex-direction: column;
}

.date-filter-controls .filter-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.filter-main .filter-field {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.filter-field .filter-label {
    font-size: var(--text-middle);
    color: #000;
}
.filter-field .filter-input {
    height: 35px;
    width: 200px;
    border: none;
    border-radius: 5px;
    background-color: var(--light-grey-bg);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.filter-field .filter-input.extended {
    position: relative;
    cursor: pointer;
}
.filter-input.extended img#drop {
    position: absolute;
}

.filter-input .filter-text {
    font-size: var(--text-small);
    text-align: center;
    flex: 1;
    line-height: 400%;
}
/* Period dropdown styles */
.dropdown-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 5px 10px;
    background-color: #ececec;
    border-radius: 5px;
}

.dropdown-container .dropdown-item {
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dropdown-item:hover {
    background-color: var(--light-grey-bg);
}
.dropdown-item.selected {
    background-color: var(--light-grey-bg);
}
.dropdown-item .item-text {
    font-size: var(--text-small);
}

.reports-body {
    background-color: var(--light-grey-bg);
    width: 100%;
    height: calc(100% - 138px);
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    color: #020202;
}

.reports-body .header {
    text-align: center;
    font-size: var(--text-middle);
}
.reports-body .reports {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.reports .report {
    margin-top: 20px;
    padding-bottom: 6px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e2dfdf;
    font-size: var(--text-middle);
}

.reports-footer {
    background-color: var(--dark-grey-bg);
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 8px 8px;
}
</style>