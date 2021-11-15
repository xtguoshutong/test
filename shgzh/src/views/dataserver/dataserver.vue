<template>
    <div class="DataServe">
      <div>
            <Map v-if="mapFlag" ref="normalMap" @sendQueryParam="getQueryParam" />
      </div>
      <!-- 搜索框 -->
        <div  class="serach">
          <van-icon class="img1" @click="serachClick"  name="search" />
          <van-icon class="img2"  name="bars" @click="resultClick" />
        </div>
        <!-- 二维地图 -->

        <div>
        </div>
        <!-- 弹出框 -->
        <div class="vanpopup">
          <van-popup v-model="show" position="top" 
          :style="{ height: '93%', width:'80%'}" > 
         <div class="vanpopupSerach">
           <van-search  background="#636464" v-model="resultvalue" placeholder="请输入搜索关键词" />
        </div>
        <div class="radio-control">
            <van-radio-group v-model="radio" direction="horizontal">
                <!-- <van-radio @click="xingxzhengclick"  name="1">行政区</van-radio> -->

                <!-- <van-radio @click="jingweiclick" name="2">经纬度</van-radio> -->
                <!-- <van-radio name="3">范围</van-radio> -->
                <!-- <van-radio @click="dimingclick" name="4">地名</van-radio> -->
            </van-radio-group>
        </div>
        <!-- 中间切换区域  行政区-->
      <div class="contents-nav" v-show="xingzheng">
          <div class="contents">
            <div class="content" >
                国家/地区:
             </div>
        <div class="menu">
           <van-dropdown-menu>
           <van-dropdown-item v-model="guojiavalue" :options="guojiaoptions" @change="countryChange"/>
          </van-dropdown-menu>
        </div>
         </div>
         <div class="contents">
            <div class="content" >
               省/市/自治区:
             </div>
          <div class="menu">
           <van-dropdown-menu>
           <van-dropdown-item v-model="provicevalue" @change="proviceChange" :options="proviceoption" />
          </van-dropdown-menu>
        </div>
         </div>
         <div class="contents">
            <div class="content" >
                地级市/州/盟:
             </div>
          <div class="menu">
           <van-dropdown-menu>
           <van-dropdown-item v-model="cityvalue" :options="cityoption" @change="cityChange"/>
          </van-dropdown-menu>
        </div>
         </div>
         <div class="contents">
            <div class="content" >
                区/县级市/县:
             </div>
          <div class="menu">
           <van-dropdown-menu>
           <van-dropdown-item v-model="townvalue" @change="townChange":options="townoption" />
          </van-dropdown-menu>
        </div>
         </div>
      </div>
