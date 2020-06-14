<template>
    <div class="chats-container">
        <div class="chats-manage">
            <div class="chats-header" :class="{disabled: showChat}">
                <div class="header-btn">
                    <p
                        class="btn-text"
                        @click="showGroupFilters=!showGroupFilters"
                    >{{groupFilters.find(g=>g.id === currentGroupFilterId).title}}</p>
                    <div v-if="showGroupFilters" class="dropdown" id="left">
                        <div
                            v-for="group in groupFilters"
                            :key="group.id"
                            class="dropdown-item"
                            @click="selectGroupFilter(group.id)"
                        >
                            <p
                                class="dropdown-item-text"
                                :class="{selected: group.id === currentGroupFilterId}"
                            >{{group.title}}</p>
                        </div>
                    </div>
                </div>
                <div class="separator"></div>
                <div class="header-btn">
                    <p
                        class="btn-text"
                        @click="showStatusFilters=!showStatusFilters"
                    >{{statusFilters.find(s=>s.id===currentStatusFilterId).title}}</p>
                    <div v-if="showStatusFilters" class="dropdown" id="right">
                        <div
                            v-for="status in statusFilters"
                            :key="status.id"
                            class="dropdown-item"
                            @click="selectStatusFilter(status.id)"
                        >
                            <p
                                class="dropdown-item-text"
                                :class="{selected: status.id===currentStatusFilterId}"
                            >{{status.title}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-wrapper">
                <div class="chats-label">
                    <p class="header-name">Все чаты</p>
                </div>
                <simplebar class="scrollable-chats" data-simplebar-auto-hide="false" ref="scroll">
                    <div v-for="chat in chats" :key="chat.id" class="chat-preview">
                        <img
                            alt="chat-member-avatar"
                            :src="require('@/assets/user-icon.svg')"
                            id="avatar"
                        />
                        <div class="info" @click="openChat(chat.id)">
                            <p class="chat-name">{{chat.name}}</p>
                            <p class="last-message">{{chat.lastMessage}}</p>
                        </div>
                        <img
                            alt="options-icon"
                            :src="require('@/assets/status-changer-icon.svg')"
                            id="options"
                            @click="toggleChatOptions($event, chat.id)"
                        />
                        <div class="footer-line"></div>
                    </div>
                </simplebar>
            </div>
            <div class="chat-view" v-if="showChat">
                <div class="chat-header">
                    <img
                        alt="back-icon"
                        :src="require('@/assets/drop-icon.svg')"
                        @click="closeChat"
                        id="back"
                    />
                    <p class="header-name">{{selectedChatInfo.name}}</p>
                </div>
                <div class="scrollable-chat"></div>
                <div class="send-message">
                    <input
                        type="text"
                        placeholder="Ввод сообщения"
                        class="msg-input"
                        v-model="messageInput"
                    />
                    <div class="input-underline"></div>
                </div>
            </div>
            <div class="chats-footer">
                <div v-if="!showChat" class="footer-btn">Написать всем</div>
                <div v-else class="footer-btn">Отправить</div>
            </div>
        </div>
        <div
            v-if="showChatOptions"
            :style="{top: `${chatOptionsTopStyleProp}px`}"
            class="options-dropdown"
        >
            <p class="dropdown-item" @click="editChat(chatIdWaitingForChange)">Изменить</p>
            <p class="dropdown-item" @click="deleteChat(chatIdWaitingForChange)">Удалить</p>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
    name: "ChatsWindow",
    components: {
        simplebar
    },
    computed: {
        chats() {
            return this.$store.state.chats.chatPreviews;
        },
        groupFilters() {
            return this.$store.state.chats.chatFilters.groups;
        },
        statusFilters() {
            return this.$store.state.chats.chatFilters.status;
        },
        selectedChatInfo() {
            return this.chats.find(c => c.id === this.selectedChatId);
        }
    },
    data() {
        return {
            currentGroupFilterId: 0,
            currentStatusFilterId: 0,
            showChat: false,
            showChatOptions: false,
            showGroupFilters: false,
            showStatusFilters: false,
            chatOptionsTopStyleProp: null,
            chatIdWaitingForChange: null,
            selectedChatId: null,
            messageInput: ""
        };
    },
    methods: {
        toggleChatOptions(e, chatId) {
            if (
                this.showChatOptions &&
                this.chatIdWaitingForChange !== null &&
                chatId === this.chatIdWaitingForChange
            ) {
                this.showChatOptions = false;
                this.chatIdWaitingForChange = null;
                this.chatOptionsTopStyleProp = null;
            } else {
                this.chatIdWaitingForChange = chatId;
                this.chatOptionsTopStyleProp =
                    e.target.parentNode.getBoundingClientRect().top -
                    document.querySelector(".chats-container").getBoundingClientRect().top;
                this.showChatOptions = true;
            }
        },
        selectGroupFilter(groupId) {
            this.currentGroupFilterId = groupId;
            this.showGroupFilters = false;
        },
        selectStatusFilter(statusId) {
            this.currentStatusFilterId = statusId;
            this.showStatusFilters = false;
        },
        openChat(chatId) {
            this.showChatOptions = false;
            this.selectedChatId = chatId;
            this.showChat = true;
        },
        closeChat() {
            this.showChat = false;
            this.selectedChatId = null;
        },
        handleScroll() {
            this.showChatOptions = false;
            this.chatIdWaitingForChange = null;
            this.chatOptionsTopStyleProp = null;
        }
    },

    mounted() {
        this.$refs.scroll.scrollElement.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        this.$refs.scroll.scrollElement.removeEventListener("scroll", this.handleScroll);
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
*:not(input) {
    user-select: none;
}

.chats-container {
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

    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    background-color: transparent;
    border-radius: 8px;
}
.chats-manage {
    position: relative;
    width: 365px;
    height: 585px;
    z-index: 0;
    max-height: 585px;
    min-height: 350px;
    resize: vertical;
    overflow-y: scroll;
}

.chats-header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
}

.chats-header.disabled {
    pointer-events: none;
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
    top: 0;
    left: 0;
    right: 0;
    padding: 5px 10px;
    background-color: var(--btn-normal-selected-bg);
}

.dropdown#left {
    border-radius: 8px 0px 5px 5px;
}

