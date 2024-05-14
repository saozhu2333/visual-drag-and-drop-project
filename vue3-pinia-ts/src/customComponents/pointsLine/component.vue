<template>
  <div>
    <svg
      id="svg"
      :width="svgWidth"
      :height="svgHeight"
      ref="svgRef"
      xmlns="http://www.w3.org/2000/svg"
      
    >
      <polyline
      ref="polylineRef"
        :points="pointsValue"
        stroke="black"
        stroke-width="2"
        fill="none"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, inject } from "vue";
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
const polylineRef:any = ref(null)
const svgRef:any = ref(null)
const handleMouseDownOnLine = inject('handleMouseDownOnLine')
const pointsValue = computed(() => {
  return props.propValue.points
    .map((res: any, index: number) => {
      return `${res.x},${res.y}`;
    })
    .join(" ");
});
const svgWidth = computed(()=>{
  return Math.max.apply(Math, props.propValue.points.map(function(o:any) {
	return o.x;
}))
})
const svgHeight = computed(()=>{
  return Math.max.apply(Math, props.propValue.points.map(function(o:any) {
	return o.y;
}))
})
onMounted(() => {
  svgRef.value.addEventListener('click',isPolylineClicked)
  
});

function distanceToSegment(p:any, v:any, w:any) {
  const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
  if (l2 === 0) return Math.sqrt((p.x - v.x) ** 2 + (p.y - v.y) ** 2);
  const t = Math.max(
    0,
    Math.min(1, ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2)
  );
  const projection = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
  return Math.sqrt((p.x - projection.x) ** 2 + (p.y - projection.y) ** 2);
}


function isPolylineClicked(event:any) {
  event.stopPropagation();
  event.preventDefault();
  // 获取点击的坐标
  const clickX = event.clientX;
  const clickY = event.clientY;


  // 创建一个新的SVG点
  const svgPoint = svgRef.value!.createSVGPoint();
  svgPoint.x = clickX;
  svgPoint.y = clickY;

  // 将点击的点转换为SVG坐标系
  const transformedPoint = svgPoint.matrixTransform(
    svgRef.value.getScreenCTM().inverse()
  );

  // 获取polyline的points属性值
  const points = polylineRef.value.getAttribute("points").split(" ");

  // 检查点是否在polyline上
  let isClicked = false;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i].split(",").map(Number);
    const [x2, y2] = points[i + 1].split(",").map(Number);
    const dist = distanceToSegment(
      transformedPoint,
      { x: x1, y: y1 },
      { x: x2, y: y2 }
    );
    if (dist < 5) {
      isClicked = true;
      break;
    }
  }

  if (isClicked) {
    handleMouseDownOnLine(event)
  }
}

</script>

<style lang="less" scoped></style>
