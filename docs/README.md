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
```bash
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
```


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
 yarn add ts-import-plugin --dev (或者下面 二选一)
 yarn add babel-loader @babel/core @babel/preset-env  babel-plugin-import --dev
```
-1：选择babel做转换(不推薦)
首先尝试了在根目录下建立.babelrc文件，结果引入无效，好吧，我们换个方式，直接在webpack中引入babel相关的配置，由于我们使用了ts-loader
因为ts-loader是将ts代码装换为js代码，而babel则是将js代码转化为制定结构的js代码，并且之前我们提到过，loader加载顺序由下及上，所以，babel要写在ts-loader的前面
-2： 直接选择ts-import-plugin, 那么直接按照官网教程即可

問題修復： ts-import-plugin 之所以會出現無法按需導入的情況，是因为我们在css-loader的options中开启了modules: true,这项，所以解决方案是：我们可以单独写一天antd的规则与src的规则区分开即可
img 14，
img 15


18. 状态管理工具的选择
react使用的状态管理工具的选择：
最原始的自然就是 react自身所带的state或者props了，但是对于业务的使用来讲其实非常的麻烦，因此自然也不是我们想要的，
当然我们也可以使用的react函数式的编程中的hook，但对于这一点，我使用经验不多，所以暂且放弃，后续有时间继续探究，
所以我们选择的时mobx
如果有使用的vue的同学，那么可以说对mobx的写法可以说的非常的熟悉了，同样是数据双向绑定；
话不多说：
```bash
yarn add  mobx mobx-react
```
configure({enforceActions: 'observed'})用于限制被observable(也就是store中添加了@observable)的数据的修改方式，让其只能添加了@action的函数中进行修改。

19. 集成svg-component
```bash
yarn add @svgr/webpack --dev
```
按照官方教程配置即可。另外如果ts报错，新建相应的d.ts的文件即可


20.打包与分离

css
```bash
只支持webpack4
 yarn add mini-css-extract-plugin --dev
```
在html-webpack-plugin
加载当前页面需要构建的js文件。
通常来说，我们会根据react-router分的页面来进行代码分离，再用react-loadable进行分割出来的代码的异步加载(当然你也可以将所有组件都进行代码分离然后异步加载)。
所以在这里我们先利用react-router分两个页面home和page出来
```bash

yarn add -D react-router-dom
```
optimization配置...
```bash
yarn add -D uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin
```
不再使用ts-lint, 因为根据ts的说法，ts-lint的存在性能问题，所以将全力支援es-lint（难受），所以，这里重新配置lint工具
eslint：javascript代码检测工具，使用espree解析器
@typescript-eslint/parser：将 TypeScript 转换为 ESTree，使 eslint 可以识别
@typescript-eslint/eslint-plugin：只是一个可以打开或关闭的规则列表
prettier：prettier插件的核心代码
eslint-config-prettier：解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
eslint-plugin-prettier：将prettier作为ESLint规范来使用

作者：yuxiaoliang
链接：https://juejin.im/post/5d1d5fe96fb9a07eaf2bae29
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

添加react支持 使用airbnb的规则
yarn add -D eslint-config-airbnb@latest eslint-plugin-import@^2.18.2 eslint-plugin-jsx-a11y@^6.2.3 eslint-plugin-react@^7.14.3 eslint-plugin-react-hooks@^1.7.0

结合prettier 和eslint
yarn add -D  prettier eslint-config-prettier eslint-plugin-prettier

在vscode中使用prettier插件
http://eslint.cn/docs/rules/
https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin  rules配置
https://prettier.io/docs/en/configuration.html

```
```bash
yarn add -D 
stylelint  stylelint-config-standard 
stylelint-less
```

```bash
yarn add -D husky
```
安装 EditorConfig 对应的编辑器插件， 并且建立相应的配置文件


electron配置

安裝electron
```bash 
yarn add electron -D
```

electron 調試工具
```bash
yarn add electron-devtools-installer -D
```

electron 構建工具
```bash
yarn add electron-builder -D
```

这回事我们运行yarn run dev会报错，这是因为我们的环境是web，
但实际上electron 拥有node和browser两个环境，webpack的配置有同样有两个对应的配置electron-render 和electron-main
但我们的配置文件只能有一份，electron-vue的做法给了我很大的启发，
首先：
```bash
// 跨平台命令
yarn add -D cross-env

//
// 命令行文字， 删除库， 命令行高亮， 多cli并行处理
yarn add -D cfonts del chalk multispinner
```


