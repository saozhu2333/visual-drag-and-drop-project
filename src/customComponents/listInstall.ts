// 批量注册customComponents全局组件
const modules = import.meta.glob("@/customComponents/*/*.vue");

const components = {
  install: function (app: any) {
    for (let path in modules) {

      modules[path]().then((mod: any) => {
        if (mod["default"]["__name"] == "component") {
          //获取文件夹名称做组件名，注册全局组件
          app.component(path.split("/")[3], mod["default"]);
        }
        if(mod["default"]["__name"] == "Attr"){
            //获取文件夹名称做组件名,注册全局属性组件
          app.component(path.split("/")[3]+'Attr', mod["default"]);
        }
      });
    }
  },
};
export default components;
