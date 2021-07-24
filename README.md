# js 滚动条组件

## 特性

1. 原生代码, 无引用

2. 自定义滚动条样式

3. 尽量减少对页面的侵入度, 只增加两个横竖div滚动条

4. 自动监听尺寸和内容变化, 自动响应

## 安装

```js
npm install @xpf0000/js-scrollbar
```

## 使用

```js
import { XScrollBar } from "@xpf0000/js-scrollbar";
XScrollBar(document.documentElement, {
xy: 'xy', // x | y | xy
offsetX: 30, // 横向滚动条左右间距 数字 | 带单位的字符串 ('10%' | '5rem')
offsetY: 50  // 纵向滚动条上下间距 数字 | 带单位的字符串 ('10%' | '5rem')
})
```

```vue
import ScrollBar from './index'
Vue.use(ScrollBar)

<div v-scrollbar="{ xy: 'xy', offsetY: 100, offsetX: 50 }">
</div>
```
