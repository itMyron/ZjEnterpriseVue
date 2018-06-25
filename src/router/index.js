import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/views/test/index'
import Login from '@/views/login/index' //登录
import Index from '@/views/index' //主页面
import Home from '@/views/home/index' //首页
import BaseInfo from '@/views/enterprisePlatform/baseInfo/index' //核心企业平台---基本信息
import FinancingList from '@/views/enterprisePlatform/Financinglist/index' //核心企业平台---保理融资列表
import FinancingListView from '@/views/enterprisePlatform/Financinglist/view/index' //核心企业平台---保理融资列表(查看)
import Enterprise from '@/views/enterprisePlatform/supplierList/enterprise/index' //核心企业平台---供应商列表（企业）
import Eview from '@/views/enterprisePlatform/supplierList/enterprise/view/index' //核心企业平台---供应商列表（查看）
import Eadd from '@/views/enterprisePlatform/supplierList/enterprise/add/index' //核心企业平台---供应商列表（新增）
import Personal from '@/views/enterprisePlatform/supplierList/personal/index' //核心企业平台---供应商列表(个人)
import Pview from '@/views/enterprisePlatform/supplierList/personal/view/index' //核心企业平台---供应商列表(查看)
import Padd from '@/views/enterprisePlatform/supplierList/personal/add/index' //核心企业平台---供应商列表(新增)
import FinancingManage from '@/views/supplierPlatform/financingManage/index' //供应商登录平台---保理业务管理
import FinancingManageView from '@/views/supplierPlatform/financingManage/view/index' //供应商登录平台---保理业务管理（查看）
import FinancingManageAdd from '@/views/supplierPlatform/financingManage/add/index' //供应商登录平台---保理业务管理（添加）
import EbaseInfo from '@/views/supplierPlatform/baseInfo/enterprise/index' //供应商平台---企业供应商基本信息
import PbaseInfo from '@/views/supplierPlatform/baseInfo/personal/index' //供应商平台---个人供应商基本信息


Vue.use(Router)
const routes = [
  {
    path: "/",
    name:"默认登录",
    component: Login,
  },
  {
    path: "/login",
    name: "登录",
    component: Login
  },
  {
    path: "/test",
    name: "",
    component: Test
  },
  {
    path: "/index",
    name: "首页",
    component: Index,
    meta: {
      barF: "首页",
      bar: "",
      barC: "fa-home"
    },
    redirect: "/home",
    children:[
      {
        path: "/home",
        name: "主页",
        component: Home,
        meta: {
          barF: "主页",
          bar: "",
          barC: "fa-home"
        }
      },
      {
        path: "/baseInfo",
        name: "核心企业平台-基本信息",
        component: BaseInfo,
        meta: {
          barF: "核心企业平台",
          bar: "基本信息",
          barC: "fa-home"
        }
      },
      {
        path: "/financingList",
        name: "核心企业平台-保理融资列表",
        component: FinancingList,
        meta: {
          barF: "核心企业平台",
          bar: "保理融资列表",
          barC: "fa-home"
        }
      },
      {
        path: "/financingListView",
        name: "核心企业平台-保理融资列表（查看）",
        component: FinancingListView,
        meta: {
          barF: "核心企业平台",
          bar: "保理融资列表",
          barC: "fa-home"
        }
      },
      {
        path: "/financingManage",
        name: "供应商平台-保理业务管理",
        component: FinancingManage,
        meta: {
          barF: "供应商平台",
          bar: "保理业务管理",
          barC: "fa-home"
        }
      },
      {
        path: "/financingManageView",
        name: "供应商平台-保理业务管理（查看）",
        component: FinancingManageView,
        meta: {
          barF: "供应商平台",
          bar: "保理业务管理",
          barC: "fa-home"
        }
      },
      {
        path: "/financingManageAdd",
        name: "供应商平台-保理业务管理（新增）",
        component: FinancingManageAdd,
        meta: {
          barF: "供应商平台",
          bar: "保理业务管理",
          barC: "fa-home"
        }
      },
      {
        path: "/enterprise",
        name: "核心企业平台-企业供应商",
        component: Enterprise,
        meta: {
          barF: "核心企业平台",
          bar: "企业供应商",
          barC: "fa-home"
        }
      },
      {
        path: "/eview",
        name: "核心企业平台-企业供应商（查看）",
        component: Eview,
        meta: {
          barF: "核心企业平台",
          bar: "企业供应商",
          barC: "fa-home"
        }
      },
      {
        path: "/eadd",
        name: "核心企业平台-企业供应商（新增）",
        component: Eadd,
        meta: {
          barF: "核心企业平台",
          bar: "企业供应商",
          barC: "fa-home"
        }
      },
      {
        path: "/personal",
        name: "核心企业平台-个人供应商",
        component: Personal,
        meta: {
          barF: "核心企业平台",
          bar: "个人供应商",
          barC: "fa-home"
        }
      },
      {
        path: "/pview",
        name: "核心企业平台-个人供应商(查看)",
        component: Pview,
        meta: {
          barF: "核心企业平台",
          bar: "个人供应商",
          barC: "fa-home"
        }
      },
      {
        path: "/padd",
        name: "核心企业平台-个人供应商(新增)",
        component: Padd,
        meta: {
          barF: "核心企业平台",
          bar: "个人供应商",
          barC: "fa-home"
        }
      },
       {
         path: "/ebaseInfo",
         name: "供应商平台---企业供应商基本信息",
         component: EbaseInfo,
         meta: {
           barF: "供应商平台",
           bar: "企业供应商基本信息",
           barC: "fa-home"
         }
       },
      {
        path: "/pbaseInfo",
        name: "供应商平台---个人供应商基本信息",
        component: PbaseInfo,
        meta: {
          barF: "供应商平台",
          bar: "个人供应商基本信息",
          barC: "fa-home"
        }
      },
    ]
  },
];
export default new Router({
  routes
})
