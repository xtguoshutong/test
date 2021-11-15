<!--
* @Descripttion : 卫星复选框组件
* @Author: 张玉兰
* @Date:
* @LastEditTime :
* @FilePath:
-->
<template>
  <div class="checkPage">
    <el-collapse v-model="panelIndexZK">
      <el-collapse-item :name="panelName">
        <template slot="title">
          <span class="allcheck" @click.stop.prevent="() => {}">
            <el-checkbox
              :value="checkAll"
              @click.prevent.native="handleCheckAll"
            >全选</el-checkbox>
          </span>
          {{ panelName }}
        </template>

        <div v-for="(content,index) in contentDataPage" :key="index" class="contentBox">
          <i id="index" class="contentname">{{ content.satellite }}:</i>
          <el-checkbox-group v-model="content.checkAllGroup2" @change="checkAllGroupChange">
            <el-checkbox v-for="(item,innerindex) in content.sensor" :key="innerindex" :label="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    panelIndex: {
      type: String,
      default: ''
    },
    panelName: {
      type: String,
      default: ''
    },
    indeterminate: {
      type: Boolean,
      default: true
    },
    contentData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      checkAll: false,
      contentDataPage: [],
      panelIndexZK: '0',
      arry: [],
      checkAllGroup: []
    }
  },
  watch: {
    contentData: {
      handler(arry) {
        arry.forEach((item, index) => {
          this.$set(this.contentDataPage, index, { ...item })
        })
      },
      // 这里是关键，代表递归监听 demo 的变化
      deep: true
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.contentData.forEach((item, index) => {
      this.$set(this.contentDataPage, index, { ...item })
    })
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  },
  methods: {
    getCheckedData() {
      const obj = {}
      this.contentDataPage.map(item => {
        obj[item.satellite] = item.checkAllGroup2
      })
      console.log('obj*******', obj)
      return obj
    },
    // 全选
    handleCheckAll() {
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        this.contentDataPage.map(item => {
          item.checkAllGroup2 = [...item.sensor]
        })
      } else {
        this.contentDataPage.map(item => {
          item.checkAllGroup2 = []
        })
      }
      this.$emit('currentAllcheck', this.panelName, this.getCheckedData())
    },
    // 节点选中与取消事件
    checkAllGroupChange() {
      let isCheckAll = true
      for (let i = 0, j = this.contentDataPage.length; i < j; i++) {
        if (this.contentDataPage[i].checkAllGroup2.length !== this.contentDataPage[i].sensor.length) {
          isCheckAll = false
          break
        }
      }
      this.checkAll = isCheckAll
      this.$emit('currentAllcheck', this.panelName, this.getCheckedData())
    },
    troggleAllcheckfn() {
      console.log(11111)
      this.checkAll = false
      this.contentDataPage.map(item => {
        item.checkAllGroup2 = []
      })
      this.$emit('currentAllcheck', this.panelName, this.getCheckedData())
    }
  }
}
</script>
<style lang='scss' scoped >
/* @import url(); 引入css类 */
.ivu-collapse-header{
    .allcheck,.ivu-checkbox-wrapper{
        float: right;
        margin: 0px;
        margin-right: 10px;
    }
}
.contentBox{
    display: flex;
    justify-content: flex-start;
    .contentname{
        display: inline-block;
        width: 95px;
        // text-align: right;
        margin-right: 10px;
    }
}
</style>
