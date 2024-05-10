import { defineStore } from "pinia";
import { useIndexStore } from ".";
import { Ref, ref } from "vue";

const indexStore  = useIndexStore()

export const useContextMenuStore = defineStore("ContextMenu", () => {
    const menuTop = ref(0)
    const menuLeft = ref(0)
    const menuShow = ref(false)
    //显示菜单
    const showContextMenu  = ({top,left}:any) => {
        menuShow.value = true
        menuTop.value = top
        menuLeft.value = left
    }
    //隐藏菜单
    const hideContextMenu = () => {
        menuShow.value = false
    }
    // 置顶功能
    const topComponent = ()=>{
        if(indexStore.curComponentIndex!==null && indexStore.curComponentIndex < indexStore.componentData.length - 1){
            indexStore.componentData.splice(indexStore.curComponentIndex,1)
            indexStore.curComponent && indexStore.componentData.push(indexStore.curComponent)
            indexStore.curComponentIndex = indexStore.componentData.length - 1
        }else{
            console.log('到顶了')
        }
    }
     // 置底功能
    const bottomComponent = ()=>{
        if (indexStore.curComponentIndex!==null && indexStore.curComponentIndex > 0) {
            indexStore.componentData.splice(indexStore.curComponentIndex, 1)
            indexStore.curComponent && indexStore.componentData.unshift(indexStore.curComponent)
            indexStore.curComponentIndex = 0
        } else {
            console.log('到底了')
        }
    }
    // 上移功能
    const upComponent = ()=>{
        if(indexStore.curComponentIndex!==null && indexStore.curComponentIndex < indexStore.componentData.length - 1){
            indexStore.componentData.splice(indexStore.curComponentIndex,1)
            indexStore.curComponent && indexStore.componentData.splice(indexStore.curComponentIndex+1,0,indexStore.curComponent)
            indexStore.curComponentIndex = indexStore.curComponentIndex+1
            console.log(indexStore.curComponentIndex)
        }else{
            console.log('到顶了')
        }
    }
    // 下移功能
    const downComponent = ()=>{
        if (indexStore.curComponentIndex!==null && indexStore.curComponentIndex > 0) {
            indexStore.componentData.splice(indexStore.curComponentIndex, 1)
            indexStore.curComponent && indexStore.componentData.splice(indexStore.curComponentIndex-1,0,indexStore.curComponent)
            indexStore.curComponentIndex = indexStore.curComponentIndex-1
            console.log(indexStore.curComponentIndex)
        } else {
            console.log('到底了')
        }
    }
  return { menuTop,menuLeft,menuShow,showContextMenu,hideContextMenu,topComponent,bottomComponent,upComponent,downComponent  };
});
