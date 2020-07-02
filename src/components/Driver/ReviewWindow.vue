<template>
    <div class="review-container">
        <div class="review-header">
            <p class="header-text">{{fullAutoInfo}}</p>
        </div>
        <div class="review-main">
            <div v-if="selectedPhotoId!==null" class="photo-inspect">
                <div class="inspect-container">
                    <div class="inspect-header">
                        <p
                            class="inspect-header-text"
                        >{{review.photos.find(p=>p.id===selectedPhotoId).title}}</p>
                    </div>
                    <div class="photo-full">
                        <img
                            :src="require('@/assets/' + review.photos.find(p=>p.id===selectedPhotoId).src + '.jpg')"
                        />
                    </div>
                </div>
                <div class="comments-input-wrapper">
                    <input
                        type="text"
                        class="comments-input"
                        :value="review.comment"
                        @input="$emit('update-comments', $event)"
                    />
                    <div class="send-btn">
                        <p class="btn-text" @click="$emit('close-review')">Отправить</p>
                    </div>
                </div>
            </div>
            <simplebar class="photo-select" data-simplebar-auto-hide="false">
                <div
                    v-for="photo in review.photos"
                    :key="photo.id"
                    class="photo-preview"
                    @click="selectedPhotoId=photo.id"
                >
                    <div class="preview-header">
                        <p class="header-text">{{photo.title}}</p>
                    </div>
                    <div class="photo-min">
                        <img :src="require('@/assets/' + photo.src + '.jpg')" />
                    </div>
                </div>
            </simplebar>
        </div>
        <div class="review-footer">
            <div class="footer-btn primary">
                <p class="btn-text" @click="$emit('close-review')">Готово</p>
            </div>
            <div class="footer-btn">
                <p class="btn-text" @click="$emit('close-review')">Отменить</p>
            </div>
        </div>
    </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
    name: "ReviewWindow",
    components: {
        simplebar
    },
    computed: {
        fullAutoInfo() {
            return `${this.review.auto_model} (${this.review.auto_color}) ${this.review.auto_model} `;
        }
    },
    props: {
        review: Object
    },
    data() {
        return {
            selectedPhotoId: 0
        };
    }
};
</script>

<style scoped>
.review-container {
    --text-small: 12px;
    --text-middle: 14px;
    --text-large: 16px;
    --dark-grey-bg: #fff;
    --light-grey-bg: #fafafa;
    --btn-text-color: #181c21;
    --btn-primary-selected: #f4f4f4;
    --btn-primary-bg: #fdbf5a;
    --btn-normal-bg: #f4f4f4;
    --btn-normal-selected-bg: #d8d8d8;

    position: absolute;
    left: calc(100% + calc(3px + 2vw));
    top: 0;
    min-height: 540px;
    height: 540px;
    width: 720px;
}
.review-header {
    width: 100%;
    height: 38px;
    border-radius: 8px 8px 0 0;
    background-color: var(--dark-grey-bg);
    display: flex;
    align-items: center;
    padding-left: 10px;
}
.header-text {
    font-size: var(--text-middle);
}

.review-main {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: calc(100% - 98px);
    padding: 10px 0 20px 10px;
    background-color: var(--light-grey-bg);
}

.photo-inspect {
    position: relative;
    width: 550px;
    height: 474px;
}

.inspect-container {
    width: 100%;
    /* height: 350px; */
    box-shadow: 0px 2px 15px rgba(103, 103, 103, 0.3);
    border-radius: 8px;
}

.inspect-header {
    width: 100%;
    height: 38px;
    background-color: var(--dark-grey-bg);
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inspect-header-text {
    font-size: var(--text-middle);
}

.photo-full {
    width: 100%;
    height: 362px;
}

.photo-full img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 0 8px 8px;
}

.comments-input-wrapper {
    position: absolute;
    bottom: 50px;
    width: 100%;
    height: 54px;
    margin-top: 20px;
    padding: 7px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #ececec;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
}

.comments-input {
    flex: 1;
    height: 100%;
    outline: none;
    font-size: var(--text-large);
    background-color: transparent;
    border: none;
}

.send-btn {
    height: 40px;
    width: 120px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: var(--btn-normal-bg);
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    cursor: pointer;
}

.send-btn.btn-text {
    font-size: var(--text-small);
}

.photo-select {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 150px;
    padding: 10px 20px 10px 10px;
}

.photo-preview {
    width: 120px;
    height: 140px;
    margin-bottom: 5px;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(103, 103, 103, 0.3);
    border-radius: 5px;
}

.preview-header {
    width: 100%;
    height: 35px;
    border-radius: 5px 5px 0 0;
    background-color: var(--dark-grey-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.preview-header .header-text {
    font-size: var(--text-small);
}

.photo-min {
    width: 100%;
    height: 105px;
    border-radius: 0 0 5px 5px;
    background-color: #fafafa;
}

.photo-min img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 0 5px 5px;
}
.review-footer {
    width: 100%;
    height: 60px;

    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-radius: 0 0 8px 8px;
}

.footer-btn {
    width: 120px;
    height: 35px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--btn-normal-bg);
    box-shadow: 0px 2px 15px rgba(103, 103, 103, 0.3);
    margin-right: 20px;
    cursor: pointer;
}

.footer-btn.primary {
    background-color: var(--btn-primary-bg);
    transition: color 0.2s ease-in-out;
}

.footer-btn.primary:hover {
    color: var(--btn-primary-selected);
}

.btn-text {
    font-size: var(--text-small);
}
</style>