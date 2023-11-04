<template>
    <div class="left-nav-component">
        <router-link to="/video-upload">
            <div class="button">投稿</div>
        </router-link>

        <div class="nav-list">
            <router-link to="/create-info">
                <div class="li-item">
                    <div class="ico"><img src="../assets/ico/home.png"></div>
                    <div>首页</div>
                </div>
            </router-link>
            <router-link to="/video-manage">
                <div class="li-item">
                    <div class="ico"><img src="../assets/ico/home.png"></div>
                    <div>投稿管理</div>
                </div>
            </router-link>

            <router-link to="">
                <div class="li-item">
                    <div class="ico"><img src="../assets/ico/home.png"></div>
                    <div>其他</div>
                </div>
            </router-link>

        </div>
    </div>
</template>

<script>
export default {
    // 组件逻辑
};
</script>

<style scoped>

.button {
    background-color: #00A1D6;
    color: #ffffff;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    text-align: center;
    margin-top: 24px;
}

.li-item {
    display: flex;
    align-items: center;
    height: 30px;
    margin-bottom: 5px;
    border-radius: 4px;
    padding: 2px 10px;
}

.li-item > img {
    width: 100%;
    height: 100%;
}

.li-item:hover {
    background: rgba(153, 153, 153, 0.2);
    color: #00AEEC;
}

li {
    width: 136px;
    height: 30px;
    list-style-type: none;
    color: #9499a0;
    line-height: 30px;
}

.ico {
    height: 20px;
    margin-right: 20px;
}

/*包含以下四种的链接*/
a {
    text-decoration: none;
}

/*正常的未被访问过的链接*/
a:link {
    text-decoration: none;
}

/*已经访问过的链接*/
a:visited {
    text-decoration: none;
}

/*鼠标划过(停留)的链接*/
a:hover {
    text-decoration: none;
}

/* 正在点击的链接*/
a:active {
    text-decoration: none;
}

a {
    color: #9499a0;
}
</style>