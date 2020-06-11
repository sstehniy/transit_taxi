<template>
    <div class="chat-container">
        <div class="chat-header"></div>
        <simplebar class="scrollable-chat" data-simplebar-auto-hide="false"></simplebar>
        <div class="chat-footer"></div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
    name: "Chat",
    components: {
        simplebar
    },
    data() {
        return {};
    }
};
</script>

<style scoped>
* {
    font-family: "Poppins", sans-serif;
    font-weight: normal;
    font-style: normal;
    line-height: 100%;
    outline: none;
}
.chat-container {
    --text-small: 12px;
    --text-middle: 14px;
    --text-large: 16px;
    --dark-grey-bg: #e5e5e5;
    --light-grey-bg: #fafafa;
    --btn-text-color: #181c21;
    --btn-primary-selected: #f4f4f4;
    --btn-primary-bg: #fdbf5a;
    --btn-normal-bg: #f4f4f4;
    --btn-normal-selected-bg: #d8d8d8;

    position: absolute;
    left: calc(100% + 20px);
    top: 0;
    width: 240px;
    height: 505px;
    max-height: 505px;
    min-height: 350px;
    background-color: #fdbf5a;
    resize: vertical;
    overflow-y: scroll;
}
</style>