<template>
  <div
    v-show="menuStore.menuShow"
    class="contextmenu"
    :style="{ top: menuStore.menuTop + 'px', left: menuStore.menuLeft + 'px' }"
  >
    <ul @mouseup="handleMouseUp">
      <template v-if="indexStore.curComponent">
        <template v-if="!indexStore.curComponent.isLock">
          <!-- <li @click="copy">复制</li> -->
          <!-- <li @click="paste">粘贴</li> -->
          <!-- <li @click="cut">剪切</li> -->
          <li @click="deleteComponent">删除</li>
          <!-- <li @click="lock">锁定</li> -->
          <li @click="topComponent">置顶</li>
          <li @click="bottomComponent">置底</li>
          <!-- <li @click="upComponent">上移</li> -->
          <!-- <li @click="downComponent">下移</li> -->
        </template>
        <!-- <li v-else @click="unlock">解锁</li> -->
      </template>
      <!-- <li v-else @click="paste">粘贴</li> -->
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useContextMenuStore } from "@/store/contextmenu";
import { useIndexStore } from "@/store";
import { useSnapshotStore } from "@/store/snapshot";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
const menuStore = useContextMenuStore();
const indexStore = useIndexStore();
const snapshotStore = useSnapshotStore()
const handleMouseUp = () => {
indexStore.setClickComponentStatus(true)
};
const topComponent = () => {
    menuStore.topComponent()
    snapshotStore.recordSnapshot()
};
const bottomComponent = () => {
    menuStore.bottomComponent()
    snapshotStore.recordSnapshot()
};
const deleteComponent = () => {
  indexStore.componentData.splice(indexStore.curComponentIndex,1)
  indexStore.setCurComponent({component:null,index:null})
};
</script>

<style lang="less" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
