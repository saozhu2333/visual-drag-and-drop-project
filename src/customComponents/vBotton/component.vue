<template>
  <div class="vbotton-class">
    <button type="button" class="button gray">按钮</button>
  </div>
 
</template>

<script setup lang="ts">
import {ref} from "vue"
</script>

<style lang="less" scoped>
.vbotton-class{
  position: absolute;
  width: 100%;
  height: 100%;
}
.button{
width: 100%;
line-height: 38px;
height: 100%;
text-align: center;
font-weight: bold;
color: #fff;
text-shadow:1px 1px 1px #333;
border-radius: 5px;

position: relative;
overflow: hidden;
}
.button.gray{
color: #8c96a0;
text-shadow:1px 1px 1px #fff;
border:1px solid #dce1e6;
box-shadow: 0 1px 2px #fff inset,0 -1px 0 #a8abae inset;
background: -webkit-linear-gradient(top,#f2f3f7,#e4e8ec);
background: -moz-linear-gradient(top,#f2f3f7,#e4e8ec);
background: linear-gradient(top,#f2f3f7,#e4e8ec);
}

</style>
