<template>
  <div class="component-list" @dragstart="handleDragStart">
    <el-tabs type="border-card" style="height: 100%; overflow: auto;">
      <el-tab-pane label="基础">
        <div
          v-for="(item, index) in componentList"
          :key="index"
          class="item"
          :data-index="index"
          draggable="true"
          @dragover.prevent
        >
          <span
            v-if="item.icon.substr(0, 2) === 'el'"
            :class="item.icon"
            :data-type="0"
            :data-index="index"
          ></span>
          <span
            v-else
            :class="`iconfont icon-${item.icon}`"
            :data-index="index"
          ></span></div
      ></el-tab-pane>
      <el-tab-pane label="组件">
        <div
          v-for="(item, index) in imgList"
          :key="index"
          class="imgItem"
          :data-type="1"
          :data-index="index"
          draggable="true"
          @dragover.prevent
        >
    <img style=" object-fit:contain !important; height: 60%;" :src="item.propValue.url" alt="" width="100%" height="100%" draggable="false"/>
    <span>{{ item.label }}</span>
    </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import componentList from "@/customComponents/component-list";
import { imgList } from "@/customComponents/component-list";
/**
 * @函数功能: 
 * @param {*} e
 * @出口参数: 
 * @函数备注: type为组件类型   0基础 1组件  index为对应下标
 */
const handleDragStart = (e: any) => {
  e.dataTransfer.setData("index", e.target.dataset.index);
  e.dataTransfer.setData("type", e.target.dataset.type);
};
</script>

<style lang="less" scoped>
.el-tab-pane{
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;

    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-auto-rows: 180px;
    justify-items: center;
    align-items: center;
    align-content: start;
    // grid-row-gap: 10px;
    grid-column-gap: 10px;
    
}
.component-list {
  width: 100%;
  height: 100%;
}
.item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
//   border-radius: 20px;
  box-shadow: var(--el-box-shadow);
  transition: all .5s;
  span{
    font-size: 50px;
  }
  &:active {
    cursor: grabbing;
    
  }
  &:hover{
    box-shadow: var(--el-box-shadow-dark);
  }
  span{
    padding: 10px;
  }
}
.imgItem{
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    box-shadow: var(--el-box-shadow);
    transition: all .5s;
    &:active {
    cursor: grabbing;
  }
  &:hover{
    box-shadow: var(--el-box-shadow-dark);
  }
}
</style>
