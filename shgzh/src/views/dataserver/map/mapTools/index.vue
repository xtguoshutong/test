<!--
* @Descripttion :二维地图的空间查询工具
* @Author: 张玉兰
* @Date:
* @LastEditTime :
* @地图框架:mapbox
-->
<template>
  <div class="toolPage" :style="{right:flexFlag+'px'}">
    <div class="mapNav_left">
      <div class="alltools">
        <el-tooltip content="恢复初始" placement="left">
          <div class="map_btns" @click="hardInitClick()">
            <img src="@/assets/image/maptools/homePage.png" alt>
          </div>
        </el-tooltip>
        <el-tooltip content="放大" placement="left">
          <div class="map_btns" @click="hardPlusClick()">
            <img src="@/assets/image/maptools/boost.png" alt>
          </div>
        </el-tooltip>
        <el-tooltip content="缩小" placement="left">
          <div class="map_btns" @click="hardMinusClick()">
            <img src="@/assets/image/maptools/narrow.png" alt>
          </div>
        </el-tooltip>
      </div>
      <!-- 空间查询 -->
      <!-- <div class="queryBox">
        <el-tooltip content="圈选" placement="left">
          <div class="map_btns btnquery" @click.stop="roundElection">
            <div
              :class="
                seletorActive == '1'
                  ? 'mapSelectorImg_box seletorActive'
                  : 'mapSelectorImg_box'
              "
            >
              <img
                src="@/assets/image/maptools/point_w2.png"
                style="width:18px;height:18px;"
                alt
                title="鼠标左键在地图上拖拽画圆"
              >
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="框选" placement="left">
          <div class="map_btns btnquery" @click="rectangleChoose">
            <div
              :class="
                seletorActive == '2'
                  ? 'mapSelectorImg_box seletorActive'
                  : 'mapSelectorImg_box'
              "
            >
              <img
                src="@/assets/image/maptools/triangle_w2.png"
                style="width:18px;height:18px;"
                alt
                title="鼠标左键在地图上拖拽画矩形"
              >
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="多边形选" placement="left">
          <div class="map_btns btnquery" @click="polygonChoose">
            <div
              :class="
                seletorActive == '3'
                  ? 'mapSelectorImg_box seletorActive'
                  : 'mapSelectorImg_box'
              "
            >
              <img
                src="@/assets/image/maptools/polygon_w2.png"
                style="width:18px;height:18px;"
                alt
                title="鼠标左键在地图上拖拽画多边形"
              >
            </div>
          </div>
        </el-tooltip>
        <el-tooltip content="清除" placement="left">
          <div class="map_btns btnquery" @click="hardClearMap">
            <img src="@/assets/image/maptools/clear.png" alt>
          </div>
        </el-tooltip>
      </div> -->

    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    mapobj: {
      type: Object,
      default: function() {
        return 'hello'
      }
    }
  },
  data() {
    return {
      flexFlag: 20,
      flag: true,
      outLineIds: [],
      imageSourceIds: [],
      mapLayerid: [],
      seletorActive: '',
      pointDataStr: ''
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    console.log('工具组件获取数据', this.mapqueryList)
    setTimeout(() => {
      console.log('地图的图层数据', this.mapobj.getStyle())
    }, 300)
  },
  methods: {
    flexMapToolsFn(flag) {
      this.flexFlag = flag
    },
    hardInitClick() {
      // 恢复初始状态
      this.mapobj.flyTo({
        center: [102, 37.94],
        zoom: 2.99998
      })
    },
    hardPlusClick() {
      // 放大
      this.mapobj.zoomIn()
    },
    hardMinusClick() {
      // 缩小
      this.mapobj.zoomOut()
    },
    hardClearMap() {
      this.clearLayer('buffer')
    },
    clearLayer(layerId) {
      // 清除图层
      if (this.mapobj.getLayer(layerId)) {
        this.mapobj.removeLayer(layerId)
      }
      if (this.mapobj.getSource(layerId)) {
        this.mapobj.removeSource(layerId)
      }
    },
    refreashResultfn() {
      this.$parent.refreashFn()
    },
    roundElection() {
      // 圆选
      this.switchQTypeToSpace()
      const _this = this
      this.seletorActive = '1'
      var startPoint, endPoint, buffered, distance
      var canvas = this.mapobj.getCanvasContainer()
      function onMove(e) {
        canvas.style.cursor = 'crosshair'
        endPoint = turf.point(e.lngLat.toArray())
        distance = turf.distance(startPoint, endPoint, { units: 'kilometers' })
        buffered = turf.circle(startPoint, distance, { units: 'kilometers' })
        _this.mapobj
          .getSource('buffer')
          .setData(buffered)
      }
      function onUp(e) {
        canvas.style.cursor = ''
        // Unbind mouse/touch events
        _this.mapobj.off('mousemove', onMove)
        _this.mapobj.off('mousedown', onDown)
        _this.seletorActive = ''
        endPoint = turf.point(e.lngLat.toArray())
        distance = turf.distance(startPoint, endPoint, { units: 'kilometers' })
        buffered = turf.circle(startPoint, distance, { units: 'kilometers' })
        // 获取区域经纬度拼接
        _this.pointDataStr = ''
        buffered.geometry.coordinates[0].map((v, i) => {
          if (i < buffered.geometry.coordinates[0].length - 1) {
            _this.pointDataStr += v[0] + ' ' + v[1] + ','
          } else {
            _this.pointDataStr += v[0] + ' ' + v[1]
          }
        })
        // if (_this.pointDataStr != "") {
        _this.qTypeFlag = 1
        _this.tranferWkt()
        // }

        // 调取空间查询接口
      }
      function onDown(e) {
        this.collpseTableData = []
        canvas.style.cursor = 'crosshair'
        e.preventDefault()
        startPoint = turf.point(e.lngLat.toArray())
        buffered = turf.circle(startPoint, 0.1, { units: 'kilometers' })
        if (!_this.mapobj.getLayer('buffer')) {
          _this.mapobj.addLayer({
            id: 'buffer',
            type: 'line',
            source: {
              type: 'geojson',
              data: buffered
            },
            layout: {},
            paint: {
              // "fill-color": "transparent",
              // "fill-outline-color": "red",
              'line-color': '#ff0000',
              'line-width': 2
            }
          })
        } else {
          _this.mapobj
            .getSource('buffer')
            .setData(buffered)
        }
        // _this.$store.dispatch('dataQueryFenJing/updatePublicklayerid', 'buffer')
        _this.mapobj.on('mousemove', onMove)
        _this.mapobj.once('mouseup', onUp)
      }
      this.mapobj.on('mousedown', onDown)
      canvas.style.cursor = 'crosshair'
    },
    rectangleChoose() {
      // 空间查询框选
      this.switchQTypeToSpace()
      const _this = this
      this.seletorActive = '2'
      this.clearLayer('buffer')
      // this.clearLayer('lineK')
      // this.clearLayer('uploadLayerId')
      // this.refreashResultfn()
      // this.clearLayer('overlay')
      var startRec, leftBottom, rightTop, endRec, rectangle
      var canvas = this.mapobj.getCanvasContainer()
      function onMove(e) {
        canvas.style.cursor = 'crosshair'
        endRec = turf.point(e.lngLat.toArray()).geometry.coordinates
        leftBottom = [startRec[0], endRec[1]]
        rightTop = [endRec[0], startRec[1]]
        rectangle = turf.polygon([
          [startRec, rightTop, endRec, leftBottom, startRec]
        ])
        _this.mapobj
          .getSource('buffer')
          .setData(rectangle)
      }
      function onUp(e) {
        canvas.style.cursor = ''
        _this.mapobj.off('mousemove', onMove)
        _this.mapobj.off('mousedown', onDown)
        _this.seletorActive = ''
        _this.pointDataStr = ''
        // 获取区域经纬度拼接
        rectangle.geometry.coordinates[0].map((v, i) => {
          if (i < rectangle.geometry.coordinates[0].length - 1) {
            _this.pointDataStr += v[0] + ' ' + v[1] + ','
          } else {
            _this.pointDataStr += v[0] + ' ' + v[1]
          }
        })

        _this.qTypeFlag = 1
        _this.tranferWkt()
        // 调取空间查询接口
      }
      function onDown(e) {
        this.collpseTableData = []
        canvas.style.cursor = 'crosshair'
        e.preventDefault()
        startRec = turf.point(e.lngLat.toArray()).geometry.coordinates
        endRec = turf.point(e.lngLat.toArray()).geometry.coordinates
        leftBottom = [startRec[0], endRec[1]]
        rightTop = [endRec[0], startRec[1]]
        rectangle = turf.polygon([
          [startRec, rightTop, endRec, leftBottom, startRec]
        ])
        if (!_this.mapobj.getLayer('buffer')) {
          _this.mapobj.addLayer({
            id: 'buffer',
            type: 'line',
            source: {
              type: 'geojson',
              data: rectangle
            },
            layout: {},
            paint: {
              // "fill-color": "transparent",
              // "fill-outline-color": "red",
              'line-color': '#ff0000',
              'line-width': 2
            }
          })
        } else {
          _this.mapobj
            .getSource('buffer')
            .setData(rectangle)
        }
        // _this.$store.dispatch('dataQueryFenJing/updatePublicklayerid', 'buffer')
        _this.mapobj.on('mousemove', onMove)
        _this.mapobj.once('mouseup', onUp)
      }
      this.mapobj.on('mousedown', onDown)
      canvas.style.cursor = 'crosshair'
    },
    polygonChoose() {
      // 多边形空间选择
      this.switchQTypeToSpace()
      const _this = this
      this.seletorActive = '3'
      this.clearLayer('buffer')
      // this.clearLayer('lineK')
      // this.clearLayer('overlay')
      // this.clearLayer('uploadLayerId')
      // this.refreashResultfn()
      var line, polygon
      var theArr = []
      var canvas = this.mapobj.getCanvasContainer()
      function ondblclick(e) {
        _this.mapobj.removeLayer('polygonLine')
        _this.mapobj.removeSource('polygonLine')
        _this.mapobj.off('mousemove', onMove)
        _this.mapobj.off('click', onDown)
        canvas.style.cursor = ''
        _this.seletorActive = ''
        theArr = []
        _this.pointDataStr = ''
        // 获取区域经纬度拼接
        const coordinatesData = polygon.geometry.coordinates[0] || []
        let beforeCoordinate = []
        const dataLength = coordinatesData.length || 0
        for (let i = 0; i < dataLength; i++) {
          const data = coordinatesData[i]
          if (
            data[0] == beforeCoordinate[0] &&
                  data[1] == beforeCoordinate[1]
          ) {
            // 去重
            continue
          } else {
            beforeCoordinate = data
            if (i < dataLength - 1) {
              _this.pointDataStr += data[0] + ' ' + data[1] + ','
            } else {
              _this.pointDataStr += data[0] + ' ' + data[1]
            }
          }
        }
        // 调取空间查询接口
        _this.qTypeFlag = 1
        _this.tranferWkt()
      }
      function onMove(e) {
        canvas.style.cursor = 'crosshair'
        theArr[theArr.length - 1] = e.lngLat.toArray()
        line = turf.lineString(theArr)
        console.log(theArr)
        _this.mapobj
          .getSource('polygonLine')
          .setData(line)
      }
      function onDown(e) {
        // 生成面的坐标
        if (theArr.length >= 2) {
          theArr.splice(theArr.length - 1, 0, e.lngLat.toArray())
        } else {
          theArr.push(e.lngLat.toArray())
          theArr.push(e.lngLat.toArray())
        }
        line = turf.lineString(theArr)
        // 绘制线
        if (!_this.mapobj.getLayer('polygonLine')) {
          _this.mapobj.addLayer({
            id: 'polygonLine',
            type: 'line',
            source: {
              type: 'geojson',
              data: line
            },
            layout: {},
            paint: {
              'line-color': 'red',
              'line-width': 2
            }
          })
        } else {
          _this.mapobj
            .getSource('polygonLine')
            .setData(line)
        }
        // 绘制面
        if (theArr.length > 3) {
          polygon = turf.lineToPolygon(line)
          if (!_this.mapobj.getLayer('buffer')) {
            _this.mapobj.addLayer({
              id: 'buffer',
              type: 'line',
              source: {
                type: 'geojson',
                data: polygon
              },
              layout: {},
              paint: {
                // "fill-color": "transparent",
                // "fill-outline-color": "red",
                'line-color': '#ff0000',
                'line-width': 2
              }
            })
          } else {
            _this.mapobj
              .getSource('buffer')
              .setData(polygon)
          }
        }
        // _this.$store.dispatch('dataQueryFenJing/updatePublicklayerid', 'buffer')
        _this.mapobj.on('mousemove', onMove)
        _this.mapobj.once('dblclick', ondblclick)
      }
      this.mapobj.on('click', onDown)
      canvas.style.cursor = 'crosshair'
    },
    switchQTypeToSpace() {
      this.qTypeFlag = 1
      this.$store.dispatch('productOrder/changeActiveType', 'regionType4')
      // this.currWkt = 'POLYGON ((' + this.pointDataStr + '))'
    },
    tranferWkt() {
      if (this.pointDataStr !== '') {
        const points = this.pointDataStr
        const arr1 = points.split(',')
        const resArr = []
        arr1.map(v => {
          const arrS = [Number(v.split(' ')[0]), Number(v.split(' ')[1])]
          resArr.push(arrS)
        })
        this.pointDataStr = {
          coordinates: [resArr],
          type: 'Polygon'
        }
        this.$emit('sendPrams', this.pointDataStr)
        console.log('🚀 😊 file: index.vue 😊 line 443 😊 tranferWkt 😊 this.pointDataStr', this.pointDataStr)

        // this.currWkt = 'POLYGON ((' + this.pointDataStr + '))'
        // this.$parent.QuerySearchFn()
      }
      // 重新触发结果组件中的列表方法
      // this.$parent.handelParentfn()
    }
  }
}
</script>
<style lang='scss' scoped >
/* @import url(); 引入css类 */
.toolPage{
  position: absolute;
  top: 110px;
  left: 320px;
  z-index: 999;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.toolPageHidden{
  position: absolute;
  top: 20px;
  // right: 20px;
  z-index: 999;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.mapNav_left{
  width: 50px;
  padding: 10px 0px;
  border-radius: 50px;
  text-align: center;
  // background: rgba($color: #000000, $alpha: 0.5);
  .map_btns,.btnquery{
      cursor: pointer;
      display: inline-block;
      // padding: 4px;
      border-radius: 50%;
      -webkit-transition: all 300ms ease-in;
      transition: all 300ms ease-in;
      border: 1px solid #fff !important;
      background: #ffffff;
      margin-right: 15px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 20px;
        height: 20px;
      }
   }
   .map_btns{
     margin-bottom: 4px;
   }
   .btnquery{
     img{
        width: 20px;
        height: 20px;
      }
   }
   .map_btns_active{
     background: #333333;
   }
   .mapSelector{
      background: yellowgreen;
    }
    .seletorActive {
        // background: red;
    }
  .alltools{
    margin-left: 5px;
    margin-bottom: 20px;
  }
  .queryBox{
    margin-left: 5px;
    border-radius: 50px;
    .btnquery{
      width: 40px;
      height: 40px;
      border: 1px solid #eeeeee !important;
    }
  }
}
</style>
