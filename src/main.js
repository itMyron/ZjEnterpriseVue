
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import API from "@/config/api"		//接口api
import fn from "@/static/common"	//公共方法
import '../static/css/reset.css'
import '../static/font-awesome/css/font-awesome.min.css'
import store from "./store";
import { post, fetch, patch, put } from "./utils/axios"
Vue.prototype.$put = put;
//定义全局变量---请求方式
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$fn = fn;
Vue.prototype.$put = put;
Vue.prototype.$API = API;
Vue.config.productionTip = true		//关闭生产模式下给出的提示
Vue.config.silent = true;		//关闭警告

import Vuex from 'vuex'
Vue.use(Vuex)

import iView from "iview"
import "iview/dist/styles/iview.css"
Vue.use(iView)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App },
	created(){
		router.beforeEach((to, from, next) => {
			// 路由变换后，滚动至顶
		    window.scrollTo(0, 0)
		    next()
		});	
	}
})

/*Vue.directive('numbers', {
 bind: function (el, binding) {
  console.log('ere')
 },
 inserted: function (el) {
  // el.querySelector('input').blur(console.log('etset'))
 },
 update: function (el, binding, vnode, oldVnode) {
  console.log('vnode', vnode)
  let express = vnode.data.directives[1].expression
  // let value = el.querySelector('input').value
  let value = vnode.data.directives[1].value
  if (typeof value === 'string') {} //在重置的时候清空
  if (value.split('.').length - 1 > 1) {
   value = value.replace(/\.{2,}/g, '') // 只保留第一个. 清除多余的
   value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  }
  let repeatValue = value.replace(/[^\d.]/g, '')
  // setTimeout(() => {
  //  el.querySelector('input').value = repeatValue
  // }, 5)
  setValueWithExpressionVue(vnode.context.$data, express, repeatValue)
 },
 componentUpdated: function () {},
 unbind: function (el) {}
})
 
// 
function setValueWithExpressionVue (currObj, expression, value) {
 expression = expression.split('.')
 expression.forEach(function (arg, i) {
  if (i < expression.length - 1) {
   currObj = currObj[arg]
  } else {
   currObj[arg] = value
  }
 })
}
*/
