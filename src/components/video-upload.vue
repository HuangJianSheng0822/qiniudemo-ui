<template>
  <div class="container">
    <div v-if="showUpload" class="upload">

      <div class="upload-container">
        <div class="fileinp">
          <div class="upload">选择文件</div>
          <input type="file" @change="fileChange($event)" class="file-up" title="" id="fileUpload">
        </div>
      </div>

    </div>


    <!---------------------------------------视频上传中---------------------------------------------->
    <div v-else class="upload-success">

      <!---------------视频上传进度区域--------------------->
      <div class="upload-progress-area">
        <div>
          <img src="../assets/ico/video.png" alt="">
        </div>
        <div class="progress-bar-area">
          <div class="progress-text">
            上传进度: {{ authProgress }}%
            <div class="uploading-controller-area">

              <button @click="pauseUpload" :disabled="pauseDisabled">暂停</button>
              <button @click="resumeUpload" :disabled="resumeDisabled" >恢复上传</button>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-inner" :style="{ width: authProgress + '%' }"></div>
          </div>
        </div>
      </div>


      <!--------------------------视频参数配置-------------------------------->
      <div class="video-setting-area">
        <!---------------封面上传区域--------------------->


        <!---------------表单上传区域--------------------->
        <el-form
            :model="form"
            label-width="120px"
            :label-position="'left'"
            :rules="rules"
            ref="formRef">

          <el-form-item label="封面" prop="coverUrl">
            <upload-img-qiniu @file-name="updateCoverUrl"></upload-img-qiniu>
          </el-form-item>


          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="标题建议提炼靓点内容" ></el-input>
          </el-form-item>

          <el-form-item label="类型" prop="typeId">
            <el-select v-model="form.typeId" placeholder="请选择视频类型">
              <el-option label="动漫" value="1"></el-option>
              <el-option label="mv" value="2"></el-option>
            </el-select>
          </el-form-item>


          <!-------tag---->
          <el-form-item label="Tags">
            <el-tag v-for="(tag, index) in form.tags" :key="index" closable @close="removeTag(index)">
              {{ tag }}
            </el-tag>
            <el-input v-model="newTag" placeholder="Enter a tag" @keyup.enter="addTag"></el-input>
          </el-form-item>




          <el-form-item label="简介" prop="description">
            <el-input type="textarea" v-model="form.description"  placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧(:"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>


        </el-form>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import UploadImgQiniu from "@/components/qiniu/upload-img-qiniu.vue";
import {addVideoApi, getUploadAuthApi} from "@/api/video";
import * as qiniu from "qiniu-js";
const showUpload=ref(true); //是否显示上传界面
const authProgress=ref(0) // 上传进度
// eslint-disable-next-line no-unused-vars
const uploadDisabled=ref(true);// 开始，此时不能点击
const resumeDisabled=ref(false); // 恢复上传
const pauseDisabled=ref(true); // 恢复上传
const fileName=ref(null);//文件名,作为视频id
const formRef=ref(null)
const form=ref({
  videoId:'',
  coverUrl:'',
  title: 'title',
  typeId: '',
  description: '',
  tags:[],
})
const rules=ref({
  coverUrl: [
    { required: true,message: '封面不能为空', trigger: 'blur'},
  ],
  title: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  typeId: [
    { required: true, message: '请选择', trigger: 'change' }
  ],
  description: [
    { required: false, message: '', trigger: 'blur' }
  ]
})
const newTag=ref('')

const file=ref(null)
const fileChange=(e)=> {

  file.value= e.target.files[0];

  if (file.value==null) {
    alert('请先选择需要上传的文件!');
    return;
  }

  console.log("文件已选择："+file.value.name)
  showUpload.value=false

  getUploadAuthApi().then(res => {

    // 上传文件
    const observer = {
      next(res){
        authProgress.value=Math.trunc(res.total.percent)
      },
      error(err){
        console.log(err)
      },
      // eslint-disable-next-line no-unused-vars
      complete(res){
        console.log("上传成功，返回消息："+res+'文件：http://s3hhuwkww.hd-bkt.clouddn.com/'+ +fileName.value)
        form.value.videoId=fileName.value
        console.log("coverUrl:"+'http://s3hhuwkww.hd-bkt.clouddn.com/'+ +fileName.value)
      }
    }
    fileName.value= new Date().getTime();
    const observable = qiniu.upload(file.value, fileName.value, res.data, {}, {})
    // eslint-disable-next-line no-unused-vars
    const subscription = observable.subscribe(observer) // 上传开始
    // subscription.unsubscribe() // 上传取消
  })
      .catch(err => {
        console.log('获取上传 token 失败'+err)
      })

}


const updateCoverUrl = (value) => {
  form.value.coverUrl=value;
  console.log("封面是："+value)
}

const submitForm=()=>{
  console.log("表单"+form.value)
  formRef.value.validate(valid=>{
    if (valid) {

      addVideoApi(form.value)
          .then(response => {
            if (response.data.data) {
              // 成功后的跳转逻辑，可以使用页面重定向或者编程式导航


            } else {

              alert('接口异常');
            }
          })
          .catch(error => {
            console.error(error);
          });

    } else {
      console.log('error submit!!');
      return false;
    }
  })
}


</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.upload-container{
  display: flex;
  align-items: center; /*垂直方向居中*/
  justify-content: center;  /*水平方向居中*/
  border: 1px dashed #00AEEC;
  height: 255px;
}
.file {
  margin-bottom: 30px;
}
.fileinp {
  width: 108px;
  height: 30px;
  overflow: hidden;
  position: relative;
  margin: auto;
  background-color: #00AEEC;
  text-align: center;
}
.upload {
  width: 70%;
  border-radius: 13px;
  text-align: center;
  padding: 4px;
  color: #fff;
  margin-left: 11px;
}
.file-up {
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  cursor: pointer;

}
.upload-success{
  flex: 1;
}
/*上传进度条*/
.upload-progress-area{
  height: 50px;
  display: flex;
  font-size: 14px;
}

.progress-bar-area{
  height: 50px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.progress-bar{
  height: 3px;
  background-color: #00AEEC;
}
.progress-bar-inner{
  height: 3px;
  background-color: red;
}

/**控制暂停恢复*/
.uploading-controller-area{
  float: right;
  display: flex;
}
.uploading-controller-area>button{
  margin-right: 10px;
  width: 100px;
  height: 20px;
  background-color: #00AEEC;
  color: white;
  border-width: 0px;
}

.uploading-controller-area>button:active{

  background-color: coral;
}

/*视频参数配置*/
.video-setting-area{
  margin-top: 50px;

}



/*表单元素间隔*/
.el-form-item{
  margin-bottom: 50px;
}
/*tag*/


/*图片上传*/
/*封面上传*/
.avatar-uploader {
  border: 1px dashed #1f72ba;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
  text-align: center;
}
.avatar-uploader :hover {
  border-color: #409EFF;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.upload-icon{
  width: 50px;
  margin-top: 54px;
}
</style>