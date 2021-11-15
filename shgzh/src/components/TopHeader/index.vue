<template>
  <div class="header-section">
    <slot>{{ title }}</slot>
    <div class="menu-section">
      <van-icon class="icon" name="wap-nav" @click="onHandleShowMenu" />
      <van-overlay :show="isShowMenu" @click="onHandleHideMenu">
        <div class="menu-wrapper">
          <div class="block">
            <div v-for="(menu, index) in menus" :key="index" class="menu-item">
              <h1 class="title">
                {{ menu.title }}
              </h1>
              <div class="content">
                <div
                  v-for="(childMenu, childIndex) in menu.children"
                  :key="childIndex + 'child'"
                  class="item"
                  @click="gotoPage(childMenu.route)"
                >
                  {{ childMenu.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import { Icon, Overlay } from 'vant'
export default {
  name: 'TopHeader',
  components: {
    [Icon.name]: Icon,
    [Overlay.name]: Overlay
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowMenu: false,
      menus: [
        {
          title: '天气',
          children: [
            {
              title: '全州短期',
              route: 'AllCurrent'
            },
            {
              title: '市县天气',
              route: 'CityDistrictWeather'
            }
          ]
        },
        {
          title: '实况',
          children: [
            {
              title: '全州实况',
              route: 'AllScene'
            },
            {
              title: '气温图',
              route: 'AirTempreture'
            },
            {
              title: '雨量图',
              route: 'Rainfall'
            },
            {
              title: '雷达回波',
              route: 'Radar'
            },
            {
              title: '卫星云图',
              route: 'Satellite'
            }
          ]
        },
        {
          title: '疫情查询',
          children: [
            {
              title: '疫情查询',
              route: 'EpidemicSearch'
            },
            {
              title: '全国天气',
              route: 'CountryWeather'
            }
          ]
        }
      ]
    }
  },
  methods: {
    onHandleShowMenu() {
      this.isShowMenu = true
    },
    onHandleHideMenu() {
      this.isShowMenu = false
    },
    gotoPage(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style lang="less" scoped>
.header-section {
  background-color: #0b6aff;
  text-align: center;
  position: relative;
  color: #ffffff;
  padding: 12px 0;
  .menu-section {
    position: absolute;
    right: 10px;
    top: 13px;
    .icon {
      font-size: 20px;
    }
    .menu-wrapper {
      height: 100%;
    }
    .block {
      width: 100%;
      height: calc(100% - 45px);
      margin-top: 45px;
      background-color: #fff;
      .menu-item {
        padding: 10px;
        .title {
          text-align: left;
          font-size: 14px;
          color: #000000;
          padding: 10px 3px;
          border-bottom: 1px solid #dfdfdf;
        }
        .content {
          display: flex;
          font-size: 12px;
          color: #000000;
          padding: 5px;
          .item {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
