import React, { Component } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import ComponentList from "@/component/componentList";
import "@/style/index.less";

const { Header, Footer, Sider, Content } = Layout;

export default class index extends Component {
  state = {};
  theme = {
    components: {
      Layout: {
        headerBg: "#f5f5f5",
        borderRadius: 2,
        siderBg: "#f5f5f5",
        headerHeight: 50,
      },
    },
    algorithm: [theme.compactAlgorithm],
  };
  componentDidMount() {}
  render() {
    return (
      <ConfigProvider theme={this.theme}>
        <Layout style={{ height: "100%" }}>
          <Header>Header</Header>
          <Layout style={{ height: "100%" }}>
            <Sider
              style={{
                height: `calc(100% - ${this.theme.components.Layout.headerHeight})`,
                width: "250px",
              }}
            >
              <ComponentList />
            </Sider>
            <Content
              style={{
                height: `calc(100% - ${this.theme.components.Layout.headerHeight})`,
                width: "calc(100% - 250px)",
              }}
            >
              <div
                className="content"
                onDrop={this.handleDrop.bind(this)}
                onDragOver={this.handleOver.bind(this)}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseUp={this.deselectCurComponent.bind(this)}
              ></div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
  handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // const rectInfo = document.getElementById("editor")!.getBoundingClientRect();

    const index = e.dataTransfer.getData("index");
    console.log(index);
    // 根据类型判断使用哪个数组
    const type = e.dataTransfer.getData("type");
    if (index) {
      
      // const component = deepCopy(type == 1?imgList[index]:customList[index]);
      // console.log(type,component)
      // component.style.top = e.clientY - rectInfo.y;
      // component.style.left = e.clientX - rectInfo.x;
      // component.id = generateID();
      // indexStore.addComponent(component);
      // snapshotStore.recordSnapshot()
    }
  };
  handleOver(e: any) {
    e.preventDefault();
  }
  handleMouseDown(e: any) {
    e.stopPropagation();
  }
  deselectCurComponent(e: any) {
    // if (!indexStore.isClickComponent) {
    //   indexStore.setCurComponent({ component: null, index: null });
    // }
    if (e.button != 2) {
      // contextMenu.hideContextMenu();
    }
  }

}
