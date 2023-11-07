<template>
	<div class="avatar-container">
		<div
			class="avatar"
			:class="{ 'avatar-active': isHovered }"
			@mouseover="handleMouseOver"
			@mouseleave="handleMouseLeave"
		>
			<img :src="rootUrl+avatarUrl"/>
			<div v-if="isHovered&&isLogin" class="card">
				<div class="user-id">{{ userInfo.name }}</div>
				<div class="card-content">
					<div class="click-area">
						<img src="../assets/ico/home.png" style="width: 20px">
						<router-link to="/account"><span class="text">个人中心</span></router-link>
					</div>
					<div class="click-area">
						<img src="../assets/ico/home.png" style="width: 20px">
						<span class="text">投稿管理</span>
					</div>
				</div>
				<div class="logout-box">
					<img src="../assets/ico/home.png" style="width: 20px">
					<div class="flex-center">
						<span class="text" @click="logout">退出登录</span>
						<img src="../assets/ico/to-right.png" style="width: 20px;float: right">
					</div>
				</div>
			</div>
      <div v-if="isHovered&&!isLogin" class="card">

        <div class="card-content">
          <div class="click-area">
            <router-link to="/login">
              <div class="go-login">立即登录</div>
            </router-link>
          </div>

        </div>
      </div>
		</div>
	</div>
</template>


<script setup>
import {ref} from "vue";
import {hasLogin} from "@/util/hasLogin";
import {getUserSelf} from "@/api/user";
import {getRootUrl} from "@/util/qiniu";
import {useRouter} from "vue-router";
const router = useRouter();
const rootUrl=getRootUrl();
const isLogin=hasLogin()
const avatarUrl = ref("1699102514542");

const isHovered = ref(false);
const userInfo=ref({
  name:'',
  headImg:'',
  desc:''
})
if (isLogin){
  getUserSelf()
      .then(res=>{
        userInfo.value=res.data.data
        avatarUrl.value=userInfo.value.headImg
      })
      .catch(e=>{
        console.log(e)
      })
}

const handleMouseOver = () => {
	isHovered.value = true;
};
const handleMouseLeave = () => {
	isHovered.value = false;
};

const logout=()=>{
  router.push('/login');
  localStorage.removeItem('token')
}
</script>

<style scoped>
.avatar-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.avatar {
	position: relative;
	width: 50px;
	height: 50px;
	cursor: pointer;
	transition: all 0.3s ease;
}

.avatar img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
}

.avatar-active {
	width: 70px;
	height: 70px;
}

.card {
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	width: 250px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	padding: 10px;
	color: #61666D;
	z-index: 99;
	cursor: auto;
}

.card-content {
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px 0;
}

.click-area {
	padding: 5px;
	width: 100%;
	display: flex;
	align-items: center;
	cursor: pointer;
	border-radius: 4px;
}

.click-area:hover {
	background: rgba(153, 153, 153, 0.2);
}

.click-area:hover span {
	color: #00A1D6;
}

.click-area span {
	margin-left: 10px;
	color: #333333;
	font-size: 14px;
}

.click-area a {
	text-decoration: none;
}

.user-id {
	font-weight: bold;
	margin-bottom: 10px;
	text-align: center;
	padding: 5px 0;
}

ul {
	list-style: none;
	padding: 0 10px;
	margin: 0;
	width: 100%;
}

li {
	height: 40px;
}

.li-content {
	display: flex;
	align-items: center;
}

.li-content > img {
	margin-right: 17px;
}

.li-content .icon {
	margin-right: 10px;
}

.logout-box {
	border-top: 1px solid #ececec;
	display: flex;
	align-items: center;
	padding: 5px 0;
	cursor: pointer;
}

.logout-box:hover {
	background: rgba(153, 153, 153, 0.2);
}

.logout-box:hover .flex-center span {
	color: #00A1D6;
}



.flex-center {
	display: flex;
	align-items: center;
}

.logout-box .flex-center span {
	margin-left: 10px;
	color: #333333;
	font-size: 14px;
}
.go-login{
  font-size: 14px;
  color: white;
  text-align: center;
  background-color: #00AEEC;
  width: 250px;
  height: 50px;
  border-radius: 5px;
  border-width: 0;
  line-height: 50px;

}
</style>
