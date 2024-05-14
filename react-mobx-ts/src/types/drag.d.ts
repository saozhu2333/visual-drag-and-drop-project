export interface animationitemType {
  label: string
  value: string
}
export interface animationClassDataType {
  label: string
  children: animationitemType[]
}
export interface styleDataType {
  key: string
  label: string
}
export interface styleMapType {
  left: string
  top: string
  rotate: string
  width: string
  height: string
  color: string
  backgroundColor: string
  borderWidth: string
  borderStyle: string
  borderColor: string
  borderRadius: string
  fontSize: string
  fontWeight: string
  lineHeight: string
  letterSpacing: string
  textAlign: string
  verticalAlign: string
  opacity: string
}
export interface OptionsItemType {
  value: string
  label: string
}
export interface optionMapType {
  textAlign: OptionsItemType[]
  borderStyle: OptionsItemType[]
  verticalAlign: OptionsItemType[]
}

export interface componentEvent {
  value: any | null
  is: boolean
}

export interface ComponentStyle {
  width: number | string
  height: number | string
  top: number | string
  left: number | string
  rotate: number | string
  fontSize?: number | string
  fontWeight?: number | string
  lineHeight?: string | string
  letterSpacing?: number | string
  textAlign?: string | string
  color?: string | string
  strokeWidth?: number | string
  strokeDasharray?: number | string
}
export interface Component {
  id?: any
  component: string
  isLock?:boolean
  label: string
  propValue: any
  icon: string
  animations?: any[] // 根据你的需求定义动画类型
  eventType?: string[]
  request?: {
    get?: any // 根据你的需求定义请求类型
    post?: any // 根据你的需求定义请求类型
  }
  events?: {
    click: componentEvent
    dbClick: componentEvent
    mouseDown: componentEvent
    mouseUp: componentEvent
  }
  style: ComponentStyle
}
