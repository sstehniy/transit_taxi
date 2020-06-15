<template>
    <div class="review-container">
        <p class="review-number">№{{reviewInfo.id}}</p>
        <p
            class="auto-info"
        >{{reviewInfo.auto_model}} ({{reviewInfo.auto_color}}) {{reviewInfo.auto_number}}</p>
        <p class="time-info">
            <span id="label">Начало:</span>
            <span id="time">
                <img :src="require('@/assets/time-icon.svg')" alt="time-icon" id="clock" />
                <p>{{reviewInfo.startDate.time}}</p>
            </span>
            <span id="date">
                <img :src="require('@/assets/calender-icon.svg')" alt="time-icon" id="calender" />
                <p>{{reviewInfo.startDate.date}}</p>
            </span>
        </p>
        <p class="time-info">
            <span id="label">Получение:</span>
            <span id="time">
                <img :src="require('@/assets/time-icon.svg')" alt="time-icon" id="clock" />
                <p>{{reviewInfo.recieveDate.time}}</p>
            </span>
            <span id="date">
                <img :src="require('@/assets/calender-icon.svg')" alt="time-icon" id="calender" />
                <p>{{reviewInfo.recieveDate.date}}</p>
            </span>
        </p>
        <div v-if="showMore" class="review-comments">
            <p>Комментарии:</p>
            <p>{{reviewInfo.comments}}</p>
        </div>
        <img
            :src="require('@/assets/status-changer-icon.svg')"
            alt="more-icon"
            id="more"
            @click="$emit('toggle-options', $event)"
        />
        <div class="footer-line"></div>
    </div>
</template>

<script>
export default {
    name: "ReviewMin",
    props: {
        reviewInfo: Object,
        showMore: Boolean
    }
};
</script>

<style scoped>
.review-container {
    position: relative;
    min-height: 86px;
    margin: 0;
    padding: 10px;
    background-color: #fafafa;
}

.review-number,
.auto-info {
    font-size: 13px;
}
.time-info {
    position: relative;
    display: flex;
    line-height: 17px;
    margin-top: 3px;
    align-content: center;
}

.time-info * {
    font-size: 13px;
}

#time,
#date {
    height: 100%;
    display: flex;
    position: absolute;
}

#time {
    left: 90px;
}

#date {
    left: 160px;
}

.time-info img {
    margin-right: 5px;
}

img#more {
    position: absolute;
    top: 10px;
    right: 15px;
    height: 14px;
    cursor: pointer;
}

.review-comments {
    height: 30px;
    width: 280px;
    margin-bottom: 20px;
}

.review-comments p {
    display: block;
    font-size: 13px;
}

.review-comments p:last-child {
    line-height: 28px;
    width: 100%;
    padding: 0 5px;
    background-color: #ececec;
    outline: none;
    border-radius: 5px;
    border: none;
}

.footer-line {
    position: absolute;
    bottom: 5px;
    height: 1.5px;
    width: 94%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ececec;
}
</style>