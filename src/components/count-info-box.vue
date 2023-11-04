<template>
	<router-link :to="fatherData.to">
		<div class="box">
			<div class="info">
				<div class="ico">
					<slot name="ico"></slot>
				</div>
				<div class="title">
					<slot name="title"></slot>
				</div>
				<slot name="right"></slot>
			</div>
			<div class="count">
				2
			</div>
		</div>
	</router-link>
	
</template>

<script setup>
	import { defineProps } from 'vue';
	
	const fatherData = defineProps(['to']);
</script>

<style scoped>
	.box{
		width: 221px;
		height: 88px;
		border-radius: 5px;
		background-color: #F5FCFE;
		padding: 16px;
	}
	.count{
		color: #00aeec;
		font-size: 22px;
		font-weight: bold;
	}
	.info{
		display: flex;
	}
	.info>div{
		margin-right: 4px;
	}
	.ico>img,.has>img{
		width: 20px;
		height: 20px;
	}
	.title{
		color: #61666D;
		font-size: 14px;
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
  a{
    color: #9499a0;
  }
</style>