<!-- 经纬度 -->
     <div v-show="jingweishow" class="jingwei">
        <div class="jingweiD">
        <div class="jingweiD">
            <div class="jingweiDcontent">左上经度：</div>
            <div class="jingweisize"><van-field  v-model="navValue" /></div>
        </div>
        <div  class="jingweiD">
            <div class="jingweiDcontent">左上经度：</div>
            <div class="jingweisize"><van-field  v-model="navValue" /></div>
        </div>

      </div>
      <div class="jingweiD">
        <div class="jingweiD">
            <div class="jingweiDcontent">左上经度：</div>
            <div class="jingweisize"><van-field  v-model="navValue" /></div>
        </div>
        <div  class="jingweiD">
            <div class="jingweiDcontent">左上经度：</div>
            <div class="jingweisize"><van-field  v-model="navValue" /></div>
        </div>
     </div>
      </div>
    <!-- 地名 -->
      <div  v-show="DiQushow" class="contents-nav">
          <div class="contents">
            <div class="content" >
                地区名称:
             </div>
             <van-field  v-model="diquValue"  />
         </div>
      </div>
       <!--底部固定部分 -->
       <div>
         <div class="datatime">
           <span>时间</span>
            <van-divider/>
            <div class="contents">
                 <div class="content" >
               采集时间:
             </div>
              <van-cell :value="date" class="contentcell" @click="showData = true" />
                <van-calendar v-model="showData" type="range" @confirm="onConfirm" :show-confirm="false"/>
            </div>
           
         </div>
         <div class="datatime">
           <span>云量</span>
            <van-divider/>
            <div class="fixbuttom">
              <van-slider class="fixVSilider" v-model="cloud.on"/>
              <div class="fixVSField">
                <van-field class="fixVSFieldO" v-model="cloud.off"></van-field>
                 <van-field class="fixVSFieldO" v-model="cloud.on" ></van-field>
              </div>
            </div>
         </div>

         <!-- 产品级别 -->
         <div class="datatime">
           <span>产品级别</span>
            <van-divider/>
              <div class="content" >
              </div>
              <div class="datatimecontent">
                    <van-dropdown-menu >
                      <van-dropdown-item v-model="feildvalue" 
                      is-edit	
                      :options="chapinoption" />
                            </van-dropdown-menu>
              </div>
         </div>
         <!-- 传感器 -->
         <div class="datatime">
            <span>传感器</span>
            <van-divider/>
              <!-- <div class="compBox">
      <div v-for="(panel,index) in Totalpanels" :key="index">
        <checkBox
          :ref="'checkBox'+index"
          :panel-index="panel.sensorType"
          :panel-name="panel.sensorType"
          :content-data="panel.satelliteList"
          @currentAllcheck="allchekedfn"
        />
      </div>
    </div> -->
            <van-button class="lightbutton"  @click="checkAll">光学</van-button> 
              <div>
              <van-checkbox-group v-model="result" direction="horizontal" ref="checkboxGroup">
               <div class="GF">
                 <div class="GF1">{{sensors[0].satellite}}:</div>
                 <div class="GF1Cont">
                    <van-checkbox  name="PMS">{{sensors[0].sensor[0]}}</van-checkbox>
                    <van-checkbox  name="WFV">{{sensors[0].sensor[1]}}</van-checkbox>
                 </div>
               </div>
               <div class="GF">
                 <div class="GF1">{{sensors[1].satellite}}:</div>
                 <div class="GF1Cont">
                    <van-checkbox  name="PMS">{{sensors[1].sensor[0]}}</van-checkbox>
                    <van-checkbox  name="WFV">{{sensors[1].sensor[1]}}</van-checkbox>
                 </div>
               </div>
            </van-checkbox-group>
          </div>
            <van-divider/>
            <van-button class="lightbutton"  @click="checkAll">雷达</van-button>
             <div>
              <van-checkbox-group v-model="result2" direction="horizontal" ref="checkboxGroup2">
               <div class="GF">
                 <div class="GF1">{{sensors[2].satellite}}:</div>
                 <div class="GF1Cont">
                    <van-checkbox  name="d">{{sensors[2].sensor[0]}}</van-checkbox>
                 </div>
               </div>
            </van-checkbox-group>
          </div>
          
          
          <div class="buttom-line">
              <van-divider/>
          </div>
         </div>  
       </div>
          <!-- 查询按钮 -->
       
       <div class="vanbutton">
              <van-button  class="vanbuttonA"  @click="deletAll">取消</van-button>
         <van-button class="vanbuttonA"  @click="searchAll">查询</van-button>
       </div>
        </van-popup>
        </div>
<!-- 查询结果弹框 -->
        <div  >
           <van-popup class="resultpopup" v-model="showresult" position="top" 
          :style="{ height: '93%', width:'80%'}" > 
          <div class="resultNav">
              <div>操作</div>
              <div>卫星</div>
              <div>传感器类型</div>
              <div>传感器</div>
              <div>级别</div>
              <div>时间</div>
          </div>
          <div class="resultNavItem">
              <div class="item" v-for="item in tableData"  >
                  <div class="item0">
                    <img :src="item.thumbImage" class="smallImg" alt="贴图">
                  <i
                      :class="
                      imageSourceIds.find(chiItem => {
                        return chiItem == item.dataId;
                      })
                        ? 'iconfont icon-chakan'
                        : 'iconfont icon-yincang'
                    "
                    style="position: absolute;top: 45%;transform: translateY(-50%);margin-left: 2px"
                    @click.stop="addImageToMap(item)"
                  />
                  </div>
                  <div class="item1">{{item.satellite}}</div>
                  <div class="item2">{{item.sensorType}}</div>
                  <div class="item3">{{item.sensor}}</div>
                  <div class="item4">{{item.productLevel}}</div>
                  <div class="item5">{{item.receiveTime}}</div>
              </div>
          </div>
          </van-popup>
        </div>
    </div>
</template>
<script>
import { Col } from 'vant'
import { mapGetters } from 'vuex'
import checkBox from './checkBox'
import * as API from '../../network/productOrder.js'
import Map from './map'

