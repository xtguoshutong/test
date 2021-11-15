<template>
  <div id="app">
    <main-tabbr />
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import MainTabbr from './components/content/mainTabber/Maintabbar.vue'
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
export default {
  name: 'App',
  components: {
    MainTabbr
  }
}
</script>
<style>
.van-radio__icon {
  height: 10px;
}
.van-radio__icon .van-icon {
  height: 10px;
  width: 10px;
}
.van-radio {
  padding: 0 13px;
}
</style>
