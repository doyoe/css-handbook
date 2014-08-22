##浏览器支持策略

手册在接下来将只更新IE6.0+, Firefox4.0+, Chrome4.0+, Safari4.0+, Opera15.0+（Opera从15.0开始转入webkit阵营）的支持数据，低于这些版本的数据将不再更新，让我们共同期望未来前端的生态环境越来越好。

##版本更新

###最新版本：v4.1.5(WD)

CSS参考手册目前正在v4.1.5草案中。

* 手册已在<a href="https://github.com/doyoe/css-handbook" target="_blank" rel="external" class="external">GitHub</a>开源，欢迎大家提交<a href="https://github.com/doyoe/css-handbook/issues" target="_blank" rel="external" class="external">Issues</a>和<a href="https://github.com/doyoe/css-handbook/pulls" target="_blank" rel="external" class="external">Pull Requests</a>
* 更新了手册对浏览器版本的支持策略，较低版本的数据将不再更新。</li>
* 修订了<a href="http://css.doyoe.com/selectors/pseudo-element/index.htm">伪对象选择符</a>模块下的大部分属性的参考描述，更新了浏览器支持版本；
* 新增了相对长度单位 <a href="http://css.doyoe.com/units/length/vmax.htm">vmax</a> 与 <a href="http://css.doyoe.com/units/length/vmin.htm">vmin</a>；
* 更新了相对长度单位 <a href="http://css.doyoe.com/units/length/vw.htm">vw</a>、<a href="http://css.doyoe.com/units/length/vh.htm">vh</a> 的浏览器兼容性数据；
* 修订了<a href="http://css.doyoe.com/properties/transition/transition-timing-function.htm">animation-timing-function示例</a>；
* 修订了<a href="http://css.doyoe.com/properties/transition/transition-delay.htm">transition-delay属性说明</a>；
* 修订了<a href="http://css.doyoe.com/selectors/pseudo-classes/target.htm">target选择器详细解释及示例</a>；
* 修订了<a href="http://css.doyoe.com/properties/table/index.htm">Table</a>模块下的大部分属性的参考描述，更新了浏览器支持版本；；
* 完善 <a href="http://css.doyoe.com/values/color/rgba.htm">rgba 透明模式的全兼容解决方案，附加透明度16进制对应表</a>；
* 新增了<a href="http://css.doyoe.com/experience/refer.htm">参考资源列表</a>；

## GitHub计划

CSS参考手册从v4.1.4开始，代码都托管到GitHub上。大家可以给手册提Pull Requests。

会阶段性的合并，谢谢。

## 编译chm

windows下安装`HTML Help Workshop`后，双击打开`css.hhp`，点击`编译HTML文件`按钮，即可完成编译

修改chm目录：`contents.hhc`，修改chm索引：`index.hhk`

## 代码错误检查

为确保大家提交的代码的质量，提交代码之前请在项目根目录运行`grunt`命令检查你修改的HTML是否有语法错误

**grunt安装方法**

1. 安装[Python v2.x.x](https://www.python.org/downloads/)
1. 安装[Node.js](http://nodejs.org/download/),安装后可能需要重启电脑
1. 命令行运行`npm config set python C:\Python27\python.exe --global`
1. 将安装源设置为中国地区，否则会很慢 `npm config set registry http://registry.cnpmjs.org/ --global`
1. 命令行运行 `npm install -g grunt-cli`
1. 项目根目录运行`npm install`
