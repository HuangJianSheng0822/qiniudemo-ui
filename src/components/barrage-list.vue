<script setup>
import {defineProps,ref} from "vue";
import {getBarrageListApi} from "@/api/barrage";

function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown');
  dropdown.classList.toggle('active');
}
const fatherData=defineProps({
  id:{
    type:String,
    required:true
  }
})
const barrageList=ref([])
    getBarrageListApi(fatherData.id)
    .then((res)=>{
      barrageList.value=res.data.data
    })
</script>

<template>
  <div class="dropdown" @click="toggleDropdown">
    <div class="dropdown-header">
      <div class="title">弹幕列表</div>
      <div class="arrow"></div>
    </div>
    <div class="dropdown-content">
      <div class="table-header">
        <div class="header-item">时间</div>
        <div class="header-item">弹幕内容</div>
        <div class="header-item">发送时间</div>
      </div>
      <div class="table-row" v-for="(item,index) in barrageList" :key="index">
        <div class="row-item">{{item.schedule}}</div>
        <div class="row-item">{{item.content}}</div>
        <div class="row-item">{{item.created}}</div>
      </div>
      <!-- 添加更多的表格行 -->
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.dropdown-header {
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 0 10px;
  cursor: pointer;
  height: 50px;
}

.title {
  color: #61666d;
  font-size: 12px;
}

.arrow {
  width: 10px;
  height: 10px;
  border-left: 2px solid #61666d;
  border-bottom: 2px solid #61666d;
  transform: rotate(-45deg);
  margin-left: auto;
}

.dropdown-content {
  display: none;
  background-color: #ffffff;
  padding: 10px;
}

.table-header {
  display: flex;
  color: #61666d;
  font-size: 12px;
}

.header-item {
  flex: 1;
}

.table-row {
  display: flex;
  color: #61666d;
  font-size: 12px;
  margin-top: 10px;
}

.row-item {
  flex: 1;
}

.dropdown.active .dropdown-content {
  display: block;
}
</style>