<template>
    <div class="dropdown-button">
        <div class="button-container" @click="toggleOptions">
            <div class="picked-option">{{ defaultSetting }}</div>
            <img class="dropdown-icon" src="@/assets/drop-icon.svg">
        </div>
        <div v-if="options" class="dropdown">
            <div v-for="(settingName, index) in dropdownInfo" :key="index" @click="pickOption(settingName)" class="option" >{{ settingName }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: false,
                defaultSetting: this.dropdownInfo[0]
            }
        },
        props: {
            dropdownInfo: Object,
        },
        methods: {
            toggleOptions() {
                this.option = !this.options;
            },
            pickOption(someSetting) {
                this.options = false;
                this.defaultSetting = someSetting;
            }
        }  
    }
</script>

<style scoped>
    .dropdown-button {
        width: 130px;
        position: relative;
        border-radius: 5px;
        box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    }
    .button-container {
        width: 130px;
        height: 40px;
        
        border-radius: 5px;
        background-color: #ECECEC;
        cursor: pointer;

        display:flex;
        flex-direction: row;
    }
    .picked-option {
        width: 90%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 13px;
        color: #181C21;
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
        background-color: #ECECEC;
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
        background-color: #FAFAFA;
    }
</style>