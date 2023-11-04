<script setup>
import CountInfoBox from "@/components/count-info-box.vue";
import {ref} from "vue";
const path=ref('');
</script>

<template>
  <div class="likes-root">
    <div>
      <CountInfoBox :to="path">
        <template v-slot:ico>
          <img src="@/assets/ico/home.png" />
        </template>
        <template v-slot:title>
          播放量
        </template>
        <template v-slot:right>
          <div class="has"><img src="@/assets/ico/to-right.png" /></div>
        </template>
      </CountInfoBox>
    </div>

    <div>
      <CountInfoBox :to="path">
        <template v-slot:ico>
          <img src="@/assets/ico/home.png" />
        </template>
        <template v-slot:title>
          播放量
        </template>
        <template v-slot:right>
          <div class="has"><img src="@/assets/ico/to-right.png" /></div>
        </template>
      </CountInfoBox>
    </div>
    <div>
      <CountInfoBox :to="path">
        <template v-slot:ico>
          <img src="@/assets/ico/home.png" />
        </template>
        <template v-slot:title>
          播放量
        </template>
        <template v-slot:right>
          <div class="has"><img src="@/assets/ico/to-right.png" /></div>
        </template>
      </CountInfoBox>
    </div>
    <div>
      <CountInfoBox :to="path">
        <template v-slot:ico>
          <img src="@/assets/ico/home.png" />
        </template>
        <template v-slot:title>
          播放量
        </template>
        <template v-slot:right>
          <div class="has"><img src="@/assets/ico/to-right.png" /></div>
        </template>
      </CountInfoBox>
    </div><div>
    <CountInfoBox :to="path">
      <template v-slot:ico>
        <img src="@/assets/ico/home.png" />
      </template>
      <template v-slot:title>
        播放量
      </template>
      <template v-slot:right>
        <div class="has"><img src="@/assets/ico/to-right.png" /></div>
      </template>
    </CountInfoBox>
  </div>
    <div>
      <CountInfoBox :to="path">
        <template v-slot:ico>
          <img src="@/assets/ico/home.png" />
        </template>
        <template v-slot:title>
          播放量
        </template>
        <template v-slot:right>
          <div class="has"><img src="@/assets/ico/to-right.png" /></div>
        </template>
      </CountInfoBox>
    </div>
    <div>
      <CountInfoBox :to="path">
        <template v-slot:ico>
          <img src="@/assets/ico/home.png" />
        </template>
        <template v-slot:title>
          播放量
        </template>
        <template v-slot:right>
          <div class="has"><img src="@/assets/ico/to-right.png" /></div>
        </template>
      </CountInfoBox>
    </div>
    <div>
      <CountInfoBox :to="path">
        <template v-slot:ico>
          <img src="@/assets/ico/home.png" />
        </template>
        <template v-slot:title>
          播放量
        </template>
        <template v-slot:right>
          <div class="has"><img src="@/assets/ico/to-right.png" /></div>
        </template>
      </CountInfoBox>
    </div>


    </div>
</template>

<style scoped>
.likes-root {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

}
.likes-root>div{
  margin: 20px;
}
</style>