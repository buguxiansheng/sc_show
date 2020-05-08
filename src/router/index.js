import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login"




import Menu from "../views/Menu"
import DataFilter from "../components/data_factory/DataFilter"
import DataHandler from "../components/data_factory/DataHandler"
import DataShow from "../components/data_factory/DataShow"
import ProductContrast from "../components/data_factory/ProductContrast"


import Vendor from "../components/vendor_factory/Vendor"

import SpecInfo from "../components/spec_center/SpecInfo"

Vue.use(VueRouter)

const routes = [

      {
        path: "/cob",
        name: "产品规格中心",
        component: Menu,
        children:[
            {
                path: "/cob/cob_01",
                name: "产品规格",
                component: SpecInfo, 
            }
        ]
      },
      {
        path: "/co",
        name: "智能报价",
        component: Menu,
        children:[
          {
            path:"/co/co_02",
            name:"数据筛选",
            component:DataFilter
          },
          {
            path:"/co/co_03",
            name:"数据展示",
            redirect:'/co/co_03/gap_01',
            component: DataHandler,
            children:[
                {  
                  path:"/co/co_03/gap_01",
                  name:"数据分析",
                  component:DataShow
                }, 
                {
                    path:"/co/co_03/gap_03",
                    name:"产品对比",
                    component:ProductContrast
                }
            ]
          },
          {
            path:"/co/co_03/gap_02",
            name:"供应商选择",
            component:Vendor
          }
        ]
      },
      
      //默认加载的主件放第一层
      {
        path:"/",
        name:"Login",
        component: Login
      }
     
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
//   routes_01
})

router.beforeEach((to,from,next)=>{
  if(to.path=="/"){
    next();
  }else{
    if(localStorage.getItem("token")){
      next();
    }else{
      next("/") 
    }
  }
})

export default router