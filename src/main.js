import Vue from 'vue'
import App from './App.vue'
import ScrollBar from './index'
Vue.use(ScrollBar)

new Vue({
  el: '#app',
  render: h => h(App)
})
