<template>
    <div class="info-container">
        <div class="info-header">
            <div class="header-btn" tabindex="-1" @focusout="filterOff">
                <p
                    class="btn-text"
                    @click="toggleCityFilters"
                >{{cityFilters.find(c=>c.id===selectedCityFilterId).title}}</p>
                <img src="@/assets/drop-icon.svg" alt="drop-icon" id="drop" />
                <div v-if="showCityFilters" class="dropdown">
                    <div
                        v-for="city in cityFilters"
                        :key="city.id"
                        class="dropdown-item"
                        :class="{selected: city.id===selectedCityFilterId}"
                        @click="selectCityFilter(city.id)"
                    >
                        <p class="item-text">{{city.title}}</p>
                    </div>
                </div>
            </div>
            <div class="header-btn" tabindex="-1" @focusout="filterOff">
                <p
                    class="btn-text"
                    @click="toggleGroupFilters"
                >{{groupFilters.find(g=>g.id===selectedGroupFilterId).title}}</p>
                <img src="@/assets/drop-icon.svg" alt="drop-icon" id="drop" />
                <div v-if="showGroupFilters" class="dropdown">
                    <div
                        v-for="group in groupFilters"
                        :key="group.id"
                        class="dropdown-item"
                        :class="{selected: group.id===selectedGroupFilterId}"
                        @click="selectGroupFilter(group.id)"
                    >
                        <p class="item-text">{{group.title}}</p>
                    </div>
                </div>
            </div>
            <div class="separator"></div>
        </div>
        <div class="info-body">
            <simplebar class="info-list" data-simplebar-auto-hide="false">
                <div v-for="message in infoMessages" :key="message.id" class="message-container">
                    <p class="message-text">{{message.text}}</p>
                    <span id="created-time">{{message.time}}</span>
                </div>
            </simplebar>
            <div v-if="this.$route.name==='director'" class="input-wrapper">
                <input type="text" v-model="newMessage" placeholder="Ввод сообщения" />
                <div class="underline"></div>
            </div>
        </div>
        <div class="info-footer">
            <div v-if="this.$route.name==='director'" class="footer-btn" @click="createMessage">
                <p class="btn-text">Отправить</p>
            </div>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
    name: "InfoWindow",
    components: {
        simplebar
    },
    computed: {
        infoMessages() {
            return this.$store.state.infos.messages;
        },
        cityFilters() {
            return this.$store.state.infos.cities;
        },
        groupFilters() {
            return this.$store.state.infos.groups;
        }
    },
    data() {
        return {
            showCityFilters: false,
            showGroupFilters: false,
            selectedCityFilterId: 0,
            selectedGroupFilterId: 0,
            newMessage: ""
        };
    },
    methods: {
        toggleCityFilters() {
            this.showGroupFilters = false;
            this.showCityFilters = !this.showCityFilters;
        },
        toggleGroupFilters() {
            this.showCityFilters = false;
            this.showGroupFilters = !this.showGroupFilters;
        },
        selectCityFilter(id) {
            this.selectedCityFilterId = id;
            this.showCityFilters = false;
        },
        selectGroupFilter(id) {
            this.selectedGroupFilterId = id;
            this.showGroupFilters = false;
        },
        createMessage() {
            console.log("sendind message");
        },
        filterOff() {
            this.showCityFilters = false;
            this.showGroupFilters = false;
        }
    }
};
</script>

<style scoped>
.info-container {
    width: calc(15px + 27vw);
    min-width: 300px;
    min-height: 215px;
    height: calc(90vh - 105px);
    max-height: calc(90vh - 105px);
    border-radius: 8px;
    background-color: lightsalmon;
    resize: vertical;
    overflow: auto;
}

.info-header {
    width: 100%;
    height: 38px;
    position: relative;
    display: flex;
    align-items: center;
}

.header-btn {
    position: relative;
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e5e5e5;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
}

.header-btn img#drop {
    position: absolute;
    right: 10px;
    height: 5px;
    width: 8px;
}

.header-btn:first-child {
    border-radius: 5px 0px 0px 0px;
}

.header-btn:last-child {
    border-radius: 0px 5px 0px 0px;
}

.header-btn:hover {
    background-color: #d8d8d8;
}

.btn-text {
    font-size: 14px;
    width: 100%;
    line-height: 38px;
    text-align: center;
}

.dropdown {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 5px 10px 0px 10px;
    background-color: #d8d8d8;
}

.dropdown-item {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.dropdown-item:hover {
    background-color: #fafafa;
}

.dropdown-item.selected {
    background-color: #fafafa;
}

.item-text {
    font-size: 14px;
}
.separator {
    position: absolute;
    height: 28px;
    width: 3px;
    background-color: #fdbf5a;
    left: calc(50% - 1.5px);
}

.info-body {
    width: 100%;
    height: calc(100% - 103px);
    background-color: #fafafa;
}

.info-list {
    width: 100%;
    height: calc(100% - 45px);
    padding: 10px 20px 10px 10px;
}

.message-container {
    width: 100%;
    min-height: 85px;
    position: relative;
    background-color: #fdbf5a;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 7px 5px;
}

p.message-text {
    font-size: 12px;
}

span#created-time {
    font-size: 10px;
    color: #020202;
    opacity: 0.5;
    position: absolute;
    right: 10px;
    bottom: 0;
}

.input-wrapper {
    position: relative;
    width: 100%;
    height: 45px;
    background-color: #f4f4f4;
    padding: 10px 0 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

input {
    height: 15px;
    width: 94.5%;
    border: none;
    outline: none;
    border-left: 2px solid #020202;
    background-color: transparent;
    padding: 0 5px;
    color: #020202;
}

input::placeholder {
    color: #020202;
}

.underline {
    position: absolute;
    width: 94.5%;
    height: 1.5px;
    bottom: 10px;
    background-color: #020202;
}

.info-footer {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 25px;
    border-radius: 0px 0px 8px 8px;
    background-color: #e5e5e5;
}

.footer-btn {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    text-align: center;
    background-color: #fdbf5a;
    cursor: pointer;
}
.footer-btn .btn-text {
    line-height: 35px;
}
</style>