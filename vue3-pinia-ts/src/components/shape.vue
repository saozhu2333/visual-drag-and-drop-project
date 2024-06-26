<template>
  <!-- <span v-show="isActive()" class="iconfont icon-xiangyouxuanzhuan" @mousedown="handleRotate"></span> -->
  <!-- <span v-show="element.isLock" class="iconfont icon-suo"></span> -->
  <div
    v-if="props.element.component !=='pointsLine'"
    :class="`shape ${props.active ? 'active' : ''}`"
    ref="shapeBoxRef"
    id="shape"
    @mousedown="handleMouseDownOnShape"
  >
    <span
      v-show="isActive()"
      class="iconfont icon-icon_rotate icon-class"
      @mousedown="handleRotate"
    ></span>
    <div
      v-for="item in isActive() ? getPoniteList() : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <!-- 遮罩层，防开发改变数据、误触 -->
    <div v-if="props.element.component == 'vVideo' || props.element.component == 'vSwitch'" :style="`position: absolute;width:${defaultStyle.width}px;height:${defaultStyle.height}px; z-index:9999;`"></div>
    <slot></slot>
  </div>

  <div
    v-else
    :class="`shape`"
    ref="shapeBoxRef"
    id="shape"
  >
    <div
      v-for="(item,index) in isActive()?props.element.propValue.points:[]"
      :key="index"
      class="shape-point"
      :style="getpointLineStyle(item)"
      @mousedown="handleMouseDownOnPointLine(item,index, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,provide } from "vue";
import { useIndexStore } from "@/store";
import { useSnapshotStore } from "@/store/snapshot";
import calculateComponentPositonAndSize from "@/utils/calculateComponentPositonAndSize";
import { mod360 } from "@/utils/translate";

const indexStore = useIndexStore();
const snapshotStore = useSnapshotStore();
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  defaultStyle: {
    required: true,
    type: Object,
    default: () => {},
  },
  element: {
    required: true,
    type: Object,
    default: () => {},
  },
  index: {
    required: true,
    type: [Number, String],
    default: 0,
  },
});
let editorref = ref<HTMLElement | null>(null);
let shapeBoxRef = ref<HTMLElement | null>(null);
let cursors = ref({})
const initialAngle = {
  // 每个点对应的初始角度
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315,
};
const angleToCursor = [
  // 每个范围的角度对应的光标
  { start: 338, end: 23, cursor: "nw" },
  { start: 23, end: 68, cursor: "n" },
  { start: 68, end: 113, cursor: "ne" },
  { start: 113, end: 158, cursor: "e" },
  { start: 158, end: 203, cursor: "se" },
  { start: 203, end: 248, cursor: "s" },
  { start: 248, end: 293, cursor: "sw" },
  { start: 293, end: 338, cursor: "w" },
];
const pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
const pointLineList = [ "r", "l"];
onMounted(() => {
  editorref.value = document.getElementById("editor");
  shapeBoxRef.value = document.getElementById("shape")
});

const getPoniteList = ()=>{
  return props.element.component ==='lineBox'?pointLineList:pointList
}
  /**
   * @函数功能: 旋转
   * @出口参数:
   * @函数备注:
   */
   const handleRotate = (e: any) => {
    //点击旋转时防止失去焦点
    indexStore.setClickComponentStatus(true);
    e.preventDefault();
    e.stopPropagation();
    // 初始坐标和初始角度
    const pos = { ...props.defaultStyle };
    const startY = e.clientY;
    const startX = e.clientX;
    const startRotate = pos.rotate;
    // 获取元素中心点位置
    const rect = shapeBoxRef.value!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // 旋转前的角度
    const rotateDegreeBefore =
      Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);
    // 如果元素没有移动，则不保存快照
    let hasMove = false
    const move = (moveEvent: MouseEvent) => {
      hasMove = true
      const curX = moveEvent.clientX;
      const curY = moveEvent.clientY;
      // 旋转后的角度
      const rotateDegreeAfter =
        Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
      // 获取旋转的角度值
      pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore;
      // 修改当前组件样式
      indexStore.setShapeStyle(pos);
    };

    const up = () => {
      hasMove && snapshotStore.recordSnapshot()
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      cursors.value = getCursor(); // 根据旋转角度获取光标位置
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };
/**
 * @函数功能: 计算光标旋转角度
 * @出口参数: 
 * @函数备注: 
 */  
const getCursor = () => {
  const rotate = mod360(indexStore.curComponent!.style.rotate as number); // 取余 360
  const result = {};
  let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

  pointList.forEach((point) => {
    const angle = mod360(initialAngle[point] + rotate);
    const len = angleToCursor.length;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      lastMatchIndex = (lastMatchIndex + 1) % len;
      const angleLimit = angleToCursor[lastMatchIndex];
      if (angle < 23 || angle >= 338) {
        result[point] = "nw-resize";

        return;
      }

      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point] = angleLimit.cursor + "-resize";

        return;
      }
    }
  });

  return result;
};
provide('handleMouseDownOnLine', (e:any) => {
    handleMouseDownOnLine(e);
    });
/**
 * @函数功能: 计算线段移动位置
 * @param {*} point
 * @param {*} index
 * @param {*} e
 * @出口参数: 
 * @函数备注: 
 */
