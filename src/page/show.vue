<template>
<div id="showpage" style="display: flex; justify-content: center; align-items: center;background-color: #ddd;">
    <div :style="`width: ${screenData.width}px; height: ${screenData.height}px; position: relative;background-color: ${screenData.background}; color:${screenData.color};`">

      <template  v-for="(item, index) in indexStore.componentData" :key="item.id">
        <div  @click="eventFun(item,'click')" @dblclick="eventFun(item,'dbClick')" @mousedown="eventFun(item,'mouseDown')" @mouseup="eventFun(item,'mouseUp')" :ref="(el:any) => getDivDom(el, item)">
          <component
          :is="item.component"
          
          class="component"
          :style="getShapeStyle(item.style)"
          :prop-value="item.propValue"
          :element="item"
          :index="index"
        />
        </div>
       
      </template>
       

    </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted,nextTick,onUnmounted } from "vue";
import shape from "@/components/shape.vue";
import {
  getShapeStyle,
  getSVGStyle,
  getStyle,
  getCanvasStyle,
} from "@/utils/style";
import { useIndexStore } from "@/store";
import autofit from "autofit.js";
const showData = ref([]);
const screenData:any = ref({});
const indexStore = useIndexStore();
const svgFilterAttrs = ["width", "height", "top", "left", "rotate"];
import runAnimation,{runAnimationFun} from "@/utils/runAnimation";
function getComponentStyle(style: any) {
  return getStyle(style, svgFilterAttrs);
}
const mockdata = ref({data1:2})
const animateCtrlList = ref({})
const immediate = ref({})
let time:any = ref(null)
// dom列表
const divDomList = ref(new Map());
//获取dom
const getDivDom = (el: any, item: any) => {

  if (el) {
    divDomList.value.set(item.id, el);
  }
};
onMounted(() => {
  let jsonData = JSON.parse(localStorage.getItem("jsonData") as string);
  showData.value = jsonData.data;
  screenData.value = jsonData.screen
  autofit.init({
    dh: jsonData.screen.height,
    dw: jsonData.screen.width,
    el: "#showpage",
    resize: true,
  });
  
  animationseparate()
  for(let key in immediate.value){
      setTimeout(() => {
        runAnimation(divDomList.value.get(key),immediate.value[key] as any)
      },0);
  }

  time.value = setInterval(()=>{
    console.log(animateCtrlList.value)
    for(let key in animateCtrlList.value){
      animateCtrlList.value[key].forEach((res:any)=>{
        if(mockdata.value[res.variable] !==null && mockdata.value[res.variable] !==undefined){
          runAnimationFun(mockdata.value[res.variable],{max:res.max,min:res.min})?runAnimation(divDomList.value.get(key),[res] as any):''
        }
      })
    }
  },5000)
});
onUnmounted(() => {
  clearInterval(time.value)
})
const eventFun=(item:any,type:string)=>{
const events = item.events[type]
if(events.is){
  events.value.event(events.value.param)
}
}
/**
 * @函数功能: 含有参数的动画和无参数动画分组
 * @出口参数: 
 * @函数备注: 
 */
const animationseparate = ()=>{
  indexStore.componentData.forEach((item:any)=>{
    if(Array.isArray(item.animations) && item.animations.length>0){
      item.animations.forEach((res:any) => {
        console.log(res)
        if(!res.variable){
          if(!immediate.value[item.id]){
            immediate.value[item.id] =[res]
          }else{
            immediate.value[item.id].push(res)
          }
        }else{

          if(!animateCtrlList.value[item.id]){
            animateCtrlList.value[item.id] =[res]
          }else{
            animateCtrlList.value[item.id].push(res)
          }
        }
      });
    }
  })
}
</script>

<style lang="less" scoped>
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