.dropdown#right {
    border-radius: 0px 8px 5px 5px;
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

.dropdown-item-text {
    text-align: center;
    line-height: 25px;
    font-size: var(--text-middle);
}

.dropdown-item-text.selected {
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

.chats-label {
    width: 100%;
    height: 28px;
    background-color: var(--btn-primary-selected);
    position: relative;
    background-color: var(--btn-normal-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.list-wrapper {
    height: calc(100% - 103px);
}

.scrollable-chats {
    width: 100%;
    height: calc(100% - 28px);
    padding-left: 5px;
    padding-right: 15px;
    z-index: 10;
    overflow: scroll;
    background-color: #fafafa;
    padding-bottom: 40px;
}

.chat-preview {
    width: 100%;
    height: 55px;
    position: relative;
    background-color: var(--light-grey-bg);
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
}

.chat-preview img#avatar {
    position: absolute;
    left: 10px;
    top: 17px;
    height: 20px;
}

.chat-preview img#options {
    position: absolute;
    top: 9px;
    right: 6px;
    cursor: pointer;
    height: 15px;
}

.chat-preview .info {
    top: 10px;
    position: absolute;
    left: 55px;
    cursor: pointer;
}

.info .chat-name {
    line-height: 18px;
    font-size: var(--text-middle);
}

.info .last-message {
    line-height: 15px;
    font-size: var(--text-small);
}

.chat-preview .footer-line {
    position: absolute;
    bottom: 5px;
    width: 95.5%;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    background-color: #ececec;
}

.chats-footer {
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

.options-dropdown {
    position: absolute;
    z-index: 2000px;
    left: calc(100% - 10px);
    width: 120px;
    height: 68px;
    background-color: var(--dark-grey-bg);
    border-radius: 0px 5px 5px 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 6px 10px 0 10px;
}

.options-dropdown .dropdown-item {
    width: 100%;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
    font-size: var(--text-middle);
    transition: background-color 0.2s ease-in-out;
}

.options-dropdown .dropdown-item:hover {
    background-color: var(--btn-normal-bg);
}

.footer-btn:hover {
    color: var(--btn-primary-selected);
}

/* Chat view related styles */

.chat-view {
    position: absolute;
    top: 38px;
    left: 0;
    right: 0;
    z-index: 50000000;
    height: calc(100% - 103px);
}

.chat-header {
    height: 35px;
    width: 100%;
    position: relative;
    background-color: var(--btn-normal-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.chat-header img#back {
    position: absolute;
    cursor: pointer;
    width: 10px;
    height: 7px;
    left: 10px;
    transform: rotate(90deg);
}

.header-name {
    font-size: var(--text-small);
    letter-spacing: 0.7px;
    color: #020202;
}

.scrollable-chat {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #fafafa;
    padding-left: 5px;
    padding-right: 15px;
    z-index: 10;
    overflow: scroll;
}

.scrollable-chat::-webkit-scrollbar {
    display: none;
}

.send-message {
    height: 45px;
    width: 100%;
    position: relative;
    background-color: var(--btn-normal-bg);
}

.msg-input {
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
}

.msg-input::placeholder {
    color: #020202;
}

.input-underline {
    position: absolute;
    width: 220px;
    height: 1px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #383b41;
}
</style>