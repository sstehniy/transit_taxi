<template>
    <div class="map-settings-container">
        <DropdownButton
            v-for="(setting, index) in mapSettings"
            :key="`setting-${index}`"
            :dropdownInfo="setting"
            :class="`setting-${index}`"
        />
    </div>
</template>

<script>
import DropdownButton from "@/components/DropdownButton.vue";
export default {
    components: {
        DropdownButton
    },
    data() {
        return {
            mapSettings: {
                cities: ["Город 1", "Город 2", "Город 3", "Город 4"],
                groups: ["Группа 1", "Группа 2", "Группа 3", "Группа 4"],
                orderStates: ["Свободные", "На заказе", "Все"]
            }
        };
    },
    methods: {
        closeFilters() {
            console.log("received");
        }
    }
};
</script>

<style scoped>
.map-settings-container {
    position: relative;
    width: 130px;
}
.map-settings-container > * {
    position: absolute;
}
.setting-cities {
    z-index: 10;
}
.setting-groups {
    z-index: 9;
    top: 45px;
}
.setting-orderStates {
    z-index: 8;
    top: 90px;
}
</style>