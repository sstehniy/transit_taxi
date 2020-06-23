<template>
    <div
        v-if="buttonInfo.name !== 'Вызов'"
        class="control-button"
        :class="{ active : this.$store.state.windows[buttonInfo.window] }"
        @click="$store.commit('toggleWindow', buttonInfo.window)"
    >
        <div class="button-misc-wrapper">
            <img
                class="button-icon"
                :class="{ activeButtonIcon: buttonInfo.active }"
                :src="require('@/assets/' + buttonInfo.src + '.svg')"
            />
            <div
                class="button-name"
                :class="{ activeButtonName: buttonInfo.active }"
            >{{ buttonInfo.name }}</div>
        </div>
    </div>
    <div
        v-else
        class="call-button"
        :class=" { incomingCall : this.callIncoming }"
        @click="incomingCall"
    >
        <img src="@/assets/endcall-icon.svg" />
        <p>x-xxx-xxx-xx-xx</p>
        <img src="@/assets/acceptcall-icon.svg" @click="acceptCall" />
    </div>
</template>

<script>
import { eventBus } from "@/main.js";
import { Howl } from "howler";

var ring = new Howl({
    src: ["audio/ring.mp3"],
    loop: true,
    volume: 0.1
});

export default {
    data() {
        return {
            callIncoming: false /* state for animation toggling */
        };
    },
    props: {
        buttonInfo: Object
    },
    methods: {
        incomingCall() {
            /* REMOVE IF-ELSE STATEMENT WHEN YOU CHANGE THE TRIGGER FOR THIS METHOD */
            if (this.callIncoming === true) {
                ring.stop();
            } else {
                ring.play();
            }

            this.callIncoming = !this.callIncoming;
        },
        acceptCall() {
            // UNCOMMENT THIS WHEN CHANGING THE TRIGGER FOR incomingCall()
            /*this.callIncoming = false;
            ring.stop();*/

            this.$store.commit("openWindow", this.buttonInfo.window);
            setTimeout(() => {
                eventBus.$emit("orderFromCall");
            }, 1);
        }
    }
};
</script>

<style scoped>
.control-button,
.control-button * {
    display: flex;
    flex-direction: row;
}
.control-button {
    user-select: none;
    background-color: #ececec;
    width: 9vw;
    min-width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
}
.call-button {
    user-select: none;
    background: #ececec;
    min-width: 170px;
    width: 18vw;
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);

    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.call-button p {
    font-size: 14px;
}
.call-button img {
    cursor: pointer;
}
.incomingCall {
    background: #ececec;
    animation: incomingCall 1.5s infinite;
}
@keyframes incomingCall {
    0% {
        background: #ececec;
    }
    50% {
        background: #adff2f;
    }
    100% {
        background: #ececec;
    }
}
.active {
    background-color: #fdbf5a;
}
.control-button:hover {
    background-color: #fdbf5a;
}
.control-button:hover .button-icon {
    filter: invert(42%) sepia(7%) saturate(238%) hue-rotate(314deg) brightness(92%) contrast(92%);
}
.control-button:hover .button-name {
    color: #6b6565;
}
.button-icon {
    width: 13px;
    /*padding-bottom: 2px;*/

    transition: filter 0.2s ease-in-out;
}
.activeButtonIcon {
    filter: invert(42%) sepia(7%) saturate(238%) hue-rotate(314deg) brightness(92%) contrast(92%);
}
.button-misc-wrapper {
    margin: 0 auto;
}
.button-name {
    color: #383b41;
    font-size: 14px;

    margin-left: 5px;

    transition: color 0.2s ease-in-out;
}
.activeButtonName {
    color: #6b6565;
}

@media only screen and (max-width: 1200px) {
    .button-name {
        display: none;
    }
    .button-icon {
        width: 17px;
    }
}
</style>