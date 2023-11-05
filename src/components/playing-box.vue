<script setup>
import {defineProps, onMounted, ref} from "vue";
import {hasLogin} from "@/util/hasLogin";
import {getCollectListApi, addCollectVideoApi, hasCollectVideoApi} from "@/api/collect";
import {getRootUrl} from "@/util/qiniu";
const videoPlayerRef = ref(null);

const fatherData=defineProps({
  videoInfo:{
    type:Object,
    required:false
  },
  id:{
    type:String,
    required:true
  }
})
const canvas = ref(null);
const ctx = ref(null);
const texts = ref([]);
const nowColor = ref('#FF0000');

const barrageData=ref({
  "userId":"",
  "videoId":"",
  "content":"",
  "schedule":""
})

const update = () => {
  ctx.value.clearRect(0, 0, 500, 100);
  for (let i = 0; i < texts.value.length; i++) {
    texts.value[i].x -= 1;
    if (texts.value[i].x < -500) texts.value.splice(i, 1);
  }

  texts.value.forEach((item) => {
    ctx.value.font = '16px Arial';
    ctx.value.fillStyle = item.color;
    ctx.value.fillText(item.txt, item.x, item.y);
  });

  window.requestAnimationFrame(update);
};

const addText = (nowTxt) => {
  if (nowTxt !== '') {
    texts.value.push({
      txt: nowTxt,
      x: canvas.value.width,
      y: Math.random() * (canvas.value.height - 16) + 16,
      color: nowColor.value
    });
  }
  console.log(texts.value)
};
onMounted(() => {
  canvas.value.width = 500;
  canvas.value.height = 100;
  ctx.value = canvas.value.getContext('2d');
  update();
});

// 创建响应式的WebSocket URL
const webSocketUrl = ref(`ws://192.168.31.248:8080/barrage?videoId=${fatherData.id}`);
const webSocket = new WebSocket(webSocketUrl.value);
// 监听WebSocket消息接收事件
webSocket.onmessage = (event) => {
  let parse = JSON.parse(event.data);
  addText(parse.content)
};
webSocket.onopen = function() {
  console.log("ws调用连接成功回调方法")

}

const sendBarrage=()=>{
  const videoPlayer = videoPlayerRef.value;
  const currentTime = videoPlayer.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // 将barrageData数据转换为JSON字符串
  barrageData.value.videoId=fatherData.id;
  barrageData.value.userId=localStorage.getItem("token");
  barrageData.value.schedule=formattedTime
  const dataToSend = JSON.stringify(barrageData.value);
  webSocket.send(dataToSend);
}
onMounted(() => {
  videoPlayerRef.value = document.querySelector('video');
});
// eslint-disable-next-line no-unused-vars
const handleMouseOver = (tag) => {
  // Handle mouseover event, change the tag's style here if needed
};

// eslint-disable-next-line no-unused-vars
const handleMouseLeave = (tag) => {
  // Handle mouseleave event, reset the tag's style here if needed
};

const collectList=ref([])
const showPopover=ref(true)
// eslint-disable-next-line no-unused-vars
const collectHandler=async ()=>{
  getCollectListApi()
      .then((res)=>{
        collectList.value= res.data.data
      })
      .catch(err=>{
        console.log(err)
      })
  console.log(collectList.value)
}
onMounted(()=>{
  if (hasLogin()){
    showPopover.value=false
  }
})


// 使用ref来存储用户选择的收藏夹ID
const selectedFolder = ref('');

// 提交表单的处理函数
const submitForm = (event) => {
  event.preventDefault();
  if (!selectedFolder.value) {
    alert('请选择一个收藏夹！');
    return;
  }
  // 这里可以进行表单提交的操作，比如发送选中的收藏夹ID到后端
  addCollectVideoApi(selectedFolder.value,fatherData.id)
      .then((res)=>{
        console.log(res.data.data)
      })
      .catch(err=>{
        console.log(err)
      })
};

const likeVideo=ref(false)
const collectVideo=ref(false)
hasCollectVideoApi(fatherData.id).then(res=>{collectVideo.value=res.data.data}).catch(e=>{console.log(e)})

const rootUrl=getRootUrl();
</script>
<template>
  <div>
    <div class="play">
      <div class="video-wrapper">
        <canvas ref="canvas"></canvas>
        <video ref="videoPlayer" :src="rootUrl+fatherData.videoInfo.playUrl" controls></video>
      </div>
    </div>
    <div class="video-bar">
      <div class="like-box like-box">
        <div class="is_like" v-if="!likeVideo">
          <img src="@/assets/ico/like.png">
        </div>
        <div class="is_like" v-else>
          <img src="@/assets/ico/like_ok.png">
        </div>
      </div>

      <div>
        <el-popover placement="left-end" :width="400" trigger="click" @show="collectHandler" :disabled=showPopover>
          <template #reference>
            <div class="collect-box like-box">
              <div class="is_collect" v-if="!collectVideo">
                <img src="@/assets/ico/collect.png">
              </div>
              <div class="is_collect" v-else>
                <img src="@/assets/ico/collect_ok.png">
              </div>
            </div>
          </template>
          <div>
              <form @submit="submitForm">
                <div v-for="folder in collectList" :key="folder.id" class="col-box">
                  <input type="radio" :value="folder.id" v-model="selectedFolder" />
                  {{ folder.name }}
                </div>
                <button type="submit">提交</button>
              </form>


          </div>
        </el-popover>
      </div>

      <div class="barrage-box">
        <input type="text" v-model="barrageData.content" @keydown.enter="sendBarrage" class="barrage-input">
        <button type="button" @click="sendBarrage()" class="barrage-sub-btn">发送</button>
      </div>
    </div>
    <div class="video-desc">{{ fatherData.videoInfo.description }}</div>
    <div class="video-tags">
      <!--
      <div v-for="tag in fatherData.videoInfo.tags" :key="tag" class="tag" @mouseover="handleMouseOver(tag)" @mouseleave="handleMouseLeave(tag)">
        {{ tag }}
      </div>
      -->
    </div>
  </div>
</template>


<style scoped>

.play,canvas {
  width: 100%;
  height: 80%;
}
.video-wrapper {
  position: relative;
  height:100%;
  min-height: 500px;
  z-index: 999;
}
.video-wrapper video
{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
canvas{
  height: 37%;
  z-index: 1;
}
video{
  object-fit: fill;
}
.video-bar {
  height: 57px;
  box-shadow:
      3.6px 3.6px 4px -22px rgba(0, 0, 0, 0.035),
      29px 29px 18px -22px rgba(0, 0, 0, 0.07);
}

.video-desc {
  margin: 10px 0;
}

.video-tags {
  height: 57px;
  background-color: antiquewhite;
}

.tag {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 18px;
  cursor: pointer;
}

.tag:hover {
  color: blue;
}
video{
  z-index: -1;
  //pointer-events: none; /* 让元素A不响应事件 */
}
.barrage-input{
  height: 28px;
  border-color: #dcdfe6;
  border-width: 1px;
}
.barrage-sub-btn{
  width: 62px;
  height: 32px;
  background-color: #409EFF;
  color: white;
  font-size: 13px;
  padding: 13px;
  border-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  border-radius: 1px;
}
.barrage-box{
  display: flex;
  margin-left: auto;
}
.video-bar{
  display: flex;
  align-items: center;
  padding-right: 20px;
}
.like-box{
  background-color: transparent;
  width: 50px;
  height: 50px;
  margin-left: 50px;
}
.like-box:hover{
  cursor: pointer;
}
.col-box{
  height: 40px;
}
svg{
  width: 30px;
}
</style>