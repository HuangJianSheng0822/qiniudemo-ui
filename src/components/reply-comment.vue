<template>
<div class="root">
  <div class="head-box">
    <img :src="userInfo.headImg" alt="">
  </div>

  <div class="input-box">
    <el-form
    :model="formData"
    :rules="rules"
    :inline="true"
    ref="formRef"
    style="width: 100%">
      <el-form-item prop="content" style="margin: 0;padding: 0;margin-right: 5px;margin-left: 10px">
        <el-input
            v-model="formData.content"
            autocomplete="off" type="text"
            input-style="height:50px;"
        @keyup.enter="submitForm('formData')">
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('formData')" style="height: 50px">
        发布
      </el-button>
    </el-form>

  </div>
</div>
</template>

<script setup>
import {ref,defineProps,defineEmits} from "vue";
import {addCommentApi} from "@/api/comment";
import {getUserSelf} from "@/api/user";

const userInfo=ref({
  "headImg":''
})
const emits = defineEmits(["update-comment"]);
getUserSelf().then(res=>{userInfo.value=res.data.data})
const fatherData=defineProps({
  baseData:{
    type:Object,
    required:true
  }
})
const formData=ref({
  content:null,
  videoId:null,
  rootId:null,
  toId:null,
  toName:null
})
const formRef=ref(null)
const rules=ref({
  content:[{required:true,message:'',trigger:'blur'}]
})
const submitForm=()=>{
  formRef.value.validate(valid=>{
    if (valid){
          formData.value.videoId=fatherData.baseData.videoId,
          formData.value.rootId=fatherData.baseData.rootId,
          formData.value.toId=fatherData.baseData.toId,
          formData.value.toName=fatherData.baseData.toName
      addCommentApi(formData.value)
          .then(res=>{
            if (res.data.data===true){
              formData.value.content=null
              emits('update-comment',true)
            }
          })
          .catch(e=>{
            console.log(e)
          })
    }
  })
}
</script>
<style scoped>
.root{
  display: flex;
  align-items: center;
  min-height: 96px;
  flex-wrap: wrap;
}
.head-box>img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>