<template>
    <div class="my-component">
        <div class="nav">
            <div class="navbar">
                <router-link to="/home">首页</router-link>
                <router-link to="/live-home">直播</router-link>
                <router-link to="/home">笔记</router-link>
            </div>
        </div>
        <div class="search">
            <!--使用element-plus组件-->
            <el-input
                v-model="searchValue"
                placeholder="请输入你要搜索的内容"
                class="search-box"
            >
                <template #append>
                    <el-button :icon="Search"/>
                </template>
            </el-input>
        </div>

        <div class="per">
            <user-head-card></user-head-card>
            <div class="nav">
                <div class="navbar">
                    <router-link to="/upload"></router-link>
                    <router-link to="/favlist">收藏</router-link>
                    <router-link to="/content" class="add-con-btn">投稿</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserHeadCard from "@/components/user-head-card.vue";
import {ref} from "vue";
import {Search} from '@element-plus/icons-vue'


// 搜索的内容
let searchValue = ref("");

</script>

<style scoped>

/*去除a标签下划线*/
a {
    text-decoration: none;
}

/*去除未被访问的a标签的下划线*/
a:link {
    text-decoration: none;
}

/*去除已经被访问过的a标签的下划线*/
a:visited {
    text-decoration: none;
}

/*去除鼠标悬停时的a标签的下划线*/
a:hover {
    text-decoration: none;
}

/*去除正在点击的a标签的下划线（鼠标按下，尚未松开）*/
a:active {
    text-decoration: none;
}

/*去除获得焦点的a标签的下划线（被鼠标点击过）*/
a:focus {
    text-decoration: none;
}

.my-component {
    min-width: 800px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    box-shadow: 0 6px 30px 0px rgba(0, 0, 0, 0.06);
    z-index: 99;
}


.navbar {
    display: flex;
    justify-content: center; /* 居中对齐 */
    padding: 10px;
}

.navbar a {
    margin: 0 10px;
    text-decoration: none;
}


.search-box {
    width: 400px;
}

.search-box /deep/ .el-input__wrapper {
    border-radius: 24px 0 0 24px;
}

.search-box /deep/ .el-input-group__append {
    border-radius: 0 24px 24px 0;
}

.input-field {
    flex: 1;
    height: 100%;
    padding: 10px;
    border: none;
    background-color: #fff;
}

.search-button {
    width: 40px;
    height: 100%;
    border: none;
    background-color: #ccc;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

a {
    color: #18191C;
}

.per {
    display: flex;
    align-items: center;
}

.per .nav .navbar {
    display: flex;
    align-items: center;
}

.add-con-btn {
    width: 98px;
    height: 34px;
    background-color: #FB7299;
    font-size: 14px;
    color: white;
    font-weight: bold;
    text-align: center;
    line-height: 34px;
    border-radius: 2px;
}
</style>