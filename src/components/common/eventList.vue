<template>
  <div>
    <el-form label-width="auto">
      <el-form-item v-for="(value, key, index) in props.eventValue" :key="key">
        <div
          style="
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            height: 100%;
          "
        >
          <el-checkbox
            v-model="value.is"
            :label="EventLabel[key]"
            size="large"
            border
            @change="EventEdit(key, value.is)"
          />
          <el-button
            :icon="EditPen"
            size="small"
            circle
            @click="clickEvent(key, value.is)"
          />
        </div>
      </el-form-item>
    </el-form>

    <el-dialog
      v-model="dialogStype.show"
      title="事件绑定"
      width="500"
    >
      <el-tabs
        v-model="modelTabs"
        class="demo-tabs"
        @tabChange="tabChange"
      >
        <!-- <el-tab-pane :label="'默认事件'" :name="null">
          11
          </el-tab-pane> -->
        <template v-for="item in eventList" :key="item.key">
          <el-tab-pane
            v-if="!item.type || eventType.includes(item.type)"
            :label="item.label"
            :name="item.key"
          >
            <el-input
              v-model="eventValue[dialogStype.type].value.param"
              style="width: 240px"
              autosize
              type="textarea"
              placeholder="Please input"
            />
          </el-tab-pane>
        </template>
      </el-tabs>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="changeEvent"> 确定 </el-button>
          <el-button @click="dialogStype.show = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
// import { eventType } from "@/utils/event";
import { EditPen } from "@element-plus/icons-vue";
import { eventList, EventLabel } from "@/utils/event";

const props = defineProps({
  eventValue: {
    required: true,
    type: Object,
    default: () => {},
  },
  eventType: {
    required: true,
    type: Array,
    default: () => {},
  },
});
//选择事件类型
const eventData: any = ref({});
let modelTabs = ref('default')
//事件类型选择框
const dialogStype: any = ref({
  type: null,
  show: false,
});
/**
 * @函数功能:
 * @param {*} type 事件类型
 * @param {*} value 状态
 * @出口参数:
 * @函数备注:
 */
const EventEdit = (type: string, value: boolean) => {
  if (!props.eventValue[type].value.key) {
     props.eventValue[type].value = eventList[0]
   }
};

/**
 * @函数功能:
 * @param {*} type 事件类型
 * @param {*} value 状态
 * @出口参数:
 * @函数备注:
 */

const clickEvent = (type: string, value: boolean) => {
  // props.eventValue[type].value = eventList.filter(res=> res.key == 'default')[0]

  dialogStype.value.type = type;
  dialogStype.value.show = true;
  if (!props.eventValue[type].value.key) {
     
    props.eventValue[dialogStype.value.type].value = eventList[0]
  }
  console.log(props.eventValue[dialogStype.value.type].value,modelTabs.value)
};
const changeEvent = () => {
  dialogStype.value.show = false;
  console.log(props.eventValue[dialogStype.value.type])
};
const tabChange = (name: string) => {
  console.log(name)
  eventList.forEach(res=>{
    if(res.key==name){
      props.eventValue[dialogStype.value.type].value = res
    }
  })
};
</script>

<style lang="less" scoped></style>
