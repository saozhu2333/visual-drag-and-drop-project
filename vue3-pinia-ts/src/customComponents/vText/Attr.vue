<template>
  <div>
    <commonAttr></commonAttr>
    <div style="margin-top: 10px;">
      <textarea name="" id="" cols="30" rows="5" v-model="indexStore.curComponent.propValue"></textarea>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import commonAttr from "@/components/common/commonAttr.vue";
import { useIndexStore } from "@/store";
const indexStore = useIndexStore()
</script>

<style lang="less" scoped>
</style>
