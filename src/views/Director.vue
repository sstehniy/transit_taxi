<template>
    <div class="director">
        <Header />
        <MenuControls class="menu-controls" />
        <OrdersWindow v-if="this.$store.state.windows['orders']" class="dialogue-window" />
        <DriversWindow v-if="this.$store.state.windows['drivers']" class="dialogue-window" />
        <MapFilters class="map-settings" />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MenuControls from "@/components/MenuControls.vue";
import OrdersWindow from "@/components/OrdersWindow.vue";
import DriversWindow from "@/components/DriversWindow.vue";
import MapFilters from "@/components/MapFilters.vue";

export default {
    name: "director",
    components: {
        Header,
        MenuControls,
        OrdersWindow,
        DriversWindow,
        MapFilters
    }
};
</script>

<style scoped>
.director {
    position: relative;
}
.director > * {
    position: absolute;
}
.menu-controls {
    top: 78px;
    left: 3vw;
}
.dialogue-window {
    top: 138px;
    left: 3vw;
}
.map-settings {
    top: 78px;
    right: 3vw;
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