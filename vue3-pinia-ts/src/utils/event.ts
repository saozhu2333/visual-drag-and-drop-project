import { ElMessage } from 'element-plus'
// 编辑器自定义事件
const events = {
    redirect(url:string) {
        if (url) {
            window.location.href = url
        }
    },

    alert(msg:string) {
        if (msg) {
            alert(msg)
        }
    },
    default(str:string) {
        ElMessage(str)
    },
}

const eventList = [
    {
        key: 'default',
        label: '默认事件',
        event: events.default,
        param: '已绑定事件，暂未对该事件进行操作',
    },{
        key: 'redirect',
        type:'all',
        label: '跳转事件',
        event: events.redirect,
        param: '跳转',
    },
    {
        key: 'alert',
        type:'all',
        label: 'alert 事件',
        event: events.alert,
        param: 'alert',
    },
    
]
const EventLabel ={
    'click':'单击',
    'dbClick':'双击',
    'mouseDown':'按下',
    'mouseUp':'抬起'
  }

export {
    events,
    eventList,
    EventLabel
}
