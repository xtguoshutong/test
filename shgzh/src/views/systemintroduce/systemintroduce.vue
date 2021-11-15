<template>
<div id="NavItem">
    {{content}}
</div>
</template>
<script>
export default {
  name:'shop',
  data(){
    return {
        content:`面向我国区域高分遥感应用的实际工作需求，以国产军民高分辨率陆地感测卫星为主要数据源，
           开展高分遥感数据成果和定制产品数据的共享服务和二三维显示技术研究,建立高分遥感大数据成
           果展示及共享服务平台，研制基于云构架的数据共享服务分系统、成果展示分系统和数据模型与
           分析算法系统，构建面向遥感数据加工处理的模型与算法,实现区域遥感应用中的高分遥感数据
           
           `
    }
  }
}
</script>
<style >
*{
    margin: 0;
    padding:0;
}
body{
    padding: 0;
    margin: 0;
    background-color: rgb(52, 54, 53);
    color: rgb(205, 210, 214);
}

#NavItem{
    color: rgb(183, 185, 187);
    font-size: 17px;
    margin: 100px 10px;
    /* 设置首行缩进 */
    text-indent:30px;
    /* 设置行间距 */
    line-height: 180%;
    /* 设置文字两端对齐 */
    text-align: justify
  
}
</style>