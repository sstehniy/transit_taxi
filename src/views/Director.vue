<template>
    <div class="director">
        <Header class="header" />
        <MenuControls class="menu-controls" />
        <OrdersWindow v-if="windows['orders']" class="dialogue-window" />
        <DriversWindow v-if="windows['drivers']" class="dialogue-window" />
        <ReportsWindow v-if="windows['reports']" class="dialogue-window reports" />
        <InfoWindow v-if="windows['info']" class="dialogue-window" />
        <ChatsWindow v-if="windows['chat']" class="dialogue-window chat" />
        <MapFilters class="map-settings" />
        <div
            id="map"
            @click="closeOpenedTabs"
            style=" position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;"
        ></div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MenuControls from "@/components/MenuControls.vue";
import OrdersWindow from "@/components/Order/OrdersWindow.vue";
import DriversWindow from "@/components/Driver/DriversWindow.vue";
import ReportsWindow from "@/components/Report/ReportWindow.vue";
import InfoWindow from "@/components/InfoWindow/InfoWindow.vue";
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
        InfoWindow,
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
    },
    created() {
        // eslint-disable-next-line
        ymaps.ready(() => {
            // eslint-disable-next-line
            const map = new ymaps.Map("map", {
                center: [55.76, 37.64],
                controls: [],
                zoom: 15
            });
            // eslint-disable-next-line
            const zoomControl = new ymaps.control.ZoomControl({
                options: {
                    size: "small",
                    position: {
                        top: "300px",
                        right: "10px"
                    }
                }
            });
            // eslint-disable-next-line
            const geolocationControl = new ymaps.control.GeolocationControl({
                options: {
                    noPlacemark: true,
                    position: {
                        top: "375px",
                        right: "10px"
                    }
                }
            });
            geolocationControl.events.add("locationchange", function(event) {
                const position = event.get("position"),
                    // eslint-disable-next-line
                    locationPlacemark = new ymaps.Placemark(position);
                map.geoObjects.add(locationPlacemark);
                map.panTo(position);
            });
            // eslint-disable-next-line
            const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: ["Москва, метро Смоленская", "Москва, метро Арбатская"]
                },
                {
                    boundsAutoApply: true
                }
            );

            map.geoObjects.add(multiRoute);
            map.controls.add(geolocationControl);
            map.controls.add(zoomControl);
        });
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

.map {
    position: absolute;
    z-index: 0;
    top: 55px;
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