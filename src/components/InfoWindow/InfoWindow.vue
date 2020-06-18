<template>
    <div class="info-container">
        <div class="info-header">
            <div class="header-btn">
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

            <div class="header-btn">
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
                        :class="{selected: group.id===selectedGroupFilter}"
                        @click="selectGroupFilter(group.id)"
                    >
                        <p class="item-text">{{group.title}}</p>
                    </div>
                </div>
            </div>
            <div class="separator"></div>
        </div>
        <div class="info-body">
            <simplebar class="info-list" data-simplebar-auto-hide="false"></simplebar>
            <div class="input-wrapper">
                <input type="text" v-model="newInfoMessage" />
                <div class="underline"></div>
            </div>
        </div>
        <div class="info-footer">
            <div class="footer-btn" @click="sendMessage">Отправить</div>
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
    }
};
</script>

<style scoped>
.info-container {
    width: calc(15px + 27vw);
    min-width: 300px;
    min-height: 215px;
    height: 80vh;
    max-height: 80vh;
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

.btn-text {
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px 10px 10px;
}

.input-wrapper {
    width: 100%;
    height: 45px;
    background-color: #f4f4f4;
}

.info-footer {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 8px 8px;
    background-color: #e5e5e5;
}

.footer-btn {
    width: 310px;
    height: 35px;
    border-radius: 5px;
    background-color: #fdbf5a;
}
</style>