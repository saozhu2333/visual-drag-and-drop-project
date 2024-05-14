import { makeObservable } from "mobx";
import { Component } from "@/types/drag";
import { useState } from "react";

class componentStore {
 curComponent = useState<Component | null | undefined>(null); //已选中的组件
  curComponentIndex = useState<number | null>(null); //已选中的组件序号
  // 点击画布时是否点中组件，主要用于取消选中组件用。
  // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
  isClickComponent = useState(false);
  //画布组件数据
  componentData = useState<Component[]>([]);
  //   画布数据
  canvasStyleData = useState<any>({
    // 页面全局数据
    width: 1200,
    height: 740,
    scale: 100,
    color: "#000",
    opacity: 1,
    background: "#fff",
    fontSize: 14,
  });
  constructor() {
    makeObservable(this);
  }
    /**
   * @函数功能: 将组件数据获取添加到画布
   * @param {any} component
   * @param {any} index
   * @出口参数:
   * @函数备注:
   */
     addComponent(component: any, index: any = undefined) {
        if (index !== undefined) {
          this.componentData.splice(index, 0, component as any);
        } else {
          this.componentData.push(component as any);
        }
      }
}

export default componentStore;
