<template>
  <div class="mainNav">
   <div class="mainNav-Top">联系我们</div>
    <van-divider/>
    <div>
     <div  class="mainNav-header">主办单位</div>
      <ul>
        <li>xxxxx有限公司</li>
        <li>联系电话：029-8516204</li>
        <li>联系传真：029-85162925</li>
        <li>电子邮箱：xxx@xx.cn</li>
        <li>单位网址：http://www.xx.cn/</li>
        <li>通讯地址：xx省xx市xx街道xx号</li>
        <li>业务 QQ： 247376584</li>
      </ul>
     <div  class="mainNav-middle">承办单位</div>
      <ul>
        <li>xxxxx有限公司</li>
        <li>联系电话：029-8516204</li>
        <li>联系传真：029-85162925</li>
        <li>电子邮箱：xxx@xx.cn</li>
        <li>单位网址：http://www.xx.cn/</li>
        <li>通讯地址：xx省xx市xx街道xx号</li>
        <li>业务  QQ： 247376584</li>
      </ul>
    </div>
    <div class="mainNav-middleB">
      <span>反馈意见</span>
        <van-divider/>
    </div>
       <div class="mainNav-buttom">
        <span>反馈意见：</span>
        <div>
          <van-field 
          required
           v-model="feedback" 
          rows="1"
          autosize
          autocomplete
          type="textarea"
          maxlength="400"
          show-word-limit
          placeholder="欢迎提出您在使用过程中遇到的问题或宝贵建议,感谢您的支持" />
        </div>
        </div>
       <div class="mainNav-buttom">
        <span>联系方式：</span>
        <div>
          <van-field 
           v-model="contentWay" 
          rows="1"
          autosize
          autocomplete
          type="textarea"
          maxlength="100"
          show-word-limit
          placeholder="请留下您的联系方式，以便我们及时回复您" />
        </div>
        </div>
        <div class="button-Nav">
            <van-button size="small"  type="danger"@click="deleteClick">取消</van-button>
             <van-button size="small" type="info" @click="commitClick">提交</van-button>
        </div>
          
  </div>
</template>
<script>
export default {
 data(){
   return{
     feedback:'',
     contentWay:''
   }
 },
 methods:{
  // 提交
   commitClick(){
     if(this.feedback === ''){
       alert('反馈意见不能为空')
       return
     }
     alert('感谢您的反馈')
   },
  // 取消
   deleteClick(){
     this.feedback ='',
     this.contentWay = ''
   }
 }
}
</script>
<style lang="scss" scoped>
body{
    padding: 0;
    margin: 0;
    background-color: rgb(52, 54, 53);
    color: rgb(205, 210, 214);
}
  .mainNav{
    color: rgb(170, 172, 171);
    font-size: 14px;
    margin: 30px 15px 0 15px;
    height: 1100px;
    
  }
  .mainNav-Top{
     font-size: 16px;
  }
  .mainNav-header,.mainNav-middle{
     font-size: 16px;
    color: #fff;
  }
  .mainNav-middle{
    margin-top: 15px;
  }
  .mainNav-buttom{
    margin-bottom: 20px;
    display: flex;
  }
  .van-field{
    width: 150%;
    border-radius: 5px;
    background-color: rgb(171, 173, 171);
    color: #fff;
  }
  .mainNav-middleB{
      margin-top: 20px;
      font-size: 16px;
  }
  .button-Nav{
    display: flex;
    justify-content: flex-end;
  }
  .van-button{
    margin: 40px 10px;
    padding: 0 18px;
    font-size: 14px;
  }
  .mainNav-buttom span{
        color: #fff;

  }
  ul{
    margin-top: 5px;
  }
  .van-field__control{
    color: rgb(230, 240, 236);
  }

</style>