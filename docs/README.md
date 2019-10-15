# 项目描述文档
项目包管理工具采用 yarn [https://yarn.bootcss.com/docs/cli/init/]
打包工具： 待定

# 技术栈
react [https://zh-hans.reactjs.org/]
typescript [https://www.tslang.cn/docs/handbook/basic-types.html]
mobx [https://cn.mobx.js.org/]
antd [https://ant.design/index-cn]
electron [https://electronjs.org/docs]

# 项目结构：
|-build webpack4配置项
|   |-configs webpack的配置文件夹
|   |   |-rules 插件规则文件夹
|   |   |   |-img-rules.js 图片插件规则配置
|   |   |   |-js-rules.js js 插件规则配置
|   |   |   |-style-rules.js 样式表规则配置
|   |-utils webpack工具函数
|   |-webpack.config.base.js webpack的基础配置
|   |-webpack.config.dev.js webpack的开发环境配置
|   |-webpack.config.prod.js webpack的生产环境的配置
|-dist 项目输出目录(未打包)
|-electron-dist 程序输出目录(打包后的程序)
|-src 源码文件夹
|   |-main 主进程
|   |-renderers 渲染进程
|   |   |-components 公共组件
|   |   |   |- a.ts
|   |   |   |- a.tsx
|   |   |-views electron窗口
|   |-assets 静态资源目录
|   |-constants 常量配置
|   |   |-enums 常量枚举
|   |-typings ts类型声明
|   |-utils 常用工具函数
|-NORE.md 开发规范文档
|-PROJECT.md 项目文档
|-README.md 描述文档 
|-TS-Config-Detail ts配置文件详解



# 需求分析

·开发体验提升
·打包优化
·规范性

# 搭建过程

1.全局安装这样我们就可使用tsc命令了。

```bash
    yarn --global add typescript，
```

2.在我们指定的文件夹下面，初始化生成package.json和tsconfig.json

```bash
    yarn init && tsc --init
```

3.安装开发工具：webpack4, webpack-cli, webpack-dev-server

```bash
  yarn add webpack webpack-cli webpack-dev-server --dev
```

4.安装react以及相应的@types包
```bash
   yarn add react react-dom 
   yarn add @types/react @types/react-dom --dev
```

5.安装ts-loader(或者awesome-typescript-loader)，用于将ts代码转化为js

这里选择ts-loader 
```bash
    yarn add ts-loader --dev
```
注意，正则不要用字符串包裹起来 ，如： '/\.js/',这样无法识别

img0
img1

6.在我们的view中将程序的入口文件写入
img2
这时候，我们会发现div标签在报错，因为我们没有指定jsx的版本，我们需要在tsconfig中的编译配置中的jsx配置为react’

7. import * from * 中，我们只需要在webpack的resolve配置项的extensions中做如下配置，就可以不需要带拓展名了引入了
img3

8. 添加页面模板
在build文件夹下新建文件夹tpl，然后在tpl中新建一个index.html，如下:
img4

9.配置和html-webpack-plugin：
```bash
  yarn add --dev html-webpack-plugin
```
10. 配置tsconfig

target：目标代码 es6
module: 模块处理选择 exnext
moduleResolution： node

11.支持sass（可选）
sass是一款css预处理语言，支持变量，嵌套，mixin和导入等功能，可以极大地方便和简化css写法。

```bash 
yarn add sass sass-loader  fibers style-loader css-loader --dev
```
- webpack配置
 首先sass-loader将sass代码编译为css(默认使用node-sass)，然后css-loader将编译出来的代码再次编译成为符合CommonJS的代码，最后style-loader将第二步编译出来的代码转为js代码，然后webpack进行loader编译的顺序是从下到上的:
img5

12.支持cssModule
css module是针对css类名作用域做出限定的一种规范，用以解决css类名冲突的问题，此外还能避免一些爬虫进行数据爬取(当然厉害的爬虫除外)，同等的还有BEM规范。
因为在这里我们用的是TypeScript，所以可以用typings-for-css-modules-loader这个包，这个包也可以替代css-loader的功能，此外这个包还能根据.scss文件里面的类名自动生成对应的.d.ts文件:

```bash
    yarn add css-modules-typescript-loader --dev
```
如果选择安装typing-for-css-modules-loader的话，当我们此时尝试运行程序时，发现如下的错误
img9 

因为我们的此时的loader时^3的版本，所以，可以选择将css-loader降级到^1的版本

但综合考虑，我们选择安装另一个插件css-modules-typescript-loader

不要删除css-loader,因为它是typing-for-css-modules-loader的依赖文件之一

把style-rules 里的内容做如下修改

img6

然后再去index.tsx中修改

img7

但是会出现一个问题，

index.scss找不到
这个问题导致的原因是因为.scss文件中并没有类似export这样的关键词用于导出一个模块，所以也就导致报错找不到模块，这个问题可以通过ts的模块声明(declare module)来解决。
·解决： 这时候我们在根目录下新建一个typings文件夹，用于存放.scss的模块声明，以及后续需要用到的全局校验接口，然后新建typed-css-modules.d.ts文件用于存放.scss模块声明，目录结构和声明内容如下:

img8

这个时候回到index.tsx文件中你会发现错误标红消失了
当以后新增类名的时候，typed-css-modules.d.ts都会自动在index.scss.d.ts里面新增对应的类型校验:

13.在我们的renderers下新建styles文件夹，
并新建var.scss作为公共变量
路径优化，在sassOption中进行配置，

14.支持裝飾器
在src下新建components文件夾，，隨便寫一個react組件作为测试
并将其引入到入口文件
写个装饰器函数，并将其应用到Test组件上，这时候我们编辑器发现报错,
这时需要我们去tsconfig.json文件中将experimentalDecorators这一项设置为true
img10

15.组件引入路径优化
这里针对路径的优化有两种方案：
第一种：是直接在webpack.resolve.alias中进行路径配置
在webpack的resolve中添加alias选项，并且由于我们使用了ts，所以还需要在tsconfig的baseUrl和paths中进行配置
第二种： 用tsconfig-paths-webpack-plugin这个包将tsconfig中对路径的设置映射到webpack配置中去，这样就不需要在webpack中再进行一次路径的配置了，首先安装:
```bash 
  yarn add tsconfig-paths-webpack-plugin --dev
```
然后进行tsconfig配置
img 11

16. 构建缓存
如果我们使用的awsome-ts-loader，那么其本身就有缓存配置项
但是我们使用的ts-loader，所以我们需要安装 cache-loader
```bash
 yarn add cache-loader --dev
```
在我们所需要优化的loader前，加上cache-loader
以及相关配置
img 12

17. 集成antd
```bash 
yarn add antd 
yarn add less less-loader --dev
```
less 的配置与上面sass配置类似，但建议将sass移除，只保留一种css预编译语言 less，因为antd是使用less
注意， strictMath: false， 此項是必須的，否則會報錯；因爲less常量是在预编译阶段产生，而调用则是在浏览器环境下，两者不相关联，会产生错误
img 13

关键点： 按需导入

```bash 
yarn add ts-import-plugin --dev
```
然后按照官网配置即可