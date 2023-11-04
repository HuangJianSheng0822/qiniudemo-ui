<template>
  <div class="root">
    <el-upload
        action=""
        :class="{ disabled: isShow }"
        list-type="picture-card"
        :http-request="uploadFile"
        :on-remove="handleRemove"
        :limit="1">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script setup>
// 上传方法
import * as qiniu from "qiniu-js";
import axios from "axios";
import {ref} from "vue";
const isShow=ref(false);
const fileName=ref(null);
const uploadFile=(uploadInfo)=>{
  console.log(uploadInfo)
  axios.get("/up/token")
      .then(res => {
        console.log('success')
        console.log(res.data)
        // 上传文件
        const observer = {
          next(res){
            console.log("上传进度："+res.total.percent)
          },
          error(err){
            console.log(err)
          },
          // eslint-disable-next-line no-unused-vars
          complete(res){
            isShow.value=true;
            console.log("上传成功，返回消息："+res+'文件：http://s3hhuwkww.hd-bkt.clouddn.com/'+ +fileName.value)
          }
        }
        fileName.value= new Date().getTime();
        const observable = qiniu.upload(uploadInfo.file, fileName.value, res.data, {}, {})
        // eslint-disable-next-line no-unused-vars
        const subscription = observable.subscribe(observer) // 上传开始
        // subscription.unsubscribe() // 上传取消
      })
      .catch(err => {
        console.log('获取上传 token 失败'+err)
      })
}
// 图片删除
const handleRemove=()=>{
  isShow.value=false;
}

</script>

<style>
.disabled .el-upload--picture-card {
  display: none !important;
}
</style>
