<template>
  <div class="root">
    <div class="top">
      <home-top-bar></home-top-bar>
    </div>

    <div class="main">
      <div class="main-left">
        <div class="info">
          <playing-title :video-info="videoInfo"></playing-title>
        </div>
        <div class="playing">
          <playing-box :video-info="videoInfo" :id="id"></playing-box>
        </div>
        <div class="comment-area">
          <comment-view :id="id"></comment-view>
        </div>
      </div>
      <div class="main-right">
        <div class="author-info-container">
          <user-card :user-info="userInfo"></user-card>
        </div>
        <div class="next-list">
          <recommend-list></recommend-list>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import PlayingTitle from "@/components/playing-title.vue";
import PlayingBox from "@/components/playing-box.vue";
import CommentView from "@/components/comment-view.vue";
import HomeTopBar from "@/components/home-top-bar.vue";
import UserCard from "@/components/user-card.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";
import RecommendList from "@/components/recommend-list.vue";
import {getUserInfoApi} from "@/api/user";
import { getVideoInfoApi, updatePlayCountApi} from "@/api/video";
const route=useRoute()
const id=route.params.id
const userId=route.params.userId
const userInfo=ref({
  name:'',
  headImg:'',
  desc:''
})
const videoInfo=ref({
  id:"",
  title: "",
  playUrl: "",
  type: null,
  tags: "",
  description: "dd",
  created: "2023-07-27T13:38:56.000+00:00",
  playback: 0
})
//根据id获取视频标题信息
//根据id获取视频信息
getUserInfo(userId)
getVideoInfo(id);
updatePlayCount(id)
function updatePlayCount(videoId){
  updatePlayCountApi(videoId).then((req)=>{
    console.log(req.data)
  })
}
function getUserInfo(userId){
  getUserInfoApi(userId)
      .then((res)=>{
        userInfo.value=res.data.data
      })
      .catch(error => {
        console.error(error);
      });
}
function getVideoInfo(id){
      getVideoInfoApi(id)
      .then((res)=>{
        videoInfo.value=res.data.data
      })
      .catch(error => {
        console.error(error);
      });
}


</script>

<style scoped>
.top{
  height: 50px;

}
.main {
  margin-top: 20px;
  display: flex;
  padding: 0 10%;
}

.main-left {
  display: flex;
  flex-direction: column;
  width: 75%;
  min-width: 888px;
  margin-right: 2%;
}

.main-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 300px;
}
.info{
  height: 85px;
}

.comment-area{

}
.author-info-container {
  height: 104px;
}
.bui-area {
}
.next-list{
  flex: 1;
}


</style>