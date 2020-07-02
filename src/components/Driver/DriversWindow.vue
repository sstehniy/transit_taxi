<template>
    <div class="whole-container">
        <div class="container-manage">
            <div class="controls">
                <div class="control filters" tabindex="-1" @focusout="statusOff">
                    <div class="control-name" @click="toggleStatusFilter">Водитель</div>
                    <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                    <div v-if="showStatusFilters" class="filter-dropdown">
                        <div
                            v-for="status in statusFilters"
                            :key="status.id"
                            class="dropdown-item"
                            :class="{selected: status.id === selectedStatusFilterId}"
                            @click="selectStatusFilter(status.id)"
                        >
                            <p class="filter-text">{{status.title}}</p>
                        </div>
                    </div>
                </div>
                <div class="control currents" tabindex="-1" @focusout="groupOff">
                    <div
                        class="control-name"
                        @click="toggleGroupFilter"
                    >{{groupFilters.find(g=>g.id===selectedGroupFilterId).title}}</div>
                    <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
                    <div v-if="showGroupFilters" class="filter-dropdown">
                        <div
                            v-for="group in groupFilters"
                            :key="group.id"
                            class="dropdown-item"
                            :class="{selected: group.id === selectedGroupFilterId}"
                            @click="selectGroupFilter(group.id)"
                        >
                            <p class="filter-text">{{group.title}}</p>
                        </div>
                    </div>
                </div>
                <div class="separator"></div>
            </div>
            <simplebar class="scrollable-drivers" data-simplebar-auto-hide="false" ref="scroll">
                <Driver
                    v-for="driver in drivers"
                    :key="driver.id"
                    :driverInfo="driver"
                    @open-edit-driver="toggleEditDriver(true, driver.id)"
                    @delete-driver="deleteDriver(driver.id)"
                />
            </simplebar>
            <div class="operations">
                <div class="operations-buttons">
                    <div
                        v-if="this.$route.name==='director'"
                        class="operations-button all-drivers"
                        @click="toggleCreateDriver(true)"
                    >+ Водитель</div>
                    <div
                        class="operations-button photo"
                        @click="showPhotoReview = !showPhotoReview"
                    >Фотоосмотр</div>
                </div>
                <div class="driver-counter">{{ this.drivers.length }}/100</div>
            </div>
        </div>
        <StatusSettings
            v-if="this.showSettings"
            class="status-settings"
            @close-settings="updateStatus"
        />
        <CreateDriver
            v-if="showCreateDriver"
            @close-create-driver="toggleCreateDriver(false)"
            @create-driver="createDriver"
        />
        <EditDriver
            v-if="showEditDriver"
            :driverInfo="drivers.find(d=>d.id === driverIdWaitingForChange)"
            @close-edit-driver="toggleEditDriver(false)"
            @edit-driver="editDriver"
        />
        <PhotoReviews v-if="showPhotoReview" />
    </div>
</template>

<script>
import { eventBus } from "@/main.js";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

import Driver from "./Driver.vue";
import StatusSettings from "../StatusSettings.vue";
import CreateDriver from "./CreateDriver.vue";
import EditDriver from "./EditDriver.vue";
import PhotoReviews from "./PhotoReviews.vue";

