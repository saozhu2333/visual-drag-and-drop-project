<template>
<div style="position: absolute; width: 100%; height: 100%;">


    <svg
      id="svg"
      width="100%"
      :height="svgHeight"
      ref="svgRef"
      style="top: 0; left: 0"
      xmlns="http://www.w3.org/2000/svg"
      
    >
      <polyline
        :points="pointsValue"
        stroke="black"
        :stroke-width="props.element.style.strokeWidth"
        fill="none"
        :stroke-dasharray="props.element.style.strokeDasharray"
      />
    </svg>
  </div>

</template>

<script setup lang="ts">
import {ref,computed ,watch} from "vue"
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
const pointsValue = computed(() => {
  return props.propValue.points
    .map((res: any, index: number) => {
      return `${res.x},${res.y}`;
    })
    .join(" ");
});
watch(()=>props.element.style.strokeWidth,(newval,oldval)=>{
  props.element.style.height = newval
  props.propValue.points.forEach((res:any)=>{
    res.y = newval/2
  })
},{deep:true})
const svgHeight = computed(()=>{
  return props.element.style.height
})
const a = ref(0)
</script>

<style lang="less" scoped>
#svg{
    position: absolute;
}
</style>
