import {request}  from './request.js';

export function getAreaData(params) {
  return request({
    url: '/api/product/Area/getList',
    method: 'get',
    params,
    Headers:{'Access-Control-Allow-Origin':'*'}
  })
  
}

// 行政代码转Geojson
export function codeToGeojson(params) {
  return request({
    url: '/api/product/Area/getGeomByCode',
    method: 'get',
    params
  })
}

// 传感器数据信息
export function getSatellitesData(params) {
  return request({
    url: '/api/product/ProductInfo/QueryByGsdSate',
    method: 'get',
    params
  })
}
// 查询结果
export function searchResultList_YGYX(params, userId) {
  return request({
    url: '/api/product/ProductInfo/weChat/QueryImage',
    method: 'post',
    data: params
  })
}
// https://121.36.19.255:32010/api/product/ProductInfo/weChat/QueryImage 