const handleMouseDownOnPointLine = (point: any,index:any, e: any)=>{
  const style = { ...props.defaultStyle };
    // 获取画布位移信息
    const editorRectInfo = editorref.value!.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect(),editorRectInfo,style)
  e.stopPropagation();
  e.preventDefault();
  let isFirst = true;

  const move = (moveEvent: any) => {

    let newPoint = {
    x:moveEvent.clientX - editorRectInfo.left -style.left ,
    y:moveEvent.clientY - editorRectInfo.top -style.top 
  }
    props.element.propValue.points[index] = newPoint

    indexStore.setLinepropValue(props.element.propValue.points)
    // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
    // 因此第一次点击时不触发 move 事件
    if (isFirst) {
      isFirst = false;
      return;
    }
  }
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    //添加快照
    // needSave && this.$store.commit('recordSnapshot')
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}
/**
 * @函数功能: 组件缩放功能
 * @param {*} point
 * @param {*} e
 * @出口参数:
 * @函数备注:
 */
const handleMouseDownOnPoint = (point: any, e: any) => {
  //分组状态标识
  let needLockProportion = false;

  indexStore.setClickComponentStatus(true);
  e.stopPropagation();
  e.preventDefault();
  const style = { ...props.defaultStyle };
  // 组件宽高比
  const proportion = style.width / style.height;
  indexStore.setShapeStyle(style);
  // 组件中心点
  const center = {
    x: style.left + style.width / 2,
    y: style.top + style.height / 2,
  };
  // 获取画布位移信息
  const editorRectInfo = editorref.value!.getBoundingClientRect();
  // 获取 point 与实际拖动基准点的差值 @justJokee
  const pointRect = e.target.getBoundingClientRect();
  // 当前点击圆点相对于画布的中心坐标
  const curPoint = {
    x: Math.round(
      pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2
    ),
    y: Math.round(
      pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2
    ),
  };
  // 获取对称点的坐标
  const symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y),
  };
  let needSave = false
  let isFirst = true;
  const move = (moveEvent: any) => {
    indexStore.setShapeStyle(style);
    // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
    // 因此第一次点击时不触发 move 事件
    if (isFirst) {
      isFirst = false;
      return;
    }
    // 是否保存快照
    needSave = true
    const curPositon = {
      x: moveEvent.clientX - Math.round(editorRectInfo.left),
      y: moveEvent.clientY - Math.round(editorRectInfo.top),
    };

    calculateComponentPositonAndSize(
      point,
      style,
      curPositon,
      proportion,
      needLockProportion,
      {
        center,
        curPoint,
        symmetricPoint,
      }
    );
  };

  const up = () => {
    needSave && snapshotStore.recordSnapshot()
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    //添加快照
    // needSave && this.$store.commit('recordSnapshot')
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
//返回是否被点击
const isActive = () => {
  return props.active;
};
const getpointLineStyle = (point: any)=>{
  const style = {
    marginLeft: "-4px",
    marginTop: "-4px",
    left: `${point.x}px`,
    top: `${point.y}px`,
  };
  return style;
}
/**
 * @函数功能: 绘制组件选中的边框
 * @param {*} point
 * @出口参数:
 * @函数备注:
 */
const getPointStyle = (point: any) => {
  const { width, height } = props.defaultStyle;
  const hasT = /t/.test(point);
  const hasB = /b/.test(point);
  const hasL = /l/.test(point);
  const hasR = /r/.test(point);
  let newLeft = 0;
  let newTop = 0;

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width;
    newTop = hasT ? 0 : height;
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2;
      newTop = hasT ? 0 : height;
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width;
      newTop = Math.floor(height / 2);
    }
  }
  const style = {
    marginLeft: "-4px",
    marginTop: "-4px",
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursors.value[point],
  };
  return style;
};
/**
 * @函数功能: 线段是否被点击
 * @param {*} e
 * @出口参数: 
 * @函数备注: 
 */
const handleMouseDownOnLine = (e:any)=>{
  indexStore.setClickComponentStatus(true);
  e.stopPropagation();
  e.preventDefault();
  indexStore.setCurComponent({ component: props.element, index: props.index });
}
/**
 * @函数功能: 用于进行组件拖拽方法
 * @param {*} e
 * @出口参数:
 * @函数备注:
 */
const handleMouseDownOnShape = (e: any) => {

  indexStore.setClickComponentStatus(true);
  e.stopPropagation();
  indexStore.setCurComponent({ component: props.element, index: props.index });
//如果是显示用途则直接抛出
  if(!props.defaultStyle) return
  cursors.value = getCursor() // 根据旋转角度获取光标位置
  let pos = props.defaultStyle;
  const startY = e.clientY;
  const startX = e.clientX;
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(pos.top);
  const startLeft = Number(pos.left);
  let hasMove = false
  const move = (moveEvent: any) => {
    hasMove = true
    const currX = moveEvent.clientX;
    const currY = moveEvent.clientY;
    pos.top = currY - startY + startTop;
    pos.left = currX - startX + startLeft;
    indexStore.setShapeStyle(pos);
  };

  const up = () => {
    hasMove && snapshotStore.recordSnapshot()
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
</script>

<style lang="less" scoped>
.shape {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: move;
  }
}
.icon-class {
  position: absolute;
  top: -30px;
  left: calc(50% - 8px);
  color: #59c7f9;
  cursor: grab;
}
.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
</style>
