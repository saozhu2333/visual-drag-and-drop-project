<template>
  <div class="echarts-class">
    <div ref="echartRef" class="echarts-class"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref,watch } from "vue";

import * as echarts from "echarts";
let echartRef: any = ref(null);
let echartBox:any
//监听器
let observer: ResizeObserver | null = null;
const props = defineProps({
  propValue: {
    type: Object,
    require: true,
    default: () => {},
  },
  element: {
    type: Object,
    default: () => {},
  },
});

watch(()=>props.propValue,(newval,oldval)=>{
  echartBox.setOption(newval);
},{deep:true})
const resize = () => {
  echartBox.resize()
};
onMounted(() => {
  echartBox = echarts.init(echartRef.value);
  echartBox.setOption(props.propValue);
  observer = new ResizeObserver(resize);
  observer.observe(echartRef.value);
  
});
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  
  // echartBox.value.clear();
});
</script>

<style lang="less" scoped>
.echarts-class {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
