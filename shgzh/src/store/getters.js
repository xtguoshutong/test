const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menu: state => state.user.menu,
  leftMenu: state => state.user.leftMenu,
  theme: state => state.settings.theme,
  regionData: state => state.common.regionData,
  imageSourceIds: state => state.productOrder.imageSourceIds,
  queryType: state => state.productOrder.queryType
}
export default getters
