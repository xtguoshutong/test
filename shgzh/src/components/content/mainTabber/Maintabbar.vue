<template>
   <tab-bar >
      <tab-bar-item  path='/systemintroduce'>
        <div slot="item-text">系统介绍</div>
      </tab-bar-item>
      <tab-bar-item path="/dataserver">
        <div slot="item-text">数据服务</div>
      </tab-bar-item>
      <tab-bar-item path='/contentus'>
        <div slot="item-text">联系我们</div>
      </tab-bar-item>
     
    </tab-bar>
</template>


<script>
import TabBar from '../../common/tabbar/TabBar.vue'
import TabBarItem from '../../common/tabbar/TabBarItem.vue';
export default {
  name: "MainTabbar",
  components:{
    TabBar,TabBarItem
  }
}
</script>

