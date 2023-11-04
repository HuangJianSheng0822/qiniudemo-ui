<script setup>

</script>

<template>
    <div class="root">
        <el-card class="box-card">
            <div class="clearfix">
                <span>热门活动</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
            </div>
            <div v-for="o in 7" :key="o" class="text item">
                {{ '列表内容 ' + o }}
            </div>
        </el-card>
        <div class="check-challenge">
            打卡挑战
        </div>
    </div>

</template>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 400px;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    overflow: auto;
}

.check-challenge {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 174, 236, 0.1);
    margin-top: 20px;
}
</style>