export default {
    components: {
        simplebar,
        Driver,
        StatusSettings,
        CreateDriver,
        EditDriver,
        PhotoReviews
    },
    computed: {
        drivers() {
            return this.$store.state.drivers;
        },
        statusFilters() {
            return this.$store.state.driverFilters.status;
        },
        groupFilters() {
            return this.$store.state.driverFilters.group;
        }
    },
    data() {
        return {
            showSettings: false,
            showCreateDriver: false,
            showEditDriver: false,
            showPhotoReview: false,
            showStatusFilters: false,
            showGroupFilters: false,
            driverIdWaitingForChange: null,
            selectedStatusFilterId: 0,
            selectedGroupFilterId: 0
        };
    },
    methods: {
        deleteDriver(driverId) {
            this.$store.dispatch("deleteDriver", driverId);
        },
        toggleCreateDriver(value) {
            if (this.showEditDriver) {
                this.showEditDriver = false;
                this.driverIdWaitingForChange = false;
            }
            if (this.showCreateDriver === value) return;
            this.showCreateDriver = value;
        },

        toggleEditDriver(value, driver_id = null) {
            if (value === false) {
                this.showEditDriver = value;
                this.driverIdWaitingForChange = driver_id;
                return;
            }
            if (this.showCreateDriver) {
                this.showCreateDriver = false;
                return;
            }
            this.showEditDriver = false;
            this.driverIdWaitingForChange = driver_id;
            setImmediate(() => {
                this.showEditDriver = true;
            });
        },
        toggleStatusFilter() {
            this.showGroupFilters = false;
            this.showStatusFilters = true;
        },
        toggleGroupFilter() {
            this.showStatusFilters = false;
            this.showGroupFilters = true;
        },
        selectStatusFilter(id) {
            this.selectedStatusFilterId = id;
            this.showStatusFilters = false;
        },
        selectGroupFilter(id) {
            this.selectedGroupFilterId = id;
            this.showGroupFilters = false;
        },
        createDriver($event) {
            this.$store.dispatch("createDriver", $event);
        },
        editDriver($event) {
            this.$store.dispatch("editDriver", $event);
        },
        handleScroll() {
            console.log("scroll");
        },
        statusOff() {
            this.showStatusFilters = false;
        },
        groupOff() {
            this.showGroupFilters = false;
        }
    },
    created() {
        eventBus.$on("openDriverInfoFromChat", driverId => {
            this.driverIdWaitingForChange = driverId;
            setImmediate(() => (this.showEditDriver = true));
        });
    },
    mounted() {
        document
            .querySelector(".container-manage")
            .addEventListener("resize", () => console.log("resize"));
    }
};
</script>

<style scoped>
.whole-container {
    max-width: calc(15px + 27vw);
    width: calc(15px + 27vw);
    min-width: 300px;
    position: relative;
}
.container-manage {
    background-color: #fff;

    display: flex;
    flex-direction: column;

    max-width: calc(15px + 27vw);
    min-width: 300px;
    min-height: 215px;
    height: calc(90vh - 105px);
    max-height: calc(90vh - 105px);
    border-radius: 8px;

    resize: vertical;
    overflow-y: auto;
    position: relative;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
}
.controls {
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    border-radius: 8px 8px 0 0;
    position: relative;
}
.separator {
    position: absolute;
    width: 2px;
    height: 70%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fdbf5a;
}
.control {
    width: 50%;
    height: 100%;
    font-size: 14px;
    position: relative;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    outline: none;
}
.control:hover {
    background-color: #d8d8d8;
}
.control-name {
    line-height: 45px;
    width: 100%;
    text-align: center;
    cursor: pointer;
}
.dropdown-icon {
    height: 4px;
    position: absolute;
    top: 21px;
    right: 10%;
}

.filter-dropdown {
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
}

.dropdown-item:not(:last-child) {
    margin-bottom: 5px;
}
.dropdown-item:hover {
    background-color: #fff;
}

.dropdown-item.selected {
    background-color: #fff;
}

.item-text {
    font-size: 14px;
}

.scrollable-drivers {
    width: 100%;
    height: calc(100% - 125px);
    max-height: calc(100% - 125px);
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    background-color: #f5f5f5;
    box-shadow: 0px 2px 15px rgba(103, 103, 103, 0.5);
}

.blank-separator {
    width: 100%;
    height: 10px;
    background-color: #fafafa;
}
.operations {
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0px;
    background-color: #fff;
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
    box-shadow: 0px 2px 15px rgba(103, 103, 103, 0.3);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
}
.operations-button:hover {
    color: #6b6565;
}

.all-drivers {
    background-color: #fdbf5a;
}
.photo {
    background-color: #f4f4f4;
    transition: background-color 0.2s ease-in-out;
}
.photo:hover {
    background-color: #fafafa;
}
.driver-counter {
    margin: 0 auto;
    margin-top: 8px;
    font-size: 12px;
}

.status-settings {
    position: absolute;
    z-index: 2;

    top: 45px;
    left: calc(100% - 13px);
}
</style>