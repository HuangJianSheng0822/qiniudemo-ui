<template>
  <div class="author-info-container">
    <div class="user-info">
      <div class="avatar">
        <img :src="fatherData.userInfo.headImg" alt="用户头像">
      </div>
      <div class="details">
        <div class="name">{{ fatherData.userInfo.name }}</div>
        <div class="description">{{ fatherData.userInfo.desc }}</div>
        <button class="follow-button" @click="followUser">+ 关 注</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue';

const fatherData = defineProps({
  userInfo:{
    type:Object,
    required:false
  }
});
const followUser = () => {
  // 这里可以处理点击关注按钮的逻辑
};

</script>


<style scoped>
.author-info-container {
  height: 104px;
  box-shadow:
      0px 0px 22px rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  padding: 2px;

}

.user-info {
  display: flex;
  height: 80px;
  flex-direction: row;

}

.avatar {
  float: left;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar img {
  max-width: 70px;
  width: 50px;
  height: 50px;
  border-radius: 45%;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  flex: 1;
}

.name {
  color: #18191c;
  size: 16px;
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #9499a0;
  font-size: 13px;
}

.follow-button {
  border-radius: 2px;
  background-color: #00aeec;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
  border-color: #00aeec;
  border-width: 0px;
  font-weight: bold;
}

.follow-button:hover {
  background-color: #0f7ec7;
}
</style>