export default {
  components:{
    Map,checkBox
  },
  data(){
    return{
      q:[],
      mapFlag: true, // 底图切换开关
      show:false,
      showData:false,
      showresult:false,
      resvalue:false,
      guojiavalue:'',
      provicevalue:'',
      cityvalue:'',
      townvalue:'',
      publickCode:'',
      xingzheng:true,
      jingweishow:false,
      DiQushow:false,
      feildvalue:'',
      guojiaoptions:[],
      proviceoption:[],
      chapinoption:[
        {text:'L1',value:'L1'},
        {text:'L2',value:'L2'},
        {text:'L3',value:'L3'},
        {text:'L4',value:'L4'},
        {text:'L5',value:'L5'}
      ],
      radio:'1',
      cascaderValue:'',
       value: 50,
       diquValue:'',
       navValue:0,
       resultvalue:'',
       result:[],
       result2:[],
      areaCode: {},
      countryOptions:[],
      proviceoptions:[],
      cityoption:[],
      cityoptions:[],
      townoption:[],
      townoptions:[],
      cloud:{
        off:0,
        on:20
      },
      pageNum: 1,
      pageSize: 10,
      receiveTime:{},
      geoValue:{
        coordinates:[],
        type:''
      },
      Totalpanels: [], // 存放复用组件的所有数据
        sensors:[
          {satellite: "GF1", sensor: ["PMS", "WFV"]},
          {satellite: "GF2", sensor: ["PMS", "WFV"]},
          {satellite: "GF3", sensor: ["SAR"]}],
          tableData:[],
          imageborderCoordinates:[],

    }
  },
  computed: {
    ...mapGetters(['imageSourceIds'])
  },
  created(){
    this.getSatellitesData()
  },
  mounted(){
    this.getListData()
  },
  methods:{
    // 获取数据
      getListData() {
      this.areaCode = {}
      API.getAreaData().then(res => {
        const {code,data} = res
      if(String(code)==='200'){
        this.countryOptions = data
          data.forEach(ele => {
            this.guojiaoptions.push({
                       text:ele.name,
                       value:ele.code
                     })
            this.areaCode[ele.code] = { ...ele }
          })
  }
      })
    },

     
    // 国家
    countryChange(val){
      this.publickCode = val
      // this.guojiavalue =''
      this.provicevalue = ''
      this.cityvalue = ''
      this.townvalue = ''    
      this.getProviceData(val)
      this.flyTo(val, 1)  
      this.codeToGeojsonfn(val)

    },
      getProviceData(code) {
      this.countryOptions.map(v => {
        if (String(v.code) === String(code)) {
          this.proviceoptions= v.children
          v.children.forEach(ele => {
            this.proviceoption.push({
              text:ele.name,
              value:ele.code
            })
            this.areaCode[ele.code] = { ...ele }
          })
        }
      })
    },
    // 省市
    proviceChange(val){
    this.publickCode = val
      this.cityvalue = '',
      this.townvalue = '' ,
      this.getCityData(val)
      this.flyTo(val, 2)
      this.codeToGeojsonfn(val)

    },
   getCityData(code) {
      this.proviceoptions.map(v => {
        if (String(v.code) === String(code)) {
          this.cityoptions=v.children
          v.children.forEach(ele => {
            this.cityoption.push({
               text:ele.name,
              value:ele.code
            }) 
            this.areaCode[ele.code] = { ...ele }
          })
        }
      })
    },
// 地级市
    cityChange(val){
      this.publickCode = val,
      this.townvalue = '' ,
      this.getTownData(val)
     this.flyTo(val, 3)
      this.codeToGeojsonfn(val)
    },
      getTownData(code) {
      this.cityoptions.map(v => {
        if (String(v.code) === String(code)) {
          this.townoptions = v.children
          v.children.forEach(ele => {
            this.townoption.push({
              text:ele.name,
              value:ele.code
            })
            this.areaCode[ele.code] = { ...ele }
          })
        }
      })
    },
    townChange(){
      this.publickCode = val
      this.flyTo(val, 4)
      this.codeToGeojsonfn(val)
    },
    // 行政code转换成Geojson(选中位置时会在地图上圈出来)
    codeToGeojsonfn(code) {
      console.log('行政区域代码', code)
      const param = {
        regionCode: String(this.publickCode)
      }
      API.codeToGeojson(param).then(res => {
        const { code, data } = res
        if (String(code) === '200') {
          this.publickGeoJson = data
        }
      const mydata = JSON.parse(this.publickGeoJson)
         this. geoValue.coordinates = mydata.coordinates
        this.geoValue.type = mydata.type
      if (this.$refs.normalMap) this.$refs.normalMap.drawAreaBorder(mydata.coordinates, mydata.type)
      })
    },

    // 根据经纬度定位地图
     flyTo(val,level) {
      const lon = this.areaCode[val].longitude
      const lat = this.areaCode[val].latitude
       const coordinate = JSON.stringify({lon: lon, lat: lat,level: level})
     const  mydata = JSON.parse(coordinate)
      const lonA = parseFloat(mydata.lon)
     const latA = parseFloat(mydata.lat)
      const levelA = parseInt(mydata.level)
     this.$refs.normalMap.flyTo(lonA, latA, levelA) 
        
    },
    // 查询结果
     searchAll(){
      this.show=false 
      this.showresult=true
     
       const params ={
         pageNum: this.pageNum,
         pageSize: this.pageSize,
          cloud: {off:2,on:1},
         receiveTime:this.receiveTime,
         geoValue:this.geoValue,
         sensors:this.sensors,
         productLevel:this.feildvalue
      }
      API.searchResultList_YGYX(params).then( res => {
            const { code, data } = res
            if(String(code)==='200'){
              this.tableData = data.data
              console.log( this.tableData)
            // const imageborderCoordinates = []
            this.tableData.map(v => {
              const everyQuare = []
              const quare1 = [
                Number(v.leftTop.split(',')[0]),
                Number(v.leftTop.split(',')[1])
              ]
              const quare2 = [
                Number(v.rightTop.split(',')[0]),
                Number(v.rightTop.split(',')[1])
              ]
              const quare3 = [
                Number(v.rightBottom.split(',')[0]),
                Number(v.rightBottom.split(',')[1])
              ]
              const quare4 = [
                Number(v.leftBottom.split(',')[0]),
                Number(v.leftBottom.split(',')[1])
              ]
              const quare5 = [
                Number(v.leftTop.split(',')[0]),
                Number(v.leftTop.split(',')[1])
              ]
              everyQuare.push(quare1, quare2, quare3, quare4, quare5)
              this.imageborderCoordinates.push(everyQuare)
                console.log(this.imageborderCoordinates)
            })
            }
          })
            this.provicevalue = ''
            this.cityvalue = ''
            this.townvalue = ''  
            this.guojiavalue= '' 
            this.date='' 

    },
    addImageToMap(row){
            console.log('点击添加快试图', row)
                  let findIndex = -1
                  this.imageSourceIds.forEach((item, index) => {
             if (item === row.dataId) {
            // 如果有对的上的话  把index
                 findIndex = index
        }
      })
       if (findIndex >= 0) {
        // 触发清除快试图
        this.$emit('clearImage', row.dataId)
        this.imageSourceIds.splice(findIndex, 1)
        this.$store.dispatch(
          'productOrder/changeImageSourceIds',
          this.imageSourceIds
        )
        return
      }
            this.$refs.normalMap.addSmallImage(row)

    },
    xingxzhengclick(){
      this.xingzheng = true,
      this.DiQushow=false,
      this.jingweishow = false
    },
    jingweiclick(){
      this.jingweishow = true,
       this.xingzheng = false,
      this.DiQushow=false
    },
    dimingclick(){
      this.DiQushow=true,
      this.jingweishow = false,
      this.xingzheng = false
    },
    deletAll(){
      this.show = false
      },
    serachClick(){
      this.show = true
    },
    //选择日期区间
     formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      const [beginDate, endDate] = date;
      this.showData = false;
       this.date = `${this.formatDate(beginDate)} - ${this.formatDate(endDate)}`;
      this.receiveTime['beginDate'] =`${this.formatDate(beginDate)}`
      this.receiveTime['endDate']=`${this.formatDate(endDate)}`
      console.log(this.receiveTime)
    },
    // 云量
    // onChange(value) {
    //   Toast('当前值：' + value);
    // },
    // 全选
    checkAll() {
      console.log(name)
      this.$refs.checkboxGroup.toggleAll(true);
    },
    // 查询结果
  
     resultClick(){
      this.showresult = true
    },
  
  }
}
</script>
<style lang="scss"  >

