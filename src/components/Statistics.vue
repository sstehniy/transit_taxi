<template>
    <div
        class="statistics-container"
        @click="toggleStats"
        :style="this.statsopen ? { 'height': '166px' } : { 'height': '36px' }"
    >
        <div class="openstat">
            <img src="@/assets/drop-icon.svg" />
        </div>
        <div class="minified-stat">
            <p class="stat-name">Сумма списаний у директора</p>
            <p class="stat-value">1000 Р</p>
        </div>
        <div v-if="statsopen" class="maximized-stat">
            <div class="minified-stat">
                <p class="stat-name">Сумма у водителей</p>
                <p class="stat-value">5000 Р</p>
            </div>
            <div class="minified-stat">
                <p class="stat-name">Выполнено заказов</p>
                <p class="stat-value">20</p>
            </div>
            <div class="minified-stat">
                <p class="stat-name">Текущие заказы</p>
                <p class="stat-value">7</p>
            </div>
            <div class="minified-stat">
                <p class="stat-name">Машины онлайн</p>
                <p class="stat-value">1000р</p>
            </div>
            <div class="minified-stat">
                <p class="stat-name">Количество свободных машин</p>
                <p class="stat-value">8</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Statistics",
    data() {
        return {
            statsopen: false
        };
    },
    methods: {
        toggleStats() {
            this.statsopen = !this.statsopen;
        }
    }
};
</script>

<style scoped>
.statistics-container {
    width: 300px;
    height: 36px;
    border-radius: 8px;
    background: #e5e5e5;

    display: flex;
    flex-direction: column;

    font-size: 12px;

    cursor: pointer;
}

.openstat {
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: space-around;
    padding-top: 5px;
}
.openstat img {
    transform: rotate(180deg);
}
.minified-stat {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    line-height: 26px;
}
.stat-name {
    width: 200px;
}
.stat-value {
    width: 50px;
    text-align: end;
}
</style>