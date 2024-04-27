<template>
  <div class="v-common-attr">
    <el-collapse v-model="activeCollapse" accordion @change="onChange">
      <el-collapse-item title="通用样式" name="style">
        <el-form>
          <el-form-item
            v-for="({ key, label }, index) in styleKey"
            :key="index"
            :label="label"
          >
            <el-color-picker
              v-if="isIncludesColor(key)"
              v-model="indexStore.curComponent.style[key]"
              show-alpha
            ></el-color-picker>
            <el-select
              v-else-if="selectKey.includes(key)"
              v-model="indexStore.curComponent.style[key]"
            >
              <el-option
                v-for="item in optionMap[key]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-else v-model.number="indexStore.curComponent.style[key]" @input="inputChange(key,indexStore.curComponent.style[key])" type="number" />
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useIndexStore } from "@/store";
import { styleData, selectKey, optionMap } from "@/utils/attr";
const indexStore = useIndexStore();
const activeCollapse = ref('style');
const onChange = () => {};
/**
 * @函数功能: 根据组件style属性获取通用属性列表
 * @param {*} computed
 * @出口参数:
 * @函数备注:
 */
const styleKey = computed(() => {
  const curComponentStyleKey = Object.keys(indexStore.curComponent.style);
  return styleData.filter((item) => {
    //线段不可以设置高度
    if(indexStore.curComponent.component=='lineBox' && item.key=='height'){
      return false
    }
    return curComponentStyleKey.includes(item.key)
  });
});
/**
 * @函数功能: 确认是否是颜色属性
 * @出口参数:
 * @函数备注:
 */
const isIncludesColor = (str: string) => {
  return str.toLowerCase().includes("color");
};
/**
 * @函数功能: 输入较大或较小角度时重置显示参数
 * @param {*} key
 * @param {*} value
 * @出口参数: 
 * @函数备注: 
 */
const inputChange = (key:string,value:number)=>{
  if(key=='rotate'){
    indexStore.curComponent.style[key] = indexStore.reSetRotate(value)
  }
}
</script>

<style lang="less" scoped>
.v-common-attr {
  .el-input-group__prepend {
    padding: 0 10px;
  }
}
</style>
