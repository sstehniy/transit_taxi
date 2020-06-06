<template>
    <div class="select-options-wrapper">
        <div class="select-option" @click="$emit('select-option', null)">
            <p class="option-title">Не выбрано</p>
        </div>
        <div
            class="select-option"
            v-for="option in options"
            :key="option.id"
            @click="$emit('select-option', option)"
        >
            <p class="option-title">{{option.title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "FormDropdownSelect",
    props: {
        options: Array
    }
};
</script>

<style scoped>
.select-options-wrapper {
    position: absolute;
    z-index: 3;
    top: 100%;
    width: 100%;
    left: 0;
}
.select-option {
    position: relative;
    padding: 10px;
    background: #ececec;
    color: #6b6565;
    outline: none;
    cursor: pointer;
    transition: background-color 0.15s ease-in, color 0.15s ease-in;
}
.select-option:not(:last-child):after {
    position: absolute;
    content: "";
    background-color: #554f4f;
    bottom: -1.5px;
    height: 3px;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
}

.select-option:hover {
    background-color: #554f4f;
    color: #ececec;
}

.select-option p {
    background-color: transparent;
    outline: none;
    font-size: 11px;
    border: none;
    width: 70%;
}
</style>