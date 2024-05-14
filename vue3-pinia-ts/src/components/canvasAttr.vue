<template>
  <div class="attr-container">
    <p class="title">画布属性</p>
    <el-form style="padding: 20px">
      <el-form-item
        v-for="(key, index) in Object.keys(options)"
        :key="index"
        :label="options[key]"
      >
        <el-color-picker
          v-if="isIncludesColor(key)"
          v-model="indexStore.canvasStyleData[key]"
          show-alpha
        ></el-color-picker>
        <el-input v-else v-model.number="indexStore.canvasStyleData[key]" type="number" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIndexStore } from "@/store";
const indexStore = useIndexStore()
const options = ref({
  color: "颜色",
  opacity: "不透明度",
  backgroundColor: "背景色",
  fontSize: "字体大小",
});
const isIncludesColor=(str:string)=>{
    return str.toLowerCase().includes('color')
}
</script>

<style lang="less" scoped>
.attr-container {
  .title {
    text-align: center;
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #e4e7ed;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
  }
}
</style>
