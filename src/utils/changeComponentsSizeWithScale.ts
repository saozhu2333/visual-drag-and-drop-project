import { deepCopy } from "./utils";
import { useIndexStore } from "@/store";
//divide除法  multiply乘法
import { divide,multiply } from "mathjs";
const indexStore = useIndexStore()

const needToChangeAttrs = ['top','left','width','height','fontSize']
/**
 * @函数功能: 对所有已存在组件进行缩放显示
 * @param {string} scale
 * @出口参数: 
 * @函数备注: 
 */
export default function changeComponentSizeWithScale(scale:string){
const componentData = deepCopy(indexStore.componentData)
componentData.forEach((component:any) => {
    Object.keys(component.style).forEach(key=>{
        if(needToChangeAttrs.includes(key)){
            if(key == 'fontSize' && component.style[key] == '') return
        }
        component.style[key] = format(getOriginStyle(component.style[key],indexStore.canvasStyleData.scale.toString()),scale)
    })
});
indexStore.setcomponentData(componentData)
indexStore.setCurComponent({component:componentData[indexStore.curComponentIndex],index:indexStore.curComponentIndex})
indexStore.setCanvasStyle({...indexStore.canvasStyleData,scale})
}
const needToChangeAttrs2 = ['width','height','fontSize']
/**
 * @函数功能: 对单个组件进行缩放
 * @param {any} component
 * @出口参数: 
 * @函数备注: 
 */
export function changeComponentSizeWithScale2(component:any){
    Object.keys(component.style).forEach(key=>{
        if(needToChangeAttrs2.includes(key)){
            if(key == 'fontSize' && component.style[key] == '') return
        }
        component.style[key] = format(component.style[key],indexStore.canvasStyleData.scale.toString())
    })
}

function format(value:number,scale:string){
    return multiply(value,divide(parseFloat(scale),100))
}

function getOriginStyle(value:number, scale:string) {
    return divide(value,divide(parseFloat(scale),100))
}
