import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
  const routes=[
    {
      path:'',
      redirect:'/systemintroduce'
    },
    {
      path:'/systemintroduce',
      component: ()=>import('../views/systemintroduce/systemintroduce.vue')
    },
    {
      path:'/dataserver',
      component:()=>import('../views/dataserver/dataserver.vue')
    },
    {
      path:'/contentus',
      component: ()=> import('../views/contentus/contentus.vue')
    },
  ];

const router =new Router({
  mode:'history',
  routes
});

export default router