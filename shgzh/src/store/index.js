import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import productOrder from './modules/productOrder'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    productOrder
  },
  getters
})

export default store
