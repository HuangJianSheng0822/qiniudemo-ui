<template>
    <div class="page">
        <div class="wallpaper"></div>
        <div class="container">
            <div class="top">
                <!-- 顶部组件 -->
                <email-ico></email-ico>
            </div>
            <div class="content">
                <div class="left">
                    <!-- 左侧导航栏组件 -->
                    <user-upload-bar></user-upload-bar>
                </div>
                <div class="right">
                    <!-- 右侧内容区域 -->
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import EmailIco from "@/components/email-ico.vue";
import UserUploadBar from "@/components/user-upload-bar.vue";
</script>
<style scoped>

.wallpaper {
    background-color: #f5f5f5;
    position: fixed;
    width: 100%;
    height: 100%;
}

.container {
    position: relative;
}

.top {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    z-index: 2;
    width: calc(100% - 40px);
}


.content {
    flex: 1;
    display: flex;
    flex-direction: row;
}

.left {
    width: 200px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    height: calc(100vh - 52px);
    position: fixed;
    left: 0;
    padding-top: 60px;
}

.right {
    flex: 1;
    padding: 20px;
    width: 100%;
    margin-left: 200px;
    margin-top: 60px;
}

</style>