<template>
  <div class="toolbar">
    <el-button @click="undo" :disabled="snapshotStore.snapshotIndex < 0"
      >撤销</el-button
    >
    <el-button
      @click="redo"
      :disabled="
        snapshotStore.snapshotIndex + 1 >= snapshotStore.snapshotData.length
      "
      >重做</el-button
    >
    <el-button @click="saveJson">保存</el-button>
    <el-button @click="lookJson">预览</el-button>
    <el-button @click="clearCanvas">清空画布</el-button>
    <div class="canvas-config">
      <span>画布大小</span>
      <input v-model="indexStore.canvasStyleData.width" />
      <span>*</span>
      <input v-model="indexStore.canvasStyleData.height" />
    </div>
    <div class="canvas-config">
      <span>画布比例</span>
      <input v-model="scale" @input="handleScaleChange" />
      <span>%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIndexStore } from "@/store";
import { useSnapshotStore } from "@/store/snapshot";
import changeComponentSizeWithScale from "@/utils/changeComponentsSizeWithScale";
import { useRouter } from "vue-router";
const indexStore = useIndexStore();
const snapshotStore = useSnapshotStore();
const router = useRouter()
let scale = ref(100);
/**
 * @函数功能: 清空画布
 * @出口参数: 
 * @函数备注: 
 */
const clearCanvas = () => {
  indexStore.setCurComponent({ component: null, index: null });
  indexStore.componentData = [];
};
const undo = () => {
  snapshotStore.undo();
};
const redo = () => {
  snapshotStore.redo();
};
let timer = ref<number | NodeJS.Timeout>(0)
/**
 * @函数功能:缩放 
 * @出口参数: 
 * @函数备注: 
 */
const handleScaleChange = ()=>{
clearTimeout(timer.value)
timer.value = setTimeout(() => {
  scale.value = ~~scale.value || 1
  changeComponentSizeWithScale(scale.value.toString())
}, 1000);
}
const saveJson = ()=>{
localStorage.setItem('jsonData',JSON.stringify({screen:indexStore.canvasStyleData,data:indexStore.componentData}))
}
const lookJson = ()=>{
  router.push({path:`/show/${0}`})
}
</script>

<style lang="less" scoped>
.toolbar {
  display: flex;
  // justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: var(--main-bg-color);
  border-color: var(--ace-bg-color);
  border-bottom: 1px solid var(--border-color);
}
.canvas-config {
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  color: var(--text-color);

  input {
    width: 50px;
    margin-left: 4px;
    outline: none;
    padding: 0 5px;
    border: 1px solid var(--border-color);
    color: #606266;
  }

  span {
    margin-left: 10px;
  }
}
</style>
