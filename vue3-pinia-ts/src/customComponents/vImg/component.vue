<template>
  <div style="position: absolute;width:100%; height:100%;"  >
    <img :src="props.propValue.url" width="100%" height="100%" alt="" draggable="false" style=" object-fit: fill;">
  </div>
   

</template>

<script setup lang="ts">
import {ref,onMounted, computed} from "vue"

const props = defineProps({
  propValue: {
    type: Object,
    require: true,
    default: () => {},
  },
  element: {
    type: Object,
    default: () => {},
  },
});



</script>

<style lang="less" scoped>
</style>
