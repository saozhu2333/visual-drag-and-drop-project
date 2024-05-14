<template>
  <div>
    <commonAttr />

    <el-collapse v-model="activeCollapse" accordion @change="onChange">
      <el-collapse-item title="线段样式" name="style">
        <el-form>
          <el-form-item label="线宽">
            <el-input v-model="style.strokeWidth" placeholder="请输入内容">
            </el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="style.strokeDasharray">
              <el-option
                v-for="item in strokeDasharrayList"
                :key="item.value"
                :label="item.type"
                :value="item.value"
              >
                <div
                  style="
                    display: flex;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <span>{{ item.type }}:</span>
                  <svg
                    id="svg"
                    ref="svgRef"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100%"
                  >
                    <polyline
                      points="10,15 100,15"
                      stroke="black"
                      :stroke-width="5"
                      fill="none"
                      :stroke-dasharray="item.value"
                    />
                  </svg>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import commonAttr from "@/components/common/commonAttr.vue";
import { useIndexStore } from "@/store";
const indexStore = useIndexStore();
const activeCollapse = ref("style");
const strokeDasharrayList = ref([
  { type: "实线", value: "0" },
  { type: "虚线1", value: "10" },
  { type: "虚线2", value: "10 5" },
]);
const onChange = () => {};
let style = computed(() => {
  return indexStore.curComponent.style;
});
</script>

<style lang="less" scoped></style>
