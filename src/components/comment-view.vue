<template>
  <div v-if="rootCommentList.length>0">
    <reply-comment :base-data="baseReplyCommentData" :head-img="parentData.headImg" @update-comment="loadMore"></reply-comment>
    <div v-for="(item,index) in rootCommentList" :key="index">
      <div class="comment">
        <div class="avatar">
          <img :src="item.headImg">
        </div>
        <div class="comment-content">
          <div class="comment-root-area">
            <div class="user-info">
              <span class="username" style="color: #FB7299;font-size: 14px;font-weight: 500">{{item.userName}}</span>
            </div>
            <div class="comment-text"> {{item.content}} </div>
            <div class="comment-bottom">
              <div class="comment-time"> {{item.created}} </div>
              <div class="like-ico">
                <svg t="1636093575017" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3323" width="16" height="16"><path d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z" p-id="3324" fill="#9499a0"></path></svg>
              </div>
              <div class="comment-like">
                {{item.likeCount}}
              </div>
              <div class="comment-like" @click="toggleReplyInput(index,item.id,item.userId,item.userName)">
                回复
              </div>
            </div>
          </div>
          <div class="comment-tag" v-if="index<3">
            热评
          </div>
          <div v-for="(childItem,childIndex) in item.childComments" :key="childIndex">
            <div>
              <div class="comment-children-area">
                <div class="avatar">
                  <img :src="childItem.headImg">
                </div>
                <div class="child-box">
                  <div class="comment-child-info">
                    <div>
                      <div class="user-info" style="float: left">
                        <span class="username" style="color: #FB7299;font-size: 14px;font-weight: 500">{{childItem.userName}} </span>
                      </div>
                      <span v-if="childItem.toUserId !=null"> 回复 </span>
                      <span v-if="childItem.toUserId !=null" style="color: #008ac5;margin-right: 5px"> {{childItem.toUserName}} </span>
                      <div class="comment-text" style="float: right"> {{childItem.content}} </div>
                    </div>
                    <div class="comment-bottom">
                      <div class="comment-time"> {{item.created}} </div>
                      <div class="like-ico">
                        <svg t="1636093575017" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3323" width="16" height="16"><path d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z" p-id="3324" fill="#9499a0"></path></svg>
                      </div>
                      <div class="comment-like">
                        {{childItem.likeCount}}
                      </div>
                      <div class="comment-like" @click="toggleReplyInput(index,item.id,childItem.userId,childItem.userName)">
                        回复
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="item.childCommentCount > 3">
            <div>
              <div @click="showMore(item.id,$event)"><span>共{{item.childCommentCount}}条回复，</span><span>点击查看</span></div>
              <div v-if="replyStates[item.id] &&item.childCommentCount>5">
                <el-pagination
                    small
                    layout="prev, pager, next"
                    :total="50"
                    :page-size="pageReqData.page_size"
                    :page-count="pageReqData.page_count"
                    @current-change="currentChange($event,item.id)">
                </el-pagination>
              </div>
            </div>
          </div>

          <div class="reply-com" :class="{active:activeIndex===index}">
            <reply-comment :base-data="baseReplyCommentData" :head-img="parentData.headImg" @update-comment="loadMore"></reply-comment>
          </div>
        </div>
      </div>
      <hr>
    </div>
  </div>
  <div v-else>
    <reply-comment :base-data="baseReplyCommentData" :head-img="parentData.headImg"
                   @update-comment="loadMore"></reply-comment>
  </div>

</template>

<script setup>
//import axios from 'axios';
import {defineProps, ref, reactive, onMounted, onUnmounted} from "vue";
import ReplyComment from "@/components/reply-comment.vue";
import {getChildCommentsApi, getRootCommentApi} from "@/api/comment";

//const rootComment=ref('');
const parentData=defineProps({
  id:{
    type:String,
    required:true
  }
})

const baseReplyCommentData=ref({
  videoId:parentData.id,
  rootId:null,
  toId:null,
  toName:null
})

const pageReqData=ref({
  page_size:10,
  page_count:10
})

