<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap"); /* Poppins font import from GFonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"); /* Roboto font import from GFonts */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
}

* {
    -ms-overflow-style: none;
}
*::-webkit-scrollbar {
    display: none;
}
body,
html {
    scrollbar-width: none;
}

body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    min-width: 100vw;
    overflow: hidden;
}
#app {
    font-family: "Poppins", sans-serif;
}
.simplebar-scrollbar:before {
    width: 4px;
    background-color: #383b41;
    opacity: 1 !important;
    border-radius: 3px !important;
}
.simplebar-track {
    height: calc(100% - 2px) !important;
    width: 8px !important;
    border-radius: 5px;
    background-color: #e5e5e5;
    top: 1px !important;
    right: 3px;
}
</style>
