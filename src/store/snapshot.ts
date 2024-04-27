import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { deepCopy } from '@/utils/utils';
import { useIndexStore } from '.';

const indexStore = useIndexStore()
export const useSnapshotStore = defineStore('snapshot', () => {
    
    const snapshotData:any = ref([])
    let snapshotIndex = ref(-1)
    /**
     * @函数功能: 撤销
     * @出口参数: 
     * @函数备注: 
     */    
    const undo = ()=>{
        if(snapshotIndex.value>=0){
            snapshotIndex.value--
            const componentData = deepCopy(snapshotData.value[snapshotIndex.value]) 
            console.log(componentData)
            // 撤销时如果存在选中的组件则清除选中
            if(indexStore.curComponent){
                let needClean = true
                //如果最后一步撤销默认将选中内容清空
                if(componentData){
                    needClean = !componentData.find((component:any) => indexStore.curComponent.id==component.id)
                }
                if(needClean){
                    indexStore.setCurComponent({component:null,index:null})
                }
            }
            indexStore.setcomponentData(componentData)
        }
       
    }
    /**
     * @函数功能: 重做
     * @出口参数: 
     * @函数备注: 
     */    
    const redo = ()=>{
        //根据快照恢复
        if(snapshotIndex.value < snapshotData.value.length - 1){
            snapshotIndex.value++
            indexStore.setcomponentData(deepCopy(snapshotData.value[snapshotIndex.value]))
        }
    }
    /**
     * @函数功能: 保存快照
     * @出口参数: 
     * @函数备注: 
     */
    const recordSnapshot = ()=>{
        
        snapshotData.value[++snapshotIndex.value] = deepCopy(indexStore.componentData)
        //撤销操作后重新快照需要将之前的覆盖替换掉
        if(snapshotIndex.value<snapshotData.value.length-1){
            console.log(snapshotData.value)
            snapshotData.value = snapshotData.value.slice(0,snapshotIndex.value+1)
        }
        
    }
  return { recordSnapshot,undo,redo,snapshotIndex,snapshotData };
});