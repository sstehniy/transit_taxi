<template>
    <div class="chats-container">
        <div class="chats-manage">
            <div class="chats-header">
                <div class="header-btn"></div>
                <div class="separator"></div>
                <div class="header-btn"></div>
            </div>
            <div class="blank-separator"></div>
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
            <div class="chats-footer">
                <div class="footer-btn">Написать всем</div>
            </div>
        </div>
        <div
            v-if="showChatOptions"
            :style="{top: `${chatOptionsTopStyleProp}px`}"
            class="options-dropdown"
        >
            <div class="dropdown-item" @click="editChat(chatIdWaitingForChange)">Изменить</div>
            <div class="dropdown-item" @click="deleteChat(chatIdWaitingForChange)">Удалить</div>
        </div>
        <Chat v-if="showChat" :chatInfo="chats.find(c=>c.id === selectedChatId)" />
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import Chat from "./Chat.vue";

export default {
    name: "ChatsWindow",
    computed: {
        chats() {
            return this.$store.state.chats.chatPreviews;
        },
        groupFilters() {
            return this.$store.state.chatFilters.groups;
        },
        statusFilters() {
            return this.$store.state.chatFilters.status;
        }
    },
    components: {
        simplebar,
        Chat
    },
    data() {
        return {
            currentGroupFilterId: 0,
            currentStatusFilterId: 0,
            showChat: false,
            showChatOptions: false,
            chatOptionsTopStyleProp: null,
            chatIdWaitingForChange: null,
            selectedChatId: null
        };
    },
    methods: {
        toggleChatOptions(e, chatId) {
            console.log(e.target.parentNode);
            this.chatIdWaitingForChange = chatId;
            this.chatOptionsTopStyleProp =
                e.target.parentNode.getBoundingClientRect().top -
                document.querySelector(".chats-container").getBoundingClientRect().top;
            this.showChatOptions = true;
        },
        openChat(chatId) {
            this.selectedChatId = chatId;
            this.showChat = true;
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
    destroyed() {
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
    position: relative;
}
.chats-manage {
    position: relative;
    width: 240px;
    height: 505px;
    z-index: 0;
    max-height: 505px;
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

.header-btn {
    flex: 1;
    height: 38px;
    background-color: var(--dark-grey-bg);
}

.header-btn:first-child {
    border-top-left-radius: 8px;
}

.header-btn:last-child {
    border-top-right-radius: 8px;
}

.separator {
    position: absolute;
    height: 28px;
    width: 2px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fdbf5a;
}

.blank-separator {
    width: 100%;
    height: 28px;
    background-color: var(--btn-primary-selected);
}

.scrollable-chats {
    width: 100%;
    padding-left: 5px;
    padding-right: 15px;
    z-index: 10;
    overflow: scroll;
    height: calc(100% - 131px);
    background-color: #fafafa;
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
    width: 210px;
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
    background-color: red;
}

.footer-btn:hover {
    color: var(--btn-primary-selected);
}
</style>