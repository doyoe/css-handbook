# CSS参考手册

持续小步更新中...

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

### 上个版本：v4.1.6

更新时间：2015.03.09

* 新增了
[&lt;image&gt;](http://css.doyoe.com/values/image/image.htm),
[image()](http://css.doyoe.com/values/image/image().htm),
[image-set()](http://css.doyoe.com/values/image/image-set().htm),
[&lt;gradient&gt;](http://css.doyoe.com/values/image/gradient.htm),
[&lt;color&gt;](http://css.doyoe.com/values/color/color.htm),
[currentColor](http://css.doyoe.com/values/color/currentColor.htm),
[inherit](http://css.doyoe.com/values/textual/inherit.htm),
[initial](http://css.doyoe.com/values/textual/initial.htm),
[counters](http://css.doyoe.com/values/content/counters.htm),
[font-size-adjust](http://css.doyoe.com/properties/font/font-size-adjust.htm)
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
[Background](http://css.doyoe.com/properties/background/index.htm),
[Color](http://css.doyoe.com/properties/color/index.htm),
[Font](http://css.doyoe.com/properties/font/index.htm)
等模块的浏览器兼容视图；
* 修订了
[Selectors](http://css.doyoe.com/selectors/index.htm),
[Rules](http://css.doyoe.com/rules/index.htm),
[Values and Units](http://css.doyoe.com/values/index.htm),
[Appendix](http://css.doyoe.com/appendix/index.htm),
[CSS Hack](http://css.doyoe.com/hack/index.htm)
等模块的浏览器兼容视图；
* 修订了
[border-image](http://css.doyoe.com/properties/border/border-image.htm),
[border-radius](http://css.doyoe.com/properties/border/border-radius.htm)
及相关属性的参考描述；

### 历史版本：

查看 [版本变更记录](http://css.doyoe.com/introduction/change-list.htm)

## GitHub计划

CSS参考手册从v4.1.4开始，代码都托管到[GitHub](https://github.com/doyoe/css-handbook)上。大家可以给手册提[Issues](https://github.com/doyoe/css-handbook/issues)和[Pull Requests](https://github.com/doyoe/css-handbook/pulls)。

会阶段性的合并，谢谢。

## Author

My name is Du Yao, working in Beijing [Qunar.com](http://www.qunar.com) now, is active in [Github](https://github.com/doyoe) and [Weibo](http://weibo.com/doyoe). Thus, you can find some information about me on my [Website](http://www.doyoe.com). Of course, you can visit my [blog](http://blog.doyoe.com) and use my tool sites, including [CSS-handbook](http://css.doyoe.com) and [Web front-end laboratories](http://demo.doyoe.com).


## Copyright and License

Code and documentation copyright 2014-2015 [doyoe.com](http://www.doyoe.com). Code released under [the MIT license](http://opensource.org/licenses/MIT). Docs released under [Creative Commons](http://creativecommons.org/licenses/by/4.0/).

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