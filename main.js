import App from './App'
import Vue from 'vue'
import store from './store'
import {utils} from '@/utils/index.js';
import config from '@/config/config.js'
const http = require('./api/index.js')
import yList from '@/components/YList/YList.vue'
import pageTabpars from '@/components/PageTabpars/PageTabpars.vue'
import vanImage from '@/wxcomponents/vant/image/index'
//注册全局组件  
Vue.component('y-list', yList);
Vue.component('page-tabpars', pageTabpars);
Vue.component('van-image',vanImage)
console.log(config.IMAGE_URL );
Vue.config.productionTip = false
Vue.prototype.$utils = utils //工具包管理
Vue.prototype.$page = config.ROUTER_LIST //路由管理
Vue.prototype.$http = http //路由管理
Vue.prototype.$url = config.IMAGE_URL //路由管理
const app = new Vue({
	store,
	...App
})
app.$mount()
