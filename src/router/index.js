import Vue from 'vue'
import VueRouter from 'vue-router'
// import {getUserInfo} from '@/api/user/user.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index', //首页{每日人流，每日红黄绿码}
        component: () => import('../views/home/Index.vue'),
      },
      {
        path: 'RealTimeRiskArea', //实时风险地区
        component: () => import('../views/home/RealTimeRiskArea.vue'),
      },
      {
        path: 'vido', //实时监控
        component: () => import('../views/home/Vido.vue'),
      },
      {
        path: 'UserInfo', //用户信息查询
        component: () => import('../views/home/UserInfo.vue'),
      },
      {
        path: 'SuspectorInformationQuery', //疑似人员信息查询
        component: () => import('../views/home/SuspectorInformationQuery.vue'),
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next) => {
//   isLogin(to,from,next);
// })

//路由守卫 是否登录
// function isLogin(to,from,next){
//   if(to.path == '/login'){
//     next();
//   }else{
//     if(typeof window.sessionStorage["token"] == 'string' && window.sessionStorage["token"].length > 0){
//       //解析token
//       // getUserInfo().then(res => console.log(res));
//       next();
//     }else{
//       next('/login');
//     }
//   }
// }


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
