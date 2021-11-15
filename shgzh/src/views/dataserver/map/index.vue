<template>
  <div>
    <MapTools ref="mapTools" :mapobj="map" @sendPrams="getQueryParam" />
    <div id="map" class="map-section" />
  </div>
</template>

<script>
import MapTools from './mapTools/index.vue'
import AddThingToMap from './addImageToMap.js'
export default {
  components: {
    MapTools
  },
  mixins: [AddThingToMap],
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    flexMaptoolfn(flag) {
      this.$refs.mapTools.flexMapToolsFn(flag)
    },
    // 初始化地图
    initMap() {
      const localhost = window.location.origin
      const sources = {
        'osm-tiles1': {
          'type': 'raster',
          'tiles': [
            'http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=74c254cb893a9b641012734e581e1039'
          ],
          'tileSize': 256
        },
        'osm-tiles2': {
          'type': 'raster',
          'tiles': [
            'http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=74c254cb893a9b641012734e581e1039'
          ],
          'tileSize': 256
        }
      }
      const layers = [
        {
          'id': 'simple-tiles1',
          'type': 'raster',
          'source': 'osm-tiles1'
        },
        {
          'id': 'simple-tiles2',
          'type': 'raster',
          'source': 'osm-tiles2'
        }
      ]
      this.map = new this.$mapboxgl.Map({
        container: 'map',
        style: {
          'version': 8,
          'sprite': localhost + '/MapBoxGL/css/sprite',
          'glyphs': localhost + '/MapBoxGL/css/font/{fontstack}/{range}.pbf',
          'sources': sources,
          'layers': layers
        },
        center: [117.110805, 36.663046],
        zoom: 4
      })
    },
    // 添加geojson文件
    drawAreaBorderRange(geoJson) {
      this.addBorderRange(this.map, geoJson)
    },
    // 绘制行政边界
    drawAreaBorder(coordinates, mapType) {
      this.addBorderLine(this.map, coordinates, 'areaBorder', mapType)
    },
    // 绘制快试图边界
    drawImageBorder(coordinates) {
      this.addBorderLine(this.map, coordinates, 'currentPageQuareBorder')
    },
    // 绘制mouseover高亮边界
    drawHoverBoder(coordinates) {
      this.addBorderLine(this.map, coordinates, 'hoverBorder')
    },
    // 添加快试图
    addSmallImage(row) {
      const code = '(' +
                    row.leftTop.split(',')[0] + ' ' + row.leftTop.split(',')[1] + ',' +
                    row.rightTop.split(',')[0] + ' ' + row.rightTop.split(',')[1] + ',' +
                    row.rightBottom.split(',')[0] + ' ' + row.rightBottom.split(',')[1] + ',' +
                    row.leftBottom.split(',')[0] + ' ' + row.leftBottom.split(',')[1] + ',' +
                    row.leftTop.split(',')[0] + ' ' + row.leftTop.split(',')[1] +
                  ')'
      var geom = 'POLYGON(' + code + ')'
      this.addImageToMap(this.map, geom, row.browseImage, row.dataId)
    },
    // 清除快试图
    clearLayerFn(id) {
      this.clearLayer(this.map, id)
    },
    // 清除区域边界
    clearBorderFn() {
      this.map.getLayer('areaBorder') ? this.map.removeLayer('areaBorder') : ''
    },
    // 清除hover高亮边界
    clearQuareHightFn() {
      this.map.getLayer('hoverBorder') ? this.map.removeLayer('hoverBorder') : ''
    },
    // 获取边界数据
    getQueryParam(prams) {
      this.$emit('sendQueryParam', prams)
    },
    // 你要飞的位置
    flyTo(lon, lat, level) {
      let zoom = 4
      if (level === 1) {
        // 国家
        zoom = 4
      } else if (level === 2) {
        // 省
        zoom = 5
      } else if (level === 3) {
        // 市
        zoom = 7
      } else if (level === 4) {
        // 县
        zoom = 9
      }
      this.map.flyTo({
        center: [lon, lat],
        zoom: zoom
      })
    }
  }
}
</script>
<style>
.mapboxgl-canvas{
    outline: none !important;
  }
</style>
<style lang="scss" scoped>
.map-section{
  width: 100%;
  height: 100vh;
}

</style>
