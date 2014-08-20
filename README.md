v4.1.5(WD)
============

CSS参考手册目前正在v4.1.5草案中，大家可以给手册提Pull Requests。

会阶段性的合并，谢谢。

## GitHub计划

CSS参考手册从v4.1.4开始，代码都托管到GitHub上。

## 编译chm

windows下安装`HTML Help Workshop`后，双击打开`css.hhp`，点击`编译HTML文件`按钮，即可完成编译

修改chm目录：`contents.hhc`，修改chm索引：`index.hhk`

## 代码错误检查

为确保大家提交的代码的质量，提交代码之前请在项目根目录运行`grunt`命令检查你修改的HTML是否有语法错误

**grunt安装方法**

1. 安装[Node.js](http://nodejs.org/download/),安装后可能需要重启电脑
1. 将安装源设置为中国地区，否则会很慢 `npm config set registry http://registry.cnpmjs.org/ --global`
1. 命令行运行 `npm install -g grunt`
1. 项目根目录运行`npm install`
