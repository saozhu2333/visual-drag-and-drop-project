<template>
  <div>
    <el-row :gutter="20" justify="center">
      <el-col :span="18"
        ><el-button width="100%" @click="DrawerShow = true"
          >添加动画</el-button
        ></el-col
      >
    </el-row>
    <el-row
      :gutter="20"
      justify="center"
      v-show="indexStore.curComponent.animations.length > 0"
    >
      <el-col :span="24">
        <div
          v-for="(item, index) in indexStore.curComponent.animations"
          :key="index"
          class="animation-list"
        >
          <span>{{ item.label }}</span>

          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
            "
          >
            <el-button
              :icon="Edit"
              circle
              @click="showAnimationConfig(index)"
            />
            <el-button :icon="Close" circle @click="clearAnimationConfig(index)"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 动画列表添加 -->
    <el-drawer
      v-model="DrawerShow"
      title="动画列表"
      :with-header="true"
      :direction="direction"
    >
      <el-tabs v-model="animationActiveName">
        <el-tab-pane
          v-for="item in animationClassData"
          :key="item.label"
          :label="item.label"
          :name="item.label"
        >
          <el-scrollbar
            view-style="display: flex;  align-items: center; flex-wrap: wrap; padding-left: 10px;"
          >
            <div
              v-for="animate in item.children"
              :ref="(el) => getDivDom(el, animate.value)"
              :key="animate.value"
              class="animate"
              @mouseenter="runAnimationFun(animate)"
              @click="addAnimation(animate)"
            >
              <div>
                {{ animate.label }}
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>

    <!-- 动画控制 -->
    <el-dialog v-model="animationCtrlVisible" title="动画设置" width="800">
        <div class="time dialog-config">
        
        选中参数：<el-input v-model="configContent.variable" style="width: 240px" placeholder="Please input" />
      </div>
    <div class="time dialog-config">
        
        最小值：<el-input-number
          v-model="configContent.min"
          controls-position="right"
          :min="0.1"
          :precision="1"
          :step="0.1"
        />
      </div>
      <div class="time dialog-config">
        最大值：<el-input-number
          v-model="configContent.max"
          controls-position="right"
          :min="0.1"
          :precision="1"
          :step="0.1"
        />
      </div>
      <div class="time dialog-config">
        动画时长：<el-input-number
          v-model="configContent.animationTime"
          controls-position="right"
          :min="0.1"
          :precision="2"
          :step="0.01"
        />
      </div>
      <div class="loop dialog-config">
        是否循环：<el-switch
          v-model="configContent.isloop"
          active-text="是"
          inactive-text="否"
        >
        </el-switch>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="changeAnimationConfig"> 确定 </el-button>
          <el-button @click="animationCtrlVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import animationClassData from "@/utils/animationClassData";
import runAnimation from "@/utils/runAnimation";
import type { DrawerProps } from "element-plus";
import { useIndexStore } from "@/store";
import { Edit, Close } from "@element-plus/icons-vue";
const direction = ref<DrawerProps["direction"]>("ltr");
const indexStore = useIndexStore();
let DrawerShow = ref(false);
let animationActiveName = ref("进入");
let animationCtrlVisible = ref(false);
//正在编辑的动画下标
let configIndex = ref<number>(0)
let configContent = ref({
    animationTime:1,
    isloop:false,
    max:0,
    min:0,
    variable:''
})
// dom列表
const divDomList = ref(new Map());
//获取dom
const getDivDom = (el: any, item: any) => {
  if (el) {
    divDomList.value.set(item, el);
  }
};
const runAnimationFun = async (animate: any) => {
  if (animate.pending) return;

  animate.pending = true;
  await runAnimation(divDomList.value.get(animate.value), [animate] as any);
  // 防止无限触发同一元素的动画
  setTimeout(() => {
    animate.pending = false;
  }, 100);
};
const addAnimation = (animate: any) => {
  indexStore.addAnimation(animate);
  DrawerShow.value = false;
};
const showAnimationConfig = (index:number)=>{
    configIndex.value = index
    configContent.value.animationTime = indexStore.curComponent.animations[index].animationTime?indexStore.curComponent.animations[index].animationTime:1
    configContent.value.isloop = indexStore.curComponent.animations[index].isloop?true:false
    
    animationCtrlVisible.value =true
}
const changeAnimationConfig = ()=>{
indexStore.editAnimation(configIndex.value,configContent.value)
animationCtrlVisible.value = false
}
const clearAnimationConfig =(index:number)=>{
indexStore.removeAnimation(index)
}
</script>

<style lang="less" scoped>
.el-button {
  width: 100%;
}

.animate {
  cursor: pointer;
}

.animate > div {
  width: 100px;
  height: 60px;
  background: #f5f8fb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #333;
  border-radius: 3px;
  user-select: none;
  cursor: pointer;
}
.animation-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--el-border-color);
  border-radius: 20px;
  padding: 5px 20px;
  margin-top: 10px;
  min-width: 200px;
}
.dialog-footer{
    display: flex;
}
.dialog-config{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
}
</style>
