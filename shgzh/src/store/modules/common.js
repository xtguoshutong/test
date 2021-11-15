// import { getRegionData } from '@/api/common'

const getDefaultState = () => {
  return {
    regionData: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_REGION_DATA: (state, data) => {
    state.regionData = data
  }
}

const actions = {
  // 获取行政区域数据
  getRegionData({ commit }, params) {
    return new Promise((resolve, reject) => {
      getRegionData(params).then(response => {
        const { code, data, message } = response
        if (String(code) === '200') {
          commit('SET_REGION_DATA', data)
        } else {
          this.$message.error(message)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

