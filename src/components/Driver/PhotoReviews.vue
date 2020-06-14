<template>
    <div class="main-reviews-container">
        <div class="photo-reviews-conteiner" ref="container">
            <div class="reviews-header">
                <div class="header-top">
                    <div
                        v-for="filter in statusFilters"
                        :key="filter.id"
                        class="top-filter-btn"
                        :class="{selected: statusFilterId === filter.id}"
                        @click="statusFilterId=filter.id"
                    >
                        <p class="filter-btn-text">{{filter.title}}</p>
                    </div>
                    <div class="separator left"></div>
                    <div class="separator right"></div>
                </div>
                <div class="header-bottom">
                    <div class="bottom-filter-btn">
                        <p
                            class="filter-btn-text sm"
                            @click="showSortByFilters = !showSortByFilters"
                        >{{sortByFilters.find(f=>f.id===sortByFilterId).title}}</p>
                        <img :src="require('@/assets/drop-icon.svg')" alt="drop-icon" id="drop" />
                        <div v-if="showSortByFilters" class="dropdown">
                            <div
                                v-for="filter in sortByFilters"
                                :key="filter.id"
                                @click="selectSortByFilter(filter.id)"
                                class="dropdown-item"
                            >
                                <p class="drop-item-text">{{filter.title}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="separator"></div>
                    <div class="bottom-filter-btn">
                        <p
                            class="filter-btn-text sm"
                            @click="showDateFilters = !showDateFilters"
                        >Дата</p>
                        <img :src="require('@/assets/drop-icon.svg')" alt="drop-icon" id="drop" />
                        <div v-if="showDateFilters" class="dropdown">
                            <div
                                v-for="filter in dateFilters"
                                :key="filter.id"
                                @click="selectDateFilter(filter.id)"
                                class="dropdown-item"
                            >
                                <p
                                    class="drop-item-text"
                                    :class="{selected: filter.id === dateFilterId}"
                                >{{filter.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <simplebar class="scrollable-reviews" data-simplebar-auto-hide="false" ref="scroll">
                <ReviewMin
                    v-for="review in reviews"
                    :key="review.id"
                    :reviewInfo="review"
                    :showMore="review.id===showMoreReviewId"
                    @toggle-options="toggleReviewOptions($event, review.id)"
                    @update-comments="updateComments($event, review.id)"
                />
            </simplebar>
            <div class="reviews-footer"></div>
        </div>
        <div
            v-if="showReviewOptions"
            :style="{top: `${reviewOptionsTopStyleProp}px`}"
            class="options-dropdown"
        >
            <p class="dropdown-item" @click="openReview(reviewIdWaitingForChange)">Просмотр</p>
            <p class="dropdown-item" @click="toggleMore(reviewIdWaitingForChange)">Подробности</p>
            <p class="dropdown-item" @click="deleteReview(reviewIdWaitingForChange)">Удалить</p>
        </div>
        <ReviewWindow
            v-if="showReview"
            :review="reviews.find(r=>r.id===reviewIdWaitingForChange)"
            @close-review="closeReview"
            @update-comments="updateComments($event, reviewIdWaitingForChange)"
        />
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import ReviewMin from "./ReviewMin.vue";
import ReviewWindow from "./ReviewWindow.vue";

export default {
    name: "PhotoReviews",
    components: {
        simplebar,
        ReviewMin,
        ReviewWindow
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
            statusFilterId: 0,
            sortByFilterId: 0,
            dateFilterId: 0,
            showSortByFilters: false,
            showDateFilters: false,
            reviewIdWaitingForChange: null,
            reviewOptionsTopStyleProp: null,
            selectedReviewId: null,
            showReviewOptions: false,
            showMoreReviewId: null,
            showReview: false
        };
    },
    methods: {
        selectSortByFilter(id) {
            this.sortByFilterId = id;
            this.showSortByFilters = false;
        },
        selectDateFilter(id) {
            this.dateFilterId = id;
            this.showDateFilters = false;
        },
        toggleReviewOptions(e, id) {
            if (this.showReview) {
                return;
            } else if (
                this.showReviewOptions &&
                this.reviewIdWaitingForChange !== null &&
                id === this.reviewIdWaitingForChange
            ) {
                this.showMoreReviewId = null;
                this.showReviewOptions = false;
                this.reviewIdWaitingForChange = null;
                this.reviewOptionsTopStyleProp = null;
            } else {
                this.showMoreReviewId = null;
                this.reviewIdWaitingForChange = id;
                this.reviewOptionsTopStyleProp =
                    e.target.parentNode.getBoundingClientRect().top -
                    document.querySelector(".main-reviews-container").getBoundingClientRect().top;
                this.showReviewOptions = true;
            }
        },
        toggleMore(id) {
            this.showMoreReviewId = id;
        },
        deleteReview(id) {
            this.$store.dispatch("deleteReview", id);
        },
        updateComments(e, id) {
            this.reviews = this.reviews.map(r =>
                r.id === id ? { ...r, comments: e.target.value } : r
            );
        },
        handleScroll() {
            this.showReviewOptions = false;
            this.reviewIdWaitingForChange = null;
            this.reviewOptionsTopStyleProp = null;
            this.showMoreReviewId = null;
        },
        openReview() {
            this.showReviewOptions = false;
            this.showMoreReviewId = null;
            this.showReview = true;
        },
        closeReview() {
            this.showReview = false;
            this.reviewIdWaitingForChange = false;
            this.showMoreReviewId = null;
        }
    },
    mounted() {
        this.$refs.scroll.scrollElement.addEventListener("scroll", this.handleScroll);
        this.$refs.container.addEventListener("resize", this.handleScroll);
    },
    beforeDestroy() {
        this.$refs.scroll.scrollElement.removeEventListener("scroll", this.handleScroll);
        this.$refs.container.removeEventListener("resize", this.handleScroll);
    }
};
</script>

<style scoped>
*:not(input) {
    user-select: none;
}
.main-reviews-container {
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

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
}
.photo-reviews-conteiner {
    height: 100%;
    width: 100%;
    z-index: 100;
    resize: vertical;
}

.reviews-header {
    width: 100%;
    height: 73px;
    position: relative;
}

.header-top {
    width: 100%;
    height: 38px;
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 1;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
}

.top-filter-btn {
    width: 33.333%;
    height: 100%;
    background-color: var(--dark-grey-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

.top-filter-btn:nth-child(1) {
    border-top-left-radius: 8px;
}
.top-filter-btn:nth-child(3) {
    border-top-right-radius: 8px;
}

.top-filter-btn:hover {
    background-color: var(--btn-normal-selected-bg);
}

.top-filter-btn.selected {
    background-color: var(--btn-normal-selected-bg);
}

.filter-btn-text {
    font-size: var(--text-middle);
    flex: 1;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
}

.filter-btn-text.sm {
    line-height: 35px;
    font-size: var(--text-small);
}

.header-top .separator {
    position: absolute;
    height: 28px;
    width: 2px;
    background-color: var(--btn-primary-bg);
}

.separator.left {
    left: 33.333%;
    transform: translateX(-66.666%);
}

.separator.right {
    left: 66.666%;
    transform: translateX(-33.333%);
}

.header-bottom {
    position: absolute;
    top: 38px;
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
}

.bottom-filter-btn {
    width: 50%;
    height: 100%;
    background-color: var(--dark-grey-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: background-color 0.2s ease-in-out;
}

.bottom-filter-btn:hover {
    background-color: var(--btn-normal-selected-bg);
}

img#drop {
    position: absolute;
    cursor: pointer;
    height: 5px;
    width: 8px;
    right: 13px;
}

.header-bottom .separator {
    position: absolute;
    width: 4px;
    height: 25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--btn-primary-bg);
}

.dropdown {
    position: absolute;
    z-index: 500;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--dark-grey-bg);
    padding: 5px 5px 0 5px;
    border-radius: 0 0 5px 5px;
}

.dropdown-item {
    height: 25px;
    width: 100%;
    margin-bottom: 5px;
}

.drop-item-text {
    line-height: 25px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    font-size: var(--text-small);
    transition: background-color 0.2s ease-in-out;
}

.drop-item-text:hover {
    background-color: var(--light-grey-bg);
}
.drop-item-text.selected {
    background-color: var(--light-grey-bg);
}
.scrollable-reviews {
    width: 100%;
    height: calc(100% - 118px);
    padding-left: 5px;
    padding-right: 15px;
    padding-bottom: 40px;
    z-index: 10;
    overflow-y: scroll;
    background-color: var(--light-grey-bg);
}

.reviews-footer {
    width: 100%;
    height: 45px;
    background-color: var(--dark-grey-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 8px 8px;
}
/* 
.footer-btn {
    width: 120px;
    height: 35px;
    background-color: var(--btn-primary-bg);
    font-size: var(--text-small);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
}

.footer-btn:hover {
    color: var(--btn-normal-bg);
} */

.options-dropdown {
    position: absolute;
    z-index: 2000px;
    left: calc(100% - 10px);
    width: 135px;
    background-color: var(--dark-grey-bg);
    border-radius: 0px 5px 5px 0px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 6px 10px 0 15px;
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
</style>