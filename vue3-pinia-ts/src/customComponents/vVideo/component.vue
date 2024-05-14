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
    url: "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
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
