<template>
    <div class="operator">
        <Header class="header" />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";

/* this.$route.name */
export default {
    name: "operator",
    components: {
        Header
    }
};
</script>


<style scoped>
.operator {
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
}
.operator > * {
    position: absolute;
    z-index: 1;
}
</style>