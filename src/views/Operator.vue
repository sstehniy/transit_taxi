<template>
    <div class="operator">
        <Header class="header" />
        <MenuControls class="menu-controls" />
        <OrdersWindow v-if="windows['orders']" class="dialogue-window" />
        <DriversWindow v-if="windows['drivers']" class="dialogue-window" />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MenuControls from "@/components/MenuControls.vue";
import OrdersWindow from "@/components/Order/OrdersWindow.vue";
import DriversWindow from "@/components/Driver/DriversWindow.vue";

/* this.$route.name */
export default {
    name: "operator",
    components: {
        Header,
        MenuControls,
        OrdersWindow,
        DriversWindow
    },
    computed: {
        windows() {
            return this.$store.state.windows;
        }
    }
};
</script>


<style scoped>
.operator {
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
}
.operator > * {
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
    margin-bottom: 20px;
}

.chat,
.reports {
    left: 33.3vw;
}
.map-settings {
    top: 78px;
    right: 3vw;
}

.statistics {
    position: absolute;
    bottom: 8px;
    right: 150px;
}

#map {
    position: absolute;
    z-index: 0;
    top: 45px;
    right: 0;
    bottom: 0;
    left: 0;
}
@media only screen and (min-width: 451px) and (max-width: 1280px) {
    #map {
        top: 45px;
    }
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

@media only screen and (min-width: 1920px) {
    .menu-controls,
    .map-settings {
        top: 103px;
    }
    .dialogue-window {
        top: 163px;
    }
}
</style>