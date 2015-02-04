CSS参考手册
==========

持续小步更新中...

##浏览器支持策略

手册在接下来将只更新IE6.0+, Firefox4.0+, Chrome4.0+, Safari4.0+, Opera15.0+（Opera从15.0开始转入webkit阵营）的支持数据，低于这些版本的数据将不再更新，让我们共同期望未来前端的生态环境越来越好。

##版本更新

###草案版本：v4.1.7(WD)

CSS参考手册目前正在v4.1.7草案中。广泛接受[Issues](https://github.com/doyoe/css-handbook/issues)和[Pull Requests](https://github.com/doyoe/css-handbook/pulls)

* 新增了
[&lt;image&gt;](http://css.doyoe.com/values/image/image.htm),
[image()](http://css.doyoe.com/values/image/image().htm),
[image-set()](http://css.doyoe.com/values/image/image-set().htm),
[&lt;gradient&gt;](http://css.doyoe.com/values/image/gradient.htm),
[&lt;color&gt;](http://css.doyoe.com/values/color/color.htm),
[currentColor](http://css.doyoe.com/values/color/currentColor.htm),
[inherit](http://css.doyoe.com/values/textual/inherit.htm),
[initial](http://css.doyoe.com/values/textual/initial.htm),
[counters](http://css.doyoe.com/values/content/counters.htm)
参考；
* 移除了 min(), max() 参考；
* 修订了
[&lt;url&gt;](http://css.doyoe.com/values/textual/url.htm),
[linear-gradient()](http://css.doyoe.com/values/image/linear-gradient().htm),
[repeating-linear-gradient()](http://css.doyoe.com/values/image/repeating-linear-gradient().htm),
[radial-gradient()](http://css.doyoe.com/values/image/radial-gradient().htm),
[repeating-radial-gradient()](http://css.doyoe.com/values/image/repeating-radial-gradient().htm)
参考；
* 修订了
[Dimension](http://css.doyoe.com/properties/dimension/index.htm),
[Margin](http://css.doyoe.com/properties/margin/index.htm),
[Padding](http://css.doyoe.com/properties/padding/index.htm),
[Border](http://css.doyoe.com/properties/border/index.htm),
[Background](http://css.doyoe.com/properties/background/index.htm)
等模块的浏览器兼容视图；
* 修订了
[border-image](http://css.doyoe.com/properties/border/border-image.htm),
[border-radius](http://css.doyoe.com/properties/border/border-radius.htm)
及相关属性的参考描述；

###最新版本：v4.1.6

更新时间：2015.01.28

* 修订了 [Positioning](http://css.doyoe.com/properties/positioning/index.htm) 模块的参考描述，使用新的浏览器兼容视图，增加部分移动浏览器支持；
* 修订了 [Layout](http://css.doyoe.com/properties/layout/index.htm) 模块的参考描述，使用新的浏览器兼容视图，增加部分移动浏览器支持；
* 排查了手册中的死链；
* 修订了属性选择符 [E[att|="val"]](http://css.doyoe.com/selectors/attribute/att7.htm) 的参考描述和示例；
* 修订了 [list-style](http://css.doyoe.com/properties/list/list-style.htm)的语法描述；
* 新增了 [appearance](http://css.doyoe.com/properties/user-interface/appearance.htm)、 [pointer-events](http://css.doyoe.com/properties/user-interface/pointer-events.htm) 和 [E::placeholder](http://css.doyoe.com/selectors/pseudo-element/placeholder.htm) 参考；


###上个版本：v4.1.5

更新时间：2014.08.28

* 更新了手册对浏览器版本的支持策略，较低版本的数据将不再更新。</li>
* 修订了[选择符](http://css.doyoe.com/selectors/index.htm)模块的参考描述，并更新了浏览器支持情况；
* 修订了[语法与规则](http://css.doyoe.com/rules/index.htm)模块的参考描述，并更新了浏览器支持情况；
* 合并并修订了[取值与单位](http://css.doyoe.com/values/index.htm)两大模块；
* 修订了[Table](http://css.doyoe.com/properties/table/index.htm)模块下的大部分属性的参考描述，更新了浏览器支持版本；；
* 新增了[参考资源列表](http://css.doyoe.com/experience/refer.htm)；
* 一些其它修改，包括：语法错误，连接错误，UI微调等；

###历史版本：

查看 [版本变更记录](http://css.doyoe.com/introduction/change-list.htm)

## GitHub计划

CSS参考手册从v4.1.4开始，代码都托管到[GitHub](https://github.com/doyoe/css-handbook)上。大家可以给手册提[Issues](https://github.com/doyoe/css-handbook/issues)和[Pull Requests](https://github.com/doyoe/css-handbook/pulls)。

会阶段性的合并，谢谢。

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