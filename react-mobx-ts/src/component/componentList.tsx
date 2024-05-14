import React, { Component } from "react";
import componentListdata from "@/customComponents/component-list";
import '@/style/component/componentlist.less'

export default class componentList extends Component {
  state = {};

  constructor(props: {}) {
    super(props);
  }
  componentDidMount() {
    console.log(componentListdata);
  }
  render() {
    return (
      <div className="component-list"  onDragStart={this.handleDragStart}>
        {componentListdata.map((item, index) => {
          return (
            <div
              key={index}
              className="item"
              data-index={index}
              draggable="true"
              onDragOver={this.dragoverFun.bind(this)}
            >
              <span
                className={`iconfont icon-${item.icon}`}
                data-type={0}
                data-index={index}
              ></span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }
  dragoverFun(e: any) {
     e.preventDefault();
  }
  handleDragStart(e: any){
   
    e.dataTransfer.setData("index", e.target.dataset.index);
    e.dataTransfer.setData("type", e.target.dataset.type);
  }
}
