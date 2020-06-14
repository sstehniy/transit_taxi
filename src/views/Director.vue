<template>
    <div class="director">
        <Header class="header" />
        <MenuControls class="menu-controls" />
        <OrdersWindow v-if="windows['orders']" class="dialogue-window" />
        <DriversWindow v-if="windows['drivers']" class="dialogue-window" />
        <ReportsWindow v-if="windows['reports']" class="dialogue-window reports" />
        <ChatsWindow v-if="windows['chat']" class="dialogue-window chat" />
        <MapFilters class="map-settings" />
        <div class="map" @click="closeOpenedTabs"></div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MenuControls from "@/components/MenuControls.vue";
import OrdersWindow from "@/components/Order/OrdersWindow.vue";
import DriversWindow from "@/components/Driver/DriversWindow.vue";
import ReportsWindow from "@/components/Report/ReportWindow.vue";
import ChatsWindow from "@/components/Chat/ChatsWindow.vue";
import MapFilters from "@/components/MapFilters.vue";

export default {
    name: "director",
    components: {
        Header,
        MenuControls,
        OrdersWindow,
        DriversWindow,
        ReportsWindow,
        ChatsWindow,
        MapFilters
    },
    computed: {
        windows() {
            return this.$store.state.windows;
        }
    },
    methods: {
        closeOpenedTabs() {
            for (const window in this.windows) {
                if (!this.windows[window]) continue;
                this.$store.commit("toggleWindow", window);
            }
        }
    }
};
</script>

<style scoped>
.director {
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
}
.director > * {
    position: absolute;
    z-index: 1;
}
.menu-controls {
    top: 78px;
    left: 3vw;
}
.dialogue-window {
    top: 138px;
    left: 3vw;
}

.chat,
.reports {
    left: 33.3vw;
}
.map-settings {
    top: 78px;
    right: 3vw;
}

.map {
    background-color: lightseagreen;
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
@media only screen and (max-width: 1280px) {
    .menu-controls,
    .map-settings {
        top: 63px;
    }
    .dialogue-window {
        top: 123px;
    }
}
</style>