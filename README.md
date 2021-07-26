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
offsetY: 50,  // 纵向滚动条上下间距 数字 | 带单位的字符串 ('10%' | '5rem')
className: '', // 自定义类名 方便对单个滚动条更改样式
autoHide: true, // 是否在鼠标静止后 自动隐藏滚动条
autoHideDelay: 5000, // 鼠标静止后 多久隐藏滚动条
})
```

```vue
import ScrollBar from './index'
Vue.use(ScrollBar)

<div v-scrollbar="{ xy: 'xy', offsetY: 100, offsetX: 50 }">
</div>
```

## 样式

参照scrollbar.css修改全局样式 或者使用className修改单个滚动条的样式

```css
.x-scroll-bar-x {
  position: absolute;
  left: 0;
  bottom: 20px;
  height: 10px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(50, 50, 50, 0.2);
}

.x-scroll-bar-x .bar-plant {
  position: absolute;
  left: 0;
  top: 20%;
  height: 60%;
  width: 150px;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(10, 10, 10, 0.5);
}

.x-scroll-bar-y {
  position: absolute;
  right: 20px;
  top: 0;
  height: 100%;
  width: 10px;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(150, 150, 150, 0.3);
}

.x-scroll-bar-y .bar-plant {
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  left: 20%;
  top: 0;
  width: 60%;
  height: 150px;
  background: rgba(10, 10, 10, 0.5);
}

.x-scroll-bar-x:hover, .x-scroll-bar-y:hover {
  opacity: 1.0;
}

.x-scroll-bar-x.x-scroll-dragging, .x-scroll-bar-y.x-scroll-dragging {
  opacity: 1;
}

.x-scroll-bar-x.x-scroll-hide, .x-scroll-bar-y.x-scroll-hide {
  opacity: 0;
}

.x-scroll-bar-x, .x-scroll-bar-y {
  opacity: 1.0;
  transition: opacity 0.5s;
  z-index: 2000;
}
```