.DataServe{
.van-popup{
  color: rgb(189, 185, 185);
  font-size: 14px;
  overflow: auto;
  background-color: rgb(99, 100, 100);
}
.vanpopupSerach{
  background-color: rgb(82, 83, 83);
}
  .serach .img1{
    position: fixed;
    top: 50px;
    left: 9px;
    z-index: 3;
    border: 2px solid rgb(139, 139, 139);
    border-radius:6px;
    padding: 10px;
    background-color: rgb(115, 116, 116);
  }
  .img1:active{
    background-color: rgb(184, 190, 183);
  }
  .serach .img2{
    position: fixed;
    top: 50px;
    left: 326px;
    z-index: 3;
    border: 2px solid rgb(139, 139, 139);
    border-radius:6px;
    padding: 10px;
    background-color: rgb(115, 116, 116);
  }
  .radio-control{ 
     font-size: 15px;
     display: flex;
     justify-content: center;
  }
  .van-radio {
    padding: 0;
  }
  
 .contents{
   width: 100%;
   margin-top:10px ;
 }
 .content{
   display: inline-block;
   width: 28%;
   padding: 5px 0 10px 5px ;
   margin-left: 10px;
  
 }

  .van-cell{
   float: right;
   width: 60%;
   height: 30px;
  //  line-height: 19px;
   background-color: rgb(168, 168, 167);
   padding: 5px;
   margin-right:15px ;
   border-radius: 5px;
 }


 /* 设置产品级别 */
 .van-dropdown-item__option{
   margin-top: 5px ;
   width: 13%;
   margin-right: 27px;
   margin-bottom: 3px;
   text-align: center;
 }
 .van-dropdown-item__content{
   width: 80%;
 }
 .menu{
   width: 63%;
  display: inline-block;
 }
 .van-dropdown-menu__bar{
   border-radius: 5px;
   background-color: rgb(183, 187, 187);
  width: 100%;
  }
 .datatime{
  margin: 30px 20px;
 }
.vanslider-border{
  border: 1px solid black;
}
.fixVSField{
  position: relative;
  height: 40px;
    display: inline-block;
    left: 28px;
}
.fixbuttom{
  display: flex;
  align-items: center;
}
.fixVSilider{
  position: relative;
  display: inline-block;
    height: 8px;
    width: 57%;
}

.fixVSFieldO{
  width: 40px;
}

  .GF{
    display: flex;
    margin-top: 20px;
  }
 .GF1Cont{
   display:flex;
   margin-left: 90px;
 }
 .GF1{
   display: inline-block;
 }
 .vanbutton{
   width: 80%;
   position: fixed;
   bottom: 47px;
   left: 0;
  background-color: rgb(82, 83, 83);
 }
 .vanbuttonA{
   margin-left: 7px;
   padding: 5px 55px;
   background-color: rgb(183, 187, 187);
 }
 .buttom-line{
   height: 60px;
 }
 .resultpopup{
   margin-left: 75px;
   overflow: auto;
 }
 .lightbutton{
   background-color: rgb(201, 209, 209);
   height: 35px;
    border-radius: 5px;
 }
 .jingweiD{
   display: flex;
   margin-top: 10px;
   
 }
 .jingweisize{
   width: 70px;
 }

 .jingweiDcontent{
  display: inline-block;
   width: 60%;
   padding: 5px 0 10px 5px ;
   margin-left: 10px;
  
 }
 .DiQu{
   display: flex;
      margin-top: 10px;
 }
 .DiQuContent{
   display: inline-block;
   width: 20%;
   padding: 5px 0 10px 5px ;
   margin-left: 10px;
 }
.contents-nav{
  margin-top: 20px;
}
.van-field__control{
  text-align: center;
}
.van-icon-success::before{
  content: none;
}
.van-search__content{
  color: #fff;
  background-color: rgb(171, 173, 173);
}
/* 设置时间*/
.van-calendar__popup{
  background-color: rgb(101, 109, 109);
  width: 80%;
  height: 20%;
}
.van-calendar{
background-color: rgb(83, 85, 85);

color: #fff;
}
.van-calendar__popup.van-popup--bottom, .van-calendar__popup.van-popup--top{
  height: 50%;
}

.resultNav{
  display: flex;
  width: 190%;
  line-height: 10px;
  color: #fff;
  background-color: rgb(170, 169, 169);
  overflow-x: auto;
}
.resultNav div{
  margin: 10px 15px ;
  padding: 10px;
}

.van-dropdown-item__option {
  font-size: 10px;
  width: 50%;
}
}

 .van-overlay{
   width: 80%;
 }
 .resultNavItem{
   width: 165%;
   position: absolute;
   top: 60px;
   left: 20px;
 }
 .item{
   display: flex;
 }
 .item0{
   width: 30px;
   margin-top: 2px;
 }
 .item1{
   position: relative;
   left:50px;
   width: 0px;
 }
 .item2{
   width: 80px;
   position: relative;
   left: 90px;
   padding: 0 60px;
 }
 .item3{
   width: 70px;
   position: relative;
   left: 50px;

 }
 .item4{
      position: relative;
      left: 67px;
 }
 .item5{
      position: relative;
      left: 110px;
 }

 .smallImg{
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .item{
    width: 110%;
    position: relative;
    line-height: 35px;
    height: 35px;
    border-bottom: 2px  #fff solid;
  }
</style>
