# 通用H5网页适配方案

h5模板

npm install 安装依赖

npm run dev 本地运行命令

npm run build:test 打包测试

npm run build 打包正式

使用keep-alive模式，注意activated、deactivated生命周期函数的使用

mixins使用，可直接在mixins/native.js写入全局方法

m-container 最外层容器

m-header 头部组件:
    solt{
        left:左（可定制插入插槽）,
        title:可插入当前页面title,
        right: 右（可定制插入插槽）
    }


m-center容器:
{
    prop： 0:loading,1:异常，2：正常，
    场景：外层容器，用于页面状态控制，默认0，调用API通过此状态操作页面展示。
    ps:根据自己项目的LOADING图进行更换。
}

m-footer容器:
{
    此组件没有对应的solt,可直接在组件内部编写项目对应的Tab
}

注：少量组件 借鉴vux组件库
