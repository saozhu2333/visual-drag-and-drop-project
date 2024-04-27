import { getAssetsFile } from "@/utils/utils";

const list = [
  {
    component: "v-text", // 组件名称，需要提前注册到 Vue
    label: "文字", // 左侧组件列表中显示的名字
    propValue: "双击编辑文字", // 组件所使用的值
    icon: "wenzi", // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    eventType:['all'],//不同组件可以显示不同的事件类型

    events: {
      click: {
        value: null,
        is: false,
      },
      dbClick: {
        value: null,
        is: false,
      },
      mouseDown: {
        value: null,
        is: false,
      },
      mouseUp: {
        value: null,
        is: false,
      },
    }, // 事件列表
    style: {
      // 组件样式
      width: 178,
      height: 21,
      top: 0,
      left: 0,
      rotate: 0,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "",
      letterSpacing: 0,
      textAlign: "left",
      color: "",
    },
  },
  {
    component: "v-botton", // 组件名称，需要提前注册到 Vue
    label: "按钮", // 左侧组件列表中显示的名字
    propValue: "按钮", // 组件所使用的值
    icon: "anniu", // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    eventType:[],
    request:{
      get:{

      },
      post:{

      }
    },
    events: {
      click: {
        value: null,
        is: false,
      },
      dbClick: {
        value: null,
        is: false,
      },
      mouseDown: {
        value: null,
        is: false,
      },
      mouseUp: {
        value: null,
        is: false,
      },
    }, // 事件列表
    style: {
      // 组件样式
      width: 140,
      height: 57,
      top: 0,
      left: 0,
      rotate: 0,
    },
  },
  {
    component: "vChart",
    label: "图表",
    icon: "echarts",
    propValue: {
      title: {
        text: "柱状图",
        show: true,
      },
      legend: {
        show: true,
      },
      tooltip: {
        show: true,
        trigger: "item",
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        show: true,
      },
      yAxis: {
        type: "value",
      },
      series: {
        type: "bar",
        name: "销量",
        data: [23, 61, 35, 77, 35],
        silent: false,
      },
    },
    animations: [], // 动画列表
    eventType:[],
    events: {
      click: {
        value: null,
        is: false,
      },
      dbClick: {
        value: null,
        is: false,
      },
      mouseDown: {
        value: null,
        is: false,
      },
      mouseUp: {
        value: null,
        is: false,
      },
    }, // 事件列表
    style: {
      width: 800,
      height: 500,
      top: 0,
      left: 0,
      rotate: 0,
    },
  },
  // {
  //   component: "pointsLine",
  //   label: "线",
  //   icon: "echarts",
  //   propValue: {
  //     points:[{x:0,y:0},{x:100,y:100},],
  //   },
  //   style: {
  //     width: 120,
  //     height: 10,
  //     top: 0,
  //     left: 0,
  //     rotate: 0,
  //     // borderColor:'#000'
  //   },
  // },
  {
    component: "lineBox",
    label: "线盒",
    icon: "xianduan",
    propValue: {
      points: [
        { x: 0, y: 1 },
        { x: 10000, y: 1 },
      ],
    },
    animations: [], // 动画列表
    eventType:[],
    events: {
      click: {
        value: null,
        is: false,
      },
      dbClick: {
        value: null,
        is: false,
      },
      mouseDown: {
        value: null,
        is: false,
      },
      mouseUp: {
        value: null,
        is: false,
      },
    }, // 事件列表
    style: {
      width: 120,
      height: 2,
      top: 0,
      left: 0,
      rotate: 0,
      strokeWidth: 2,
      strokeDasharray: "0",
      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "图片",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario.png"),
    },
    animations: [], // 动画列表
    eventType:[],
    events: {
      click: {
        value: null,
        is: false,
      },
      dbClick: {
        value: null,
        is: false,
      },
      mouseDown: {
        value: null,
        is: false,
      },
      mouseUp: {
        value: null,
        is: false,
      },
    }, // 事件列表
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vSwitch",
    label: "开关",
    icon: "kaiguan",
    propValue: {
    
    },
    animations: [], // 动画列表
    eventType:[],
    events: {
      click: {
        value: null,
        is: false,
      },
      dbClick: {
        value: null,
        is: false,
      },
      mouseDown: {
        value: null,
        is: false,
      },
      mouseUp: {
        value: null,
        is: false,
      },
    }, // 事件列表
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vVideo",
    label: "视频",
    icon: "shipin",
    propValue:'',
    animations: [], // 动画列表
    eventType:[],
    events: {
      click: {
        value: null,
        is: false,
      },
      dbClick: {
        value: null,
        is: false,
      },
      mouseDown: {
        value: null,
        is: false,
      },
      mouseUp: {
        value: null,
        is: false,
      },
    }, // 事件列表
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
];

export default list;

export const imgList = [
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥1",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario2.png"),
    },
    style: {
      width: 120,
      height: 80,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
  {
    component: "vImg",
    label: "马里奥2",
    icon: "tupian",
    propValue: {
      url: getAssetsFile("mario3.jpg"),
    },
    style: {
      width: 80,
      height: 150,
      top: 0,
      left: 0,
      rotate: 0,

      // borderColor:'#000'
    },
  },
];
