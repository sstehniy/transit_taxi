<template>
    <div class="container-button" @click="statusPick">
        <div class="color-indicator" :style="{ 'background-color': buttonInfo.color }"></div>
        <div class="status-indicator">{{ buttonInfo.title }}</div>
    </div>
</template>

<script>
export default {
    props: {
        buttonInfo: Object
    },
    methods: {
        statusPick() {
            this.$emit("status-pick", this.buttonInfo.id, this.buttonInfo.color);
        }
    }
};
</script>

<style scoped>
.container-button {
    width: 96%;
    height: 25px;
    margin: 0 auto;
    margin-top: 5px;
    cursor: pointer;

    display: flex;
    flex-direction: row;

    transition: background-color 0.2s ease-in-out;
}
.container-button:hover {
    background-color: #fafafa;
}
.color-indicator {
    width: 2px;
    height: 21px;
    margin-top: 2px;
    margin-left: 3px;
}
.status-indicator {
    margin-left: 4px;
    font-size: 12px;
    line-height: 25px;
    padding-bottom: 0px;
    text-align: center;
}
</style>