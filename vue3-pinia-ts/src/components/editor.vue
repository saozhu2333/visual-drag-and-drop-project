<template>
  <div
    id="editor"
    :class="`editor ${isEdit ? 'edit' : ''}`"
    :style="{
            ...getCanvasStyle(indexStore.canvasStyleData),
            width: changeStyleWithScale(indexStore.canvasStyleData.width) + 'px',
            height: changeStyleWithScale(indexStore.canvasStyleData.height) + 'px',
        }"
    @contextmenu="handleContextMenu"
  >
  <!-- 网格线背景 -->
  <grid :is-dark-mode="true"></grid>
    <shape
      v-for="(item, index) in indexStore.componentData"
      :key="item.id"
      :style="getShapeStyle(item.style)"
      :default-style="item.style"
      :element="item"
      :active="item.id === (indexStore.curComponent || {}).id"
      :index="index"
    >
      <component
        :is="item.component"
        v-if="item.component.startsWith('SVG')"
        :id="'component' + item.id"
        :style="getSVGStyle(item.style)"
        class="component"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
      />

      <component
        :is="item.component"
        v-else-if="item.component != 'VText'"
        :id="'component' + item.id"
        class="component"
        :style="getComponentStyle(item.style)"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
      />

      <component
        :is="item.component"
        v-else
        :id="'component' + item.id"
        class="component"
        :style="getComponentStyle(item.style)"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
      />
    </shape>
    <!-- 右键菜单 -->
    <ContextMenu></ContextMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import shape from "./shape.vue";
import ContextMenu from "./ContextMenu.vue";
import grid from "./grid.vue";
import { getShapeStyle, getSVGStyle, getStyle,getCanvasStyle } from "@/utils/style";
import { useIndexStore } from "@/store";
import { useContextMenuStore } from "@/store/contextmenu";
import { changeStyleWithScale } from '@/utils/translate'
defineProps({
  isEdit: {
    type: Boolean,
    default: true,
  },
});
const indexStore = useIndexStore();
const contextMenuStore = useContextMenuStore();
const svgFilterAttrs = ["width", "height", "top", "left", "rotate"];
function getComponentStyle(style: any) {
  return getStyle(style, svgFilterAttrs);
}
// 右键菜单
function handleContextMenu(e: any) {
  e.stopPropagation();
  e.preventDefault();
  // 计算菜单相对于编辑器的位移
  let target = e.target;
  let top = e.offsetY;
  let left = e.offsetX;
  while (target instanceof SVGElement) {
    target = target.parentNode;
  }

  while (!target.className.includes("editor")) {
    left += target.offsetLeft;
    top += target.offsetTop;
    target = target.parentNode;
  }
  contextMenuStore.showContextMenu({top,left})
}
</script>

<style lang="less" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;
  width: 100%;
  height: 100%;
  .lock {
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
