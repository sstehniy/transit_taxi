<template>
    <div v-if="this.$route.name === 'director'" class="menu-buttons-container">
        <MenuButton
            v-for="button in buttons"
            :key="button.id"
            :buttonInfo="button"
            class="menu-button"
            @click.native="$store.commit('toggleWindow', button.window)"
        />
    </div>
    <div v-else class="menu-buttons-container">
        <MenuButton
            v-for="button in opButtons"
            :key="button.id"
            :buttonInfo="button"
            class="menu-button"
            @click.native="$store.commit('toggleWindow', button.window)"
        />
    </div>
</template>

<script>
import MenuButton from "./MenuButton.vue";

export default {
    components: {
        MenuButton
    },
    data() {
        return {
            buttons: [
                { id: 1, window: "orders", src: "orders-icon", name: "Заказы" },
                {
                    id: 2,
                    window: "drivers",
                    src: "drivers-icon",
                    name: "Водители"
                },
                { id: 3, window: "info", src: "info-icon", name: "Инфо. блок" },
                {
                    id: 4,
                    window: "reports",
                    src: "reports-icon",
                    name: "Отчеты"
                },
                { id: 5, window: "chat", src: "chats-icon", name: "Чат" }
            ],
            opButtons: [
                { id: 1, window: "orders", src: "orders-icon", name: "Заказы" },
                {
                    id: 2,
                    window: "drivers",
                    src: "drivers-icon",
                    name: "Водители"
                },
                { id: 3, window: "info", src: "info-icon", name: "Инфо. блок" },
                { id: 4, window: "call", src: "info-icon", name: "Вызов" },
                { id: 5, window: "chat", src: "chats-icon", name: "Чат" }
            ]
        };
    }
};
</script>
<style scoped>
.menu-buttons-container {
    display: flex;
    flex-direction: row;
}
.menu-buttons-container > * {
    margin-right: 7px;
}

.menu-button:nth-child(3) {
    margin-right: calc(5px + 2vw);
}
.menu-button:last-child {
    margin-right: 0px;
}
</style>