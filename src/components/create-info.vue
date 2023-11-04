<script setup>
import CarouselView from "@/components/carousel-view.vue";
import ActivityList from "@/components/activity-list.vue";
import LikesData from "@/components/likes-data.vue";
</script>

<template>
    <div class="root">
        <div class="activity-box">
            <div class="carousel-box">
                <CarouselView/>
            </div>
            <div class="activity-list-box">
                <activity-list></activity-list>
            </div>
        </div>
        <div class="video-info-box">
            <likes-data></likes-data>
        </div>
        <!--评论区域-->
        <div class="comment-info-box">
            这里是评论区域
        </div>
        <!--创作区域-->
        <div class="creation">
            <div class="content-block" v-for="(item,index) in 10" :key="index">
                <div class="content-block__image"></div>
                <div class="content-block__title">这里是规范{{ item }}</div>
            </div>
        </div>

    </div>
</template>


<style scoped>
.root {
    margin: 0 auto;
    width: 90%;
}

.activity-box {
    width: 70%;
    margin-bottom: 20px;
}

.activity-box {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.carousel-box {
    width: 60%;
    height: 100%;
    margin-right: 20px;

}

.activity-list-box {
    flex: 1;
}

.comment-info-box {
    height: 200px;
    background-color: #92de53;
}

.video-info-box {
    margin-bottom: 20px;
}

.creation {
    background: #ffffff;
    padding: 20px;
    border-radius: 4px;
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-gap: 20px;
}

.content-block {

}

.content-block__image {
    width: 200px;
    height: 120px;
    border-radius: 4px;
    background: #00AEEC;
}

.content-block__title {
    font-size: 14px;
    color: #333333;
    margin-top: 10px;
}
</style>