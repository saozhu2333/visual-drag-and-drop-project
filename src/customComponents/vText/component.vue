<template>
  <div
    class="vtext-class"
    :contenteditable="isEdit"
    @dblclick="setEdit"
    @input="handleInput($event)"
  >{{ props.propValue }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIndexStore } from "@/store/index";
const props = defineProps({
  propValue: {
    type: String,
    require: true,
    default: '',
  },
  element: {
    type: Object,
    default: () => {},
  },
});
const propValue = ref("");
const indexStore = useIndexStore();
let editMode = indexStore.editMode;

let isEdit = ref(false)
const handleInput = (e: any) => {
    indexStore.curComponent.propValue = e.target.innerHTML
};
const setEdit = () => {
    isEdit.value =true
};
</script>

<style lang="less" scoped>
.vtext-class {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
