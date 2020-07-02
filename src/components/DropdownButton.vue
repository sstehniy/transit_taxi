<template>
    <div class="dropdown-button" tabindex="-1" @focusout="handleFocusOut">
        <div class="button-container" @click="toggleOptions">
            <div class="picked-option">{{ defaultSetting }}</div>
            <img class="dropdown-icon" src="@/assets/drop-icon.svg" />
        </div>
        <div v-if="options" class="dropdown">
            <div
                v-for="(settingName, index) in dropdownInfo"
                :key="index"
                @click="pickOption(settingName)"
                class="option"
            >{{ settingName }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: false,
            defaultSetting: this.dropdownInfo[0]
        };
    },
    props: {
        dropdownInfo: Array
    },
    methods: {
        toggleOptions() {
            this.options = !this.options;
        },
        pickOption(someSetting) {
            this.options = false;
            this.defaultSetting = someSetting;
        },
        handleFocusOut() {
            this.options = false;
        }
    }
};
</script>

<style scoped>
.dropdown-button {
    width: 130px;
    position: relative;
    border-radius: 5px;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.3);
    outline: none;
}
.button-container {
    width: 130px;
    height: 40px;

    border-radius: 5px;
    background-color: #fff;

    cursor: pointer;

    display: flex;
    flex-direction: row;
}
.picked-option {
    width: 90%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: 13px;
    color: #181c21;
}
.dropdown-icon {
    height: 4px;

    position: absolute;
    top: 18px;
    right: 10%;
}
.dropdown {
    position: absolute;
    width: 130px;
    top: 0;
    left: 0;
    border-radius: 5px;
    background-color: #ececec;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
}
.option {
    width: 80%;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    margin-top: 5px;
    font-size: 13px;
    text-align: center;

    cursor: pointer;
}
.option:hover {
    background-color: #fff;
}
</style>