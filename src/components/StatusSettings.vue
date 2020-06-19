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
    props: {
        statuses: Array
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