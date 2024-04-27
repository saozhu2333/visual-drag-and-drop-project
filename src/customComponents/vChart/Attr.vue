<template>
  <div>
    <commonAttr />

    <el-form>
      <el-form-item label="标题">
        <el-switch v-model="option.title.show" active-text="显示标题">
        </el-switch>
        <el-input v-model="option.title.text" placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <el-form-item label="工具提示">
        <el-switch v-model="option.tooltip.show" active-text="显示提示">
        </el-switch>
      </el-form-item>
      <el-form-item label="图例">
        <el-switch v-model="option.legend.show" active-text="显示图例">
        </el-switch>
      </el-form-item>
      <el-form-item label="横坐标">
        <el-switch v-model="option.xAxis.show" active-text="显示横坐标">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            更换图表类型<el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <span v-for="(chart, index) in charts" :key="index">
                <el-dropdown-item :command="chart.title">{{ chart.name }}</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="静态数据源">
        <el-button>修改数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import commonAttr from "@/components/common/commonAttr.vue";
import { useIndexStore } from "@/store";
const indexStore = useIndexStore();
let option = computed(() => {
  return indexStore.curComponent.propValue;
});
const charts = ref([
  {
    title: "bar",
    name: "柱状图",
  },
  {
    title: "scatter",
    name: "散点图",
  },
  {
    title: "line",
    name: "折线图",
  },
]);
const handleCommand = (val:string)=>{
    option.value.series.type=val
}
</script>

<style lang="less" scoped></style>
