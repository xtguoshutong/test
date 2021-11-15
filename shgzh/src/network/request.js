import axios from 'axios'


export function request(config){
 
  const reqs=axios.create({
    baseURL:'http://localhost:9528',
    // timeout:20*5000,
  });
 

  // 1.拦截请求  默认传入进来两个参数，参数一就是自己封装的配置
   reqs.interceptors.request.use(
     config =>{
               return config//拦截完毕必须返回，不然会打印出err
              },
      err =>{
        console.log(err)
      })
  reqs.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })
  return reqs(config)

}

  