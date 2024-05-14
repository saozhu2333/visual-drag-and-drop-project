<template>
  <div>
    <el-switch v-model="value1" />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
const value1 = ref(true)
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
</script>

<style lang="less" scoped>
</style>
