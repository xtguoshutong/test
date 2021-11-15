import Vue from 'vue'
import App from './App.vue'
import router from './rooter/index.js'
import Fastclick from 'fastclick'
import VueLazyLoad  from 'vue-lazyload'
import mapBoxGl from 'mapbox-gl'
import store from './store'
import '@/assets/font/iconfont.css'
Vue.prototype.$mapboxgl = mapBoxGl

Vue.prototype.$bus = new Vue()//给事件总线对象原型赋值

// 解决移动端300毫秒的延时
Fastclick.attach(document.body)
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
