// 添加影像图
import WKTToGeoJson from '@/utils/WKTToGeoJson'
export default {
  methods: {
    addImageToMap(mapobj, geom, imagePath, layerId) {
      console.log('🚀 😊 file: addImageToMap.js 😊 line 6 😊 addImageToMap 😊 mapobj, geom, imagePath, layerId', mapobj, geom, imagePath, layerId)
      const id = layerId
      const newCoordinates = WKTToGeoJson(geom)
      const numCoordinate = newCoordinates.coordinates[0].slice(0, 4)
      numCoordinate.map((v) => {
        if (v) {
          v[0] = Number(v[0])
          v[1] = Number(v[1])
        }
      })
      mapobj.addLayer({
        id,
        source: {
          type: 'image',
          url: imagePath,
          coordinates: numCoordinate
        },
        type: 'raster',
        paint: { 'raster-opacity': 0.85 }
      })
      this.$store.dispatch('productOrder/changeImageSourceIds', this.$store.state.productOrder.imageSourceIds.concat(layerId))
      //    地图缩放至当前范围
      var bounds = numCoordinate.reduce(function(bounds, coord) {
        /* reduce语法：array1.reduce(callbackfn[, initialValue])
        callbackfn语法：function callbackfn(previousValue, currentValue, currentIndex, array1)，这里整个语句的含义是以坐标0为初始值，边界逐渐扩展边界到最后一个坐标 */
        return bounds.extend(coord) /* extend  (obj):包含给定的经纬度或者经纬度边界来扩展区域边界 */
      }, new this.$mapboxgl.LngLatBounds(numCoordinate[0], numCoordinate[0]))
      /* new LngLatBounds(sw: [LngLatLike], ne: [LngLatLike]):创建LngLatBounds的构造器，LngLatBounds对象表示一个地理上有界限的区域，使用西南和东北的点的经纬坐标表示  */
      mapobj.fitBounds(bounds, { /* fitBounds(bounds,[options],[eventData])：移动缩放地图来将某个可视化区域包含在指定的地理边界内部，最终也会使用最高的zoomlevel来显示可视化区域试图  */
        padding: 100
      })
    },
    // 添加图层的边界
    addBorderLine(mapobj, coordinates, type, mapType) {
      // coordinates数据样本: [[[109.166, 36.4936],[109.558, 36.4178]]]
      let defaultId = ''
      let myType = 'Polygon'
      let paint = {
        'line-color': 'red',
        'line-width': 2
      }
      if (type === 'areaBorder') { // 添加行政区域边界
        this.clearLayer(mapobj, 'areaBorder')
        defaultId = 'areaBorder'
        paint = {
          'line-color': 'red',
          'line-width': 2
        }
        myType = mapType
      }
      if (type === 'currentPageQuareBorder') { // 添加快试图边界
        this.clearLayer(mapobj, 'currentPageQuareBorder')
        defaultId = 'currentPageQuareBorder'
        paint = {
          'line-color': '#5751E9',
          'line-width': 2
        }
      }
      if (type === 'hoverBorder') { // hover边界
        this.clearLayer(mapobj, 'hoverBorder')
        defaultId = 'hoverBorder'
        paint = {
          'line-color': '#FFFF00',
          'line-width': 2
        }
      }
      mapobj.addLayer({
        id: defaultId,
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: myType,
                  coordinates: coordinates
                }
              }
            ]
          }
        },
        layout: {},
        paint: paint
      })
    },
    // 添加图层的边界
    addBorderRange(mapobj, geoJson) {
      this.clearLayer(mapobj, 'borderRange')
      const paint = {
        'line-color': 'red',
        'line-width': 2
      }
      mapobj.addLayer({
        id: 'borderRange',
        type: 'line',
        source: {
          type: 'geojson',
          data: geoJson
        },
        layout: {},
        paint: paint
      })
    },
    // 清除图层
    clearLayer(mapobj, layerId) {
      mapobj.getLayer(layerId) ? mapobj.removeLayer(layerId) : ''
      mapobj.getSource(layerId) ? mapobj.removeSource(layerId) : ''
    }
  }
}
