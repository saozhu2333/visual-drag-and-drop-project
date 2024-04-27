<template>
  <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; position: absolute;">
    <div ref="xgplayerDom"></div>
  </div>
 
</template>

<script setup lang="ts">
import { ref, onMounted,watch } from "vue";
import Player from 'xgplayer';
import FlvPlugin from 'xgplayer-flv'
import 'xgplayer/dist/index.min.css'
const props = defineProps({
  propValue: {
    type: String,
    require: true,
    default: "",
  },
  element: {
    type: Object,
    default: () => {},
  },
});
const xgplayer = ref<any>(null);
const xgplayerDom = ref<HTMLElement | undefined>(undefined)

onMounted(() => {
  xgplayer.value = new Player({
    el:xgplayerDom.value,
    url: "https://rtmp01open.ys7.com:9188/v3/openlive/BB0427427_1_1.flv?expire=1745285788&id=704264698521391104&t=0974c433a6119a885f10ca9c7a83ac21576d5c82874a1c878e0bcaf6f4cb0a34&ev=100",
    playsinline: true,
    isLive: true,
    plugins: [FlvPlugin],
    width: '99%',
   height: '99%'
  });
  // setTimeout(() => {
  //   xgplayer.value.src='https://www.bilibili.com/video/BV1sm421x76c/?spm_id_from=333.1007.tianma.2-2-5.click'
  //   console.log()
  // }, 5000);
});
</script>

<style lang="less" scoped></style>
