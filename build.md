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