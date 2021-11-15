<template>
   <div id="tab-bar">
     <slot ></slot>
   </div>
</template>
<script>
export default {
  name:"TabBar",
}
</script>
<style  >
 #tab-bar{
    display: flex;/* 水平排列 */
    height: 50px;
    align-items: center;
    background-color: rgb(82, 81, 81);
    color: #fff;
   position: fixed; right: 0px;bottom: 0px;left: 0px;
   z-index: 9;
   box-shadow: 0px -2px 5px rgb(107, 105, 105);
  }
</style>