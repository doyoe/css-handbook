# CSS参考手册

[![AppVeyor](https://img.shields.io/appveyor/ci/doyoe/css-handbook.svg)](https://ci.appveyor.com/project/doyoe/css-handbook)

国内最好的CSS参考手册，持续小步更新。。。

## 浏览器支持策略

手册在接下来将只更新IE6.0+, Firefox2.0+, Chrome4.0+, Safari6.0+, Opera15.0+（Opera从15.0开始转入webkit阵营）, iOS Safari6.0+, Android Browser2.1+, Android Chrome18.0+ 的支持数据，低于这些版本的数据将不再更新，让我们共同期望未来前端的生态环境越来越好。

## 版本更新

### 最新版本：v4.2.3

### 开发版本：v4.2.4


### 历史版本：

如想查看更多版本变更历史，请查看 [版本变更记录](http://css.doyoe.com/introduction/change-list.htm)


## 问题及反馈

如果您在使用CSS参考手册时发现了任何问题，或者有任何帮助手册更完善的想法和建议，请直接给我们提 [Issues](https://github.com/doyoe/css-handbook/issues/new) 和 [Pull Requests](https://github.com/doyoe/css-handbook/pulls)。


## 微信交流群：

![CSS参考手册微信交流群](images/wechat.png)


## 作者

杜瑶，我目前居住在北京，就职于 [Qunar](http://www.qunar.com)，您可以在 [Github](https://github.com/doyoe) 或者 [Weibo](http://weibo.com/doyoe) 看到我的最近动态。当然，也可以通过我的[个人站点](http://www.doyoe.com)，博客：[CSS探索之旅](http://blog.doyoe.com)，[CSS参考手册](http://css.doyoe.com) 和 [Web前端实验室](http://demo.doyoe.com) 等信息了解更多。


## 版本许可

源码和文档版权属于 [doyoe.com](http://www.doyoe.com)。文档发布基于 [Creative Commons](http://creativecommons.org/licenses/by/4.0/) 开源协议。

## 构建工具安装与使用

1. 安装[Node.js](http://nodejs.org/download/)，安装后可能需要重启电脑
1. 将安装源设置为中国地区，否则会很慢 `npm config set registry http://registry.cnpmjs.org/ --global`
1. 项目根目录运行`npm i`

### 编译chm

1. windows下安装[HTML Help Workshop](https://download.microsoft.com/download/0/A/9/0A939EF6-E31C-430F-A3DF-DFAE7960D564/htmlhelp.exe)
1. 在项目根目录运行`npm run build`命令

如果编译失败，请尝试拷贝`hhc.exe`到项目目录下

### 自动获取[caniuse](http://caniuse.com/)数据

在htm中添加如下注释

```HTML
<!-- compatible:start -->
<!-- compatible:end -->
```

一个页面需要多个兼容性表格：
```HTML
<!-- compatible:user-select-none -->
<!-- compatible:end -->

<!-- compatible:placeholder -->
<!-- compatible:end -->
```

### 代码错误检查

在项目根目录运行`npm run test`命令，将会检查所有html文件的代码合法性


### 持续集成(CI) 配置

- 使用appveyor构建chm文件
- CI下构建时，不自动打开chm文件
- CI下构建时，HTML和JS文件编码转换为GBK
- 构建后，自动发布chm文件及其压缩包到artifacts
