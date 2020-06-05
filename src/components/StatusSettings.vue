<template>
    <div class="container">
        <StatusButton
            v-for="status in statuses"
            :key="status.id"
            :buttonInfo="status"
            @status-pick="closeSettings"
        />
    </div>
</template>

<script>
import StatusButton from "./StatusButton.vue";

export default {
    components: {
        StatusButton
    },
    data() {
        return {
            statuses: [
                { id: 1, name: "Принят", color: "#019232" },
                { id: 2, name: "В работе", color: "#019232" },
                { id: 3, name: "В очереди", color: "#019232" },
                { id: 4, name: "Выполнен", color: "#D8D8D8" },
                { id: 5, name: "Прекращён", color: "#D8D8D8" },
                { id: 6, name: "Нет машин", color: "#D8D8D8" },
                { id: 7, name: "Водитель принял заказ", color: "#019232" },
                {
                    id: 8,
                    name: "Водитель принял заказ по времени",
                    color: "#019232"
                },
                {
                    id: 9,
                    name: "Водитель отказался от заказа",
                    color: "#FF3737"
                },
                {
                    id: 10,
                    name: "Водитель подъехал на место",
                    color: "#019232"
                },
                { id: 11, name: "Клиент в машине", color: "#019232" },
                { id: 12, name: "Клиент не вышел", color: "#FF3737" },
                { id: 13, name: "Заказ отправлен водителю", color: "#019232" },
                { id: 14, name: "Заказ получен водителем", color: "#019232" }
            ]
        };
    },
    methods: {
        closeSettings(pickedStatus, respectiveColor) {
            this.$emit("close-settings", pickedStatus, respectiveColor);
        }
    }
};
</script>
<style scoped>
.container {
    width: 225px;
    min-width: 225px;
    height: 425px;
    min-height: 425px;

    border-radius: 0px 5px 5px 0px;
    background-color: #ececec;
}
</style>