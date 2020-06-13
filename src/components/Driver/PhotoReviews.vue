<template>
    <div class="main-container">
        <div class="photo-reviews-conteiner">
            <div class="reviews-header">
                <div class="header-top">
                    <div
                        v-for="filter in statusFilters"
                        :key="filter"
                        class="filter-btn"
                        :class="{selected: statusFilterId === filter.id}"
                        @click="statusFilterId=filter.id"
                    >{{filter.title}}</div>
                    <div class="separator"></div>
                    <div class="separator"></div>
                </div>
                <div class="header-bottom">
                    <div class="header-btn">
                        <p class="btn-text"></p>
                        <img :src="require('@/assets/drop-icon.svg')" alt="drop-icon" id="drop" />
                        <div class="dropdown">
                            <div class="dropdown-item" @click="selectFilter">Все</div>
                        </div>
                    </div>
                    <div class="separator"></div>
                    <div class="header-btn"></div>
                </div>
            </div>
            <simplebar class="scrollable-reviews" data-simplebar-auto-hide="false" ref="scroll">
                <ReviewMin
                    v-for="review in reviews"
                    :key="review.id"
                    :reviewInfo="review"
                    :showMore="review.id===reviewIdWaitingForChange"
                    @toggle-options="toggleReviewOptions(review.id)"
                />
            </simplebar>
            <div class="reviews-footer">
                <div class="footer-btn">Просмотр</div>
            </div>
        </div>
        <div
            v-if="showReviewOptions"
            :style="{top: `${reviewOptionsTopStyleProp}px`}"
            class="options-dropdown"
        >
            <p class="dropdown-item" @click="showMore(reviewIdWaitingForChange)">Подробности</p>
            <p class="dropdown-item" @click="deleteReview(reviewIdWaitingForChange)">Удалить</p>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import ReviewMin from "./ReviewMin.vue";

export default {
    name: "PhotoReview",
    components: {
        simplebar,
        ReviewMin
    },
    computed: {
        reviews() {
            return this.$store.state.photoReviews.reviews;
        },
        statusFilters() {
            return this.$store.state.photoReviews.reviewFilters.status;
        },
        sortByFilters() {
            return this.$store.state.photoReviews.reviewFilters.sortBy;
        },
        dateFilters() {
            return this.$store.state.photoReviews.reviewFilters.date;
        }
    },
    data() {
        return {
            statusFilterId: null,
            sortByFilterId: null,
            dateFilterId: null,
            reviewIdWaitingForChange: null,
            selectedReviewId: null,
            showReviewOptions: false,
            reviewOptionsTopStyleProp: null
        };
    },
    methods: {
        selectSortByFilter(id) {
            this.sortByFilterId = id;
        },
        selectDateFilter(id) {
            this.dateFilterId = id;
        },
        showMore() {},
        deleteReview(id) {
            this.$store.dispatch("deleteReview", id);
        }
        // toggleReviewOptions
    }
};
</script>

<style scoped>
.main-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: aquamarine;
}
.photo-reviews-conteiner {
    height: 100%;
    width: 100%;
}
</style>