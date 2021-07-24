import { XScrollBar } from "./scrollbar"
import scrollbar from './scrollbar'

const install = function (Vue) {
  Vue.directive('scrollbar', scrollbar)
}

if (window.Vue) {
  window['scrollbar'] = scrollbar
  window.Vue.use(install)
}

scrollbar.install = install
export default scrollbar
export { XScrollBar }
