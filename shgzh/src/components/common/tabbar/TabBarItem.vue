<template>
    <div class="tab-bar-item"  @click="isclick"> 
        <div v-if="!isactive" ><!-- 尽量用div包起来 -->
           <slot  name="item-icon"></slot>
        </div>
        <div  v-else>
           <slot  name="item-icon-item"></slot>
        </div >
        <div  :class="{isactive}">
           <slot name="item-text"></slot>

        </div>
    </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
     path:String
  },
  computed:{
     isactive(){
      //  检查处于活跃的路由里是否有path
        return this.$route.path.indexOf(this.path)!=-1;  //等于-1表示没有找到
     }
  },
  methods:{
     isclick(){
        this.$router.push(this.path)//路由跳转
     }
  }
 
}
</script>

<style >
.tab-bar-item{
    flex:1 ;/* 对内容均等分 */
    text-align: center;
    line-height: 33px;/* 一般高度都是49px */
    font-size: 14px;

   };
.tab-bar-item img{

  margin-top: 3px;
  margin-bottom: 2px;
  width: 24px;
  vertical-align: middle;/*清除照片下面自带的边距 */
}
.isactive{
   color: red;
}
</style>