const rootCommentList=ref([])
/*
getRootComment()
function getRootComment(){
  console.log(parentData.id)
  getRootCommentApi(parentData.id,0,5)
      .then((res)=>{
        rootCommentList.value=res.data.data
      })
      .catch(error => {
        console.error(error);
      });
}
*/
const currentChange=(page,rootId)=>{
  console.log("page:"+page+"rootID:"+rootId)
  console.log(rootCommentList.value)
  // eslint-disable-next-line no-unused-vars
  const data=[
    {
      "id": "13",
      "userId": "新增",
      "headImg": "https://p.qqan.com/up/2021-6/16239805423883054.jpg",
      "userName": "新增",
      "content": "根评论1的子评论1的子评论1",
      "created": "23-07-29 12:22",
      "toUserId": "4",
      "toUserName": "4",
      "likeCount": 2
    }
  ]
  rootCommentList.value.forEach(e=>{
    if (e.id===rootId){
      console.log("e:"+e.id+" rootid:"+rootId)
      e.childComments=data
    }
  })
  console.log(rootCommentList.value)

}
// eslint-disable-next-line no-unused-vars

const toggleReplyInput=(index,rootId,toId,toName)=> {
  if (index===activeIndex.value){
    changeActive(-1)
    return
  }
  changeActive(index)
  baseReplyCommentData.value.videoId=parentData.id;
  baseReplyCommentData.value.rootId=rootId;
  baseReplyCommentData.value.toId=toId;
  baseReplyCommentData.value.toName=toName;
}

// eslint-disable-next-line no-unused-vars
const showMore=(rootId,event)=>{
  replyStates[rootId] = true;
  const pro = event.currentTarget;
  //隐藏“显示更多”
  pro.style.display="none"  // 当前元素隐藏
  // 根据rootId发起axios请求获取更多的子评论数据

  getChildCommentsApi(rootId,0,10)
      .then(response => {
        // 将返回的子评论数据更新到对应的根评论中
        rootCommentList.value.forEach(item => {
          if (item.id === rootId) {
            item.childComments = response.data.data;
            // 显示“分页”
            if (item.childCommentCount > 10) {
              pro.nextElementSibling.style.display = "";
            }
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
}

const activeIndex=ref(-1)
// eslint-disable-next-line no-unused-vars
const changeActive = (index) => {
  activeIndex.value=index
};

const replyStates = reactive({});




const page = ref(-1)
//修改后
let readyForLoad = true; //默认允许加载一次
function loadMore() {
  if (readyForLoad && page.value < 10) {
    readyForLoad = false; //进来了就"锁上"
    console.log("执行了1")
    page.value++
    getRootCommentApi(parentData.id,page.value,5)
        .then(res => {
          console.log("执行了2")
          rootCommentList.value.push(...res.data.data)
          console.log("评论列表内容是（需要刷新）:")
          rootCommentList.value.forEach(e=>console.log(e))
        })
        .catch(err => {
          console.log(err)
        })
    readyForLoad = true;
  }
}

loadMore(); //初始加载一次

//滚动事件处理函数
function scrollHandle() {
  const scrollHeight = document.body.scrollHeight;
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const distance = scrollHeight - scrollTop - clientHeight;
  //console.log("distance" + distance)
  if (distance <= 1) {
    loadMore()
  }
}

onMounted(() => {
  //组件挂载时，添加scroll监听
  window.addEventListener("scroll", scrollHandle, false);
});
onUnmounted(() => {
  //组件卸载时，停止监听
  window.removeEventListener("scroll", scrollHandle, false);
});





</script>

<style scoped>
.comment {
  display: flex;
  margin-top: 14px;
  padding-bottom: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  margin-right: 23px;
}
.avatar>img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comment-content {
  flex: 1;
  /* Add your comment content styles here */
}

.comment-root-area{
  width: 731px;
  height: 85px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.user-info {

}

.username {
  margin-right: 5px;
  color: #61666D;
  font-size: 13px;
  margin-top: 5px;
}

.comment-time ,.comment-like{
  color: #9499a0;
  margin-right: 10px;
  font-size: 13px;
}

.comment-text {
  color: #18191C;
  font-size: 15px;
}

.comment-tag{
  width: 36px;
  height: 24px;
  background-color: #FFECF1;
  font-size: 12px;
  color: #FF6699;
  text-align: center;
  line-height: 24px;
  margin-top: 6px;
}

.comment-children-area{
  display: flex;
  width: 739px;
  height: 72px;
}

.comment-children-area>.avatar>img{
  width: 24px;
  height: 24px;
  margin-right: 24px;
}
.child-box{
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.comment-child-info{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.comment-bottom{
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reply-com{
  display: none;
}
.active{
  display: block;
}
</style>