# 智能点餐助手 App

## 技术栈

- React 全家桶

  - React 组件开发
  - React-Router-DOM
  - Zustand

- Mock 接口模拟
- axio 请求拦截和代理
- jwt 登录鉴权
- module CSS
- vite 配置
- 性能优化
  - 防抖节流
  - useCallback useMemo ...
- LLM
  - AI 生成动漫头像
  - Chat 智能饮食聊天助手

## 项目架构

- components
- pages
- stores
- hooks
- api
- mock
- utils
- llm

## 开发前的准备

- 安装的包
  react-router-dom zustand axios
  react-vant(UI 组件库) lib-flexible（移动端适配）
  mitt 发布/订阅模式
  开发期间的依赖
  vite-plugin-mock jwt

- vite 配置
  - alias
  - mock
  - .env.local
    llm apiKey
  - user-scalable
  - css 预处理
    index.css reset
    box-sizing font-family:-apply-system
    App.css 全局通用样式
    module.css 模块化样式
  - 移动端的适配 rem
    不能用 px，相对单位 rem html
    不同设备上体验要一致
    不同尺寸手机 等比例缩放
    设计师设计稿 750px iphone 4 375pt \* 2 = 750
    小米
    CSS 一行代码 手机的不同尺寸 html font-size 等比例
    layout
    flexible.js 阿里 在任何设备上
    1rem = 屏幕宽度/10
- lib-flexible
  阿里开源
  设置 html fontSize = window.
  innerWidth / 10
  css px 宽度 = 手机设备宽度 = 375
  1px = 2 发光源
  750px 设计稿

- 设计稿上一个盒子的大小？
  - 1 像素不差的还原设计稿
  - 设计稿中像素单位
  - /75

## 项目亮点

- 移动端适配

  - lib-flexible 1rem = 屏幕宽度/10
  - 设计稿 尺寸是 iphone 标准尺寸 750px
  - 频繁的单位 260/75 换算
  - 自动化
    postcss + postcss-pxtorem
    postcss 是 css 与编译器，很强大
    vite 自动读取 postcss.config.js 将 css 内容编译
    px -> rem

- 原子 css
  - App.css 里面添加了通用样式
  - 各自模块里面的 module.css 不会影响别的组件而起冲突
  - 原子类的 css
    一个元素按功能逻辑拆分成多个类，和原子一样
    元素的样式就可以由这些原子类组合而成
    样式复用的更好，以后几乎可以不用写样式
- 智能前端
  - 文生图，用用户名与个性签名来生成对应的头像
  - chat 函数
    接入 deepseek api 来接收用户的问题并智能解答，并备用更快更灵活的 KIMI chat
    - 上下文本记忆功能，用数组来保留适量（减少token的消耗）的上下文文本给予大模型参考

## 项目难点

- 智能饮食助手的输出直接一下子全出来了，没有实现**流式输出**

## 功能模块

- UI 组件库
  - react-vant 使用第三方组件库和 icons
- 配置路由及懒加载
  - Layout 组件
    - 嵌套路由 Outlet 分配路由配置
    - tabbar
    - blank
  - tabbar
    - react-vant + @react-vant/icons
    - value + onChange 响应式
- toast 组件封装
  - 需要自定义，UI 组件库不满足需求
  - UI props
  - JS 显示出来 跨层级通信
    观察者
  - mitt eventBus 事件总线
    - 实例化 mitt()
    - on(自定义事件的名字。callback)
    - emit（自定义事件的名字，参数）
      组件通过监听一个自定义事件,实现基于事件的组件通信
- chatbot 模块
  - llm 模块 chat 封装
  - 迭代 chat ， 支持任意模型

## 项目遇到过什么问题，怎么解决的

- 使用豆包文生头像图大模型时遇见 CORS 跨域限制
  使用 Vite 代理配置
- 在 chat messages 中 遇到 message 覆盖问题
  - 闭包陷阱问题
    一次事件里面，两次 setMessages()

## 通用组件开发

- Loading
  - 居中方案 position fixed + tlrb0 + margin:auto
  - React.memo 无状态的组件，不重新渲染
  - animation
