<template>
  <div class="index">
    <div class="top">
      <Toolbar />
    </div>
    <div class="content-box">
      <div class="left">
        <componentList></componentList>
      </div>
      <div class="center" :style="'margin-right:10px'">
        <div
          class="content"
          @drop="handleDrop"
          @dragover.prevent
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <editor ref="editorref" />
        </div>
      </div>
      <div class="right">
        <el-tabs
          v-if="indexStore.curComponent"
          v-model="activeAttrTab"
          class="demo-tabs"
        >
          <el-tab-pane label="属性" name="Attr">
            <component
              :is="indexStore.curComponent.component + 'Attr'"
            ></component>
          </el-tab-pane>
          <el-tab-pane label="事件" name="Event" v-if="indexStore.curComponent.events">
            <eventList :eventValue="indexStore.curComponent.events" :eventType="indexStore.curComponent.eventType" />
          </el-tab-pane>
          <el-tab-pane label="动画" name="animation" v-if="indexStore.curComponent.animations">
            <animationList :eventValue="indexStore.curComponent.animations" />
          </el-tab-pane>
        </el-tabs>
        <canvasAttr v-else></canvasAttr>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,watch } from "vue";
import componentList from "@/components/componentList.vue";
import customList,{imgList} from "@/customComponents/component-list";
import editor from "@/components/editor.vue";
import Toolbar from "@/components/Toolbar.vue";
import { useContextMenuStore } from "@/store/contextmenu";
import { useIndexStore } from "@/store";
import { useSnapshotStore } from "@/store/snapshot";
import { deepCopy } from "@/utils/utils.ts";
import canvasAttr from "@/components/canvasAttr.vue";
import generateID from "@/utils/generateID";
import eventList from "@/components/common/eventList.vue";
import animationList from "@/components/common/animationList.vue";
import type { TabsPaneContext } from "element-plus";

const indexStore = useIndexStore();
const contextMenu = useContextMenuStore();
const snapshotStore = useSnapshotStore();
let editorref = ref<HTMLElement | null>();
const activeAttrTab = ref("Attr");
// 元素更换后将tab页切换回属性位置
watch(()=> indexStore.curComponentIndex,(n,o)=>{
if(n!==o) activeAttrTab.value = 'Attr'
})

onMounted(() => {
  editorref.value = document.getElementById("editor");
});

/**
 * @函数功能: 接受参数绘制图形
 * @param {*} e
 * @出口参数:
 * @函数备注:
 */
const handleDrop = (e: any) => {
  const rectInfo = document.getElementById("editor")!.getBoundingClientRect();

  const index = e.dataTransfer.getData("index");
  // 根据类型判断使用哪个数组
  const type = e.dataTransfer.getData("type");
  if (index) {
    
    const component = deepCopy(type == 1?imgList[index]:customList[index]);
    console.log(type,component)
    component.style.top = e.clientY - rectInfo.y;
    component.style.left = e.clientX - rectInfo.x;
    component.id = generateID();
    indexStore.addComponent(component);
    snapshotStore.recordSnapshot()
  }
};
const handleMouseDown = (e: any) => {
  e.stopPropagation();
  indexStore.setClickComponentStatus(false);
};
/**
 * @函数功能:在画布上按钮弹起取消选中和菜单
 * @param {*} e
 * @出口参数:
 * @函数备注:
 */
const deselectCurComponent = (e: any) => {
  if (!indexStore.isClickComponent) {
    indexStore.setCurComponent({ component: null, index: null });
  }
  if (e.button != 2) {
    contextMenu.hideContextMenu();
  }
};
</script>

<style lang="less" scoped>
.index {
  background: var(--main-bg-color);
  height: 100vh;
  width: 100%;
}
.top {
  height: 80px;
  width: 100%;
}
.left {
  height: 100%;
  min-width: 200px;
  width: 15%;
}
.center {
  height: 100%;
  min-width: 300px;
  flex: 1;
  background: var(--secondary-bg-color);
}
.right {
  height: 100%;
  min-width: 200px;
  width: 15%;
}
.content-box {
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
}
.content {
  display: grid;
  place-items: center;
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>
