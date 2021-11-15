// 产品订单
var state = {
  queryType: 'regionType1', // 查询类型（0行政区，1经纬度，2shp，3空间选）
  activeCondtionTab: '0', // 类型（查询类型0，产品制定1）
  isDingzhi: true, // 当type=4地理信息时，隐藏【产品定制的所有相关模块】
  imageSourceIds: [], // 【查询】结果下，快试图图层的id
  activeModuleType: 1// 当前激活的模块 默认为遥感影像
}

const mutations = {
  ACTIVE_TYPE: (state, queryType) => {
    state.queryType = queryType
  },
  ACTIVE_ACTIVECONDTIONTAB: (state, activeCondtionTab) => {
    state.activeCondtionTab = activeCondtionTab
  },
  ACTIVE_ISDINGZHI: (state, isDingzhi) => {
    state.isDingzhi = isDingzhi
  },
  ACTIVE_IMAGESOURCEIDS: (state, imageSourceIds) => {
    state.imageSourceIds = imageSourceIds
  },
  ACTIVE_CHANGE_ACTION_MODULE: (state, activeModuleType) => {
    state.activeModuleType = activeModuleType
  }
}

const actions = {
  changeActiveType({ commit }, data) {
    commit('ACTIVE_TYPE', data)
  },
  changeActiveCondtionTab({ commit }, data) {
    commit('ACTIVE_ACTIVECONDTIONTAB', data)
  },
  changeIsdingzhi({ commit }, data) {
    commit('ACTIVE_ISDINGZHI', data)
  },
  changeImageSourceIds({ commit }, data) {
    commit('ACTIVE_IMAGESOURCEIDS', data)
  },
  changeActiveModule({ commit }, data) {
    commit('ACTIVE_CHANGE_ACTION_MODULE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

