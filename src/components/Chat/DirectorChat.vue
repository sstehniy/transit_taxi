<template>
    <div class="chat-window">
        <div class="chat-header">
            <div
                class="header-btn"
                :class="{active: showDropdown}"
                tabindex="-1"
                @focusout="tabOff"
            >
                <p class="btn-text" @click="toggleDropdown">Оператор</p>
                <img :src="require('@/assets/drop-icon.svg')" alt="drop-icon" id="drop" />
                <div v-if="showDropdown" class="dropdown">
                    <div
                        v-for="operator in operators"
                        :key="operator.id"
                        class="dropdown-item"
                        @click="selectOperator(operator.id)"
                        :class="{selected: operator.id === selectedOperatorId}"
                    >
                        <p class="item-text">{{operator.name}}</p>
                    </div>
                </div>
            </div>
            <div class="separator"></div>
            <div class="header-btn">
                <p class="btn-text">Директор</p>
            </div>
        </div>
        <div class="chat-main">
            <div class="chat-label">{{operators.find(o=>o.id===selectedOperatorId).name}}</div>
            <simplebar class="scrollable-chat"></simplebar>
            <div class="input-wrapper">
                <input type="text" v-model="newMessage" placeholder="Ввод сообщения" />
                <div class="underline"></div>
            </div>
        </div>
        <div class="chat-footer">
            <div class="footer-btn" @click="sendMessage">Отправить</div>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
    name: "OperatorChat",
    components: {
        simplebar
    },
    computed: {
        operators() {
            return this.$store.state.chats.chatFilters.operators;
        }
    },
    data() {
        return {
            showDropdown: false,
            selectedOperatorId: 0,
            newMessage: ""
        };
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        selectOperator(id) {
            this.selectedOperatorId = id;
            this.showDropdown = false;
        },
        sendMessage() {
            console.log("sending message...");
            this.newMessage = "";
        },
        tabOff() {
            this.showDropdown = false;
        }
    }
};
</script>

<style scoped>
.chat-window {
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

    left: 33.3vw;
    max-width: calc(15px + 27vw);
    min-width: 300px;
    width: calc(15px + 25vw);
    min-height: 215px;
    overflow-y: scroll;
    height: calc(90vh - 105px);
    max-height: calc(90vh - 105px);
    position: relative;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    background-color: transparent;
    border-radius: 8px;
    resize: vertical;
}

.chat-header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
}

.chat-label {
    width: 100%;
    height: 28px;
    background-color: var(--btn-primary-selected);
    position: relative;
    background-color: var(--btn-normal-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-small);
    letter-spacing: 0.7px;
    color: #020202;
}

.header-btn {
    position: relative;
    flex: 1;
    height: 38px;
    background-color: var(--dark-grey-bg);
    transition: background-color 0.2s ease-in-out;
}

.header-btn {
    position: relative;
    flex: 1;
    height: 38px;
    background-color: var(--dark-grey-bg);
    transition: background-color 0.2s ease-in-out;
}

.header-btn:first-child {
    border-top-left-radius: 8px;
}

.header-btn:last-child {
    border-top-right-radius: 8px;
}

.header-btn:hover {
    background-color: var(--btn-normal-selected-bg);
}
.header-btn.active {
    background-color: var(--btn-normal-selected-bg);
}

.btn-text {
    cursor: pointer;
    flex: 1;
    text-align: center;
    line-height: 38px;
    font-size: var(--text-middle);
}

.dropdown {
    position: absolute;
    z-index: 1000;
    top: 100%;
    left: 0;
    right: -100%;
    padding: 5px 10px;
    background-color: var(--btn-normal-selected-bg);
}

.dropdown-item {
    width: 100%;
    height: 25px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.dropdown-item:not(:first-child) {
    margin-top: 5px;
}

.dropdown-item.selected {
    background-color: var(--light-grey-bg);
    cursor: default;
}

.dropdown-item:hover {
    background-color: var(--light-grey-bg);
}

.item-text {
    text-align: center;
    line-height: 25px;
    font-size: var(--text-middle);
}

.item-text.selected {
    background-color: var(--light-grey-bg);
}

.separator {
    position: absolute;
    height: 28px;
    width: 2px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fdbf5a;
}

.chat-main {
    height: calc(100% - 103px);
    position: relative;
}

.chat-label {
    width: 100%;
    height: 35px;
    background-color: var(--btn-primary-selected);
    position: relative;
    background-color: var(--btn-normal-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.scrollable-chat {
    width: 100%;
    height: calc(100% - 80px);
    padding-left: 5px;
    padding-right: 15px;
    z-index: 10;
    overflow: scroll;
    background-color: #fafafa;
    padding-bottom: 40px;
}

.input-wrapper {
    height: 45px;
    width: 100%;
    position: relative;
    background-color: var(--btn-normal-bg);
}

input {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    height: 15px;
    padding: 0 5px;
    border: none;
    border-left: 1px solid #020202;
    background-color: transparent;
    font-size: var(--text-small);
    color: #020202;
    outline: none;
}

input::placeholder {
    color: #020202;
}

.underline {
    position: absolute;
    width: 220px;
    height: 1px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #383b41;
}

.chat-footer {
    width: 100%;
    height: 65px;
    background-color: var(--dark-grey-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 8px 8px;
}

.footer-btn {
    width: 200px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: var(--btn-primary-bg);
    border-radius: 5px;
    font-size: var(--text-small);
    transition: color 0.2s ease-in-out;
}
</style>