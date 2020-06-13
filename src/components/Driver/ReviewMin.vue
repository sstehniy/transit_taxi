<template>
    <div class="review-container">
        <p class="review-number"></p>
        <p class="auto-info"></p>
        <p class="start-date"></p>
        <p class="received-date"></p>
        <div v-if="showMore" class="review-comments"></div>
        <img :src="require('@/assets/status-changer-icon.svg')" alt="more-icon" id="more" />
    </div>
</template>

<script>
export default {
    name: "ReviewMin",
    props: {
        reviewInfo: Object
    },
    data() {
        return {
            showMore: false
        };
    }
};
</script>

<style>
</style>