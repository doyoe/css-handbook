# CSS参考手册

国内最好的CSS参考手册，持续小步更新。。。

## 浏览器支持策略

手册在接下来将只更新IE6.0+, Firefox2.0+, Chrome4.0+, Safari6.0+, Opera15.0+（Opera从15.0开始转入webkit阵营）, iOS Safari6.0+, Android Browser2.1+, Android Chrome18.0+ 的支持数据，低于这些版本的数据将不再更新，让我们共同期望未来前端的生态环境越来越好。

## 版本更新

### 草案版本：v4.2.1

CSS参考手册目前正在v4.2.1开发中。广泛接受[Issues](https://github.com/doyoe/css-handbook/issues)和[Pull Requests](https://github.com/doyoe/css-handbook/pulls)

### 最新版本：v4.2.0

更新时间：2015.08.14

* 新增了
[text-size-adjust](http://css.doyoe.com/properties/text/text-size-adjust.htm),
[tap-highlight-color](http://css.doyoe.com/properties/only-webkit/tap-highlight-color.htm),
[user-drag](http://css.doyoe.com/properties/only-webkit/user-drag.htm)
参考；
* 修订了 [Transform](http://css.doyoe.com/properties/transform/index.htm) 模块，并新增了3D相关参考：
[transform-style](http://css.doyoe.com/properties/transform/transform-style.htm),
[perspective](http://css.doyoe.com/properties/transform/perspective.htm),
[perspective-origin](http://css.doyoe.com/properties/transform/perspective-origin.htm),
[backface-visibility](http://css.doyoe.com/properties/transform/backface-visibility.htm)；
* 阅读指引中新增了 [语法指引](http://css.doyoe.com/introduction/guide.htm) 用于帮助读者轻松看懂语法；
* 修订了大部分模块的浏览器兼容性列表；


### 历史版本：

查看 [版本变更记录](http://css.doyoe.com/introduction/change-list.htm)


## 作者

杜瑶，我目前居住在北京，就职于 [Qunar](http://www.qunar.com)，您可以在 [Github](https://github.com/doyoe) 或者 [Weibo](http://weibo.com/doyoe) 看到我的最近动态。当然，也可以通过我的[个人站点](http://www.doyoe.com)，博客：[CSS探索之旅](http://blog.doyoe.com)，[CSS参考手册](http://css.doyoe.com) 和 [Web前端实验室](http://demo.doyoe.com) 等信息了解更多。


## 版本许可

源码和文档版权属于 [doyoe.com](http://www.doyoe.com)。文档发布基于 [Creative Commons](http://creativecommons.org/licenses/by/4.0/) 开源协议。

<!--
## 构建工具安装与使用

1. 安装[Node.js](http://nodejs.org/download/)，安装后可能需要重启电脑
1. 命令行运行`npm install -g gulp `
1. 将安装源设置为中国地区，否则会很慢 `npm config set registry http://registry.cnpmjs.org/ --global`
1. 项目根目录运行`npm install`

### 编译chm

1. windows下安装[HTML Help Workshop](http://download.microsoft.com/download/0/A/9/0A939EF6-E31C-430F-A3DF-DFAE7960D564/htmlhelp.exe)
1. 在项目根目录运行`gulp chm`命令

如果编译失败，请尝试拷贝`hhc.exe`到项目目录下

### 代码错误检查

在项目根目录运行`gulp htm`命令，将会检查所有html文件的代码合法性
-->