import { defineStore } from "pinia";
import { Ref, reactive, ref } from "vue";
import { deepCopy } from "@/utils/utils";
import generateID from "@/utils/generateID";
import { Component } from "@/types/drag";

export const useIndexStore = defineStore("index", () => {
  const editMode = ref("");
  let curComponent:Ref<Component | null |undefined> = ref(null); //已选中的组件
  let curComponentIndex:Ref<number | null> = ref(null); //已选中的组件序号
  // 点击画布时是否点中组件，主要用于取消选中组件用。
  // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
  let isClickComponent = ref(false);
  //画布组件数据
  const componentData: Ref<Component[]> = ref([]);
  //重写的时候一定要用ref ，reactive太恶心了
  const canvasStyleData = reactive<any>({
    // 页面全局数据
    width: 1200,
    height: 740,
    scale: 100,
    color: "#000",
    opacity: 1,
    background: "#fff",
    fontSize: 14,
  });

  function setCanvasStyle(style:object){
    Object.keys(canvasStyleData).forEach(key=>{
      canvasStyleData[key] = style[key]
    })
  }
  function setcomponentData(val:any = []){
    componentData.value = val
  }
  /**
   * @函数功能: 将组件数据获取添加到画布
   * @param {any} component
   * @param {any} index
   * @出口参数:
   * @函数备注:
   */
  function addComponent(component: any, index: any = undefined) {
    console.log(componentData)
    if (index !== undefined) {
      componentData.value.splice(index, 0, component as any);
    } else {
      componentData.value.push(component as any);
    }
  }

  // function copyData(state: any) {
  //   state.copyData = {
  //     data: deepCopy(state.curComponent),
  //     index: state.curComponentIndex,
  //   };
  // }

  // function deepCopyHelper(data: any) {
  //   const result = deepCopy(data);
  //   result.id = generateID();
  //   if (result.component === "Group") {
  //     result.propValue.forEach((component: any, i: any) => {
  //       result.propValue[i] = deepCopyHelper(component);
  //     });
  //   }

  //   return result;
  // }
  /**
   * @函数功能: 修改对象css样式
   * @param {any} 要修改的对象
   * @param {any} 具体属性值
   * @出口参数:
   * @函数备注:
   */
  function setShapeStyle({ top, left, width, height, rotate }: any) {
    if (curComponent) {
      if (top !== undefined && curComponent.value) curComponent.value.style.top = Math.round(top);
      if (left !== undefined && curComponent.value) curComponent.value.style.left = Math.round(left);
      if (width && curComponent.value) curComponent.value.style.width = Math.round(width);
      if (height && curComponent.value) curComponent.value.style.height = Math.round(height);
      if (rotate && curComponent.value) {
        curComponent.value.style.rotate = reSetRotate(Math.round(rotate));
      }
    }
  }
  /**
   * @函数功能: 处理角度大于360或者小于0的情况
   * @param {number} 度数
   * @出口参数: 
   * @函数备注: 
   */  
  function reSetRotate(num: number) {
    if (num < 0 || num > 360) {
      if (num < 0) {
        num = reSetRotate(num+360)
      }
      if (num > 360) {
        num = reSetRotate(num-360)
      }
    }
    return num;
  }
  /**
   * @函数功能: 存储当前选中的组件
   * @param {any} param1
   * @出口参数:
   * @函数备注:
   */
  function setCurComponent({ component, index }: any) {

    curComponent.value = component;
    curComponentIndex.value = index;
  }
  /**
   * @函数功能: 控制是否取消选中状态
   * @param {boolean} status
   * @出口参数:
   * @函数备注:
   */
  function setClickComponentStatus(status: boolean) {
    isClickComponent.value = status;
  }
  let calcline={x:0,y:0}
  /**
   * @函数功能: 根据点位修改线段以及svg位置
   * @param {any} val
   * @出口参数: 
   * @函数备注: 
   */  
  function setLinepropValue(val:any){
    if(val[0].x < 0 && curComponent.value){
      calcline.x = -calcline.x + val.x
      console.log(calcline.x)
      setShapeStyle({left:curComponent.value.style.left as number + calcline.x})
      val[0].x=0
      val[1].x += Math.abs(val[0].x)
    }
    if(val[0].y < 0  && curComponent.value){
      calcline.y = -calcline.y + val.y
      setShapeStyle({top:curComponent.value.style.top as number + calcline.y})
      console.log(calcline.y)
      val[0].y=0
      val[1].y += Math.abs(val[0].y)
      
    }



    if (curComponent.value) {
       curComponent.value.propValue.points = val;
     
    }
  }
  /**
   * @函数功能: 添加动画
   * @param {any} animate
   * @出口参数: 
   * @函数备注: 
   */
  function addAnimation(animate:any){
    curComponent.value && curComponent.value.animations?.push(animate)
  }
  function removeAnimation(index:number){
    curComponent.value && curComponent.value.animations?.splice(index,1)
  }
  function editAnimation(index:number,data = {}){
    let original
    if(curComponent.value?.animations){
      original = curComponent.value.animations[index]
      curComponent.value.animations[index] = {...original,...data}
    }
  }
    /**
   * @函数功能: 删除
   * @param {number} index
   * @出口参数:
   * @函数备注:
   */
    function removecurComponent(index: number | undefined = undefined) {
      if (index === undefined) {
        index = curComponentIndex.value as number
      }
      if (index == curComponentIndex.value) {
        curComponentIndex.value = null
        curComponent.value = null
      }
      componentData.value.splice(index, 1)
    }
  return {
    editMode,
    addComponent,
    componentData,
    setShapeStyle,
    setCurComponent,
    removecurComponent,
    curComponent,
    curComponentIndex,
    isClickComponent,
    setClickComponentStatus,
    canvasStyleData,
    reSetRotate,
    setcomponentData,
    setCanvasStyle,
    setLinepropValue,
    addAnimation,
    removeAnimation,
    editAnimation
  };
});
