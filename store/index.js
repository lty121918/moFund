import Vuex from 'vuex'
import Vue from 'vue'
const debug = process.env.NODE_ENV !== 'production'

const state = {
	teach: '2',
	active: 'home',
	animate: 'zoomIn',
	tabbars: [{
			name: 'home',
			text: '首页',
			icon: '/static/tab-bar/index.png',
			iconActive: '/static/tab-bar/index-hl.png',
			path: '/pages/tab-bar/home/home'
		}, {
			name: 'class',
			text: '班级',
			icon: '/static/tab-bar/class.png',
			iconActive: '/static/tab-bar/class-hl.png',
			path: '/pages/tab-bar/class/class'
		},
		{
			name: 'map',
			text: '地图',
			icon: '/static/tab-bar/map.png',
			iconActive: '/static/tab-bar/map-hl.png',
			path: '/pages/tab-bar/map/map'
		},
		{
			name: 'mine',
			text: '我的',
			icon: '/static/tab-bar/mine.png',
			iconActive: '/static/tab-bar/mine-hl.png',
			path: '/pages/tab-bar/mine/mine'
		}
	]
}

const getters = {
	active: state => state.active,
	animate: state => state.animate,
	tabbars: state => state.tabbars,
	teach:state => state.teach
}

const mutations = {
	SET_ACTIVE(state, data) {
		state.active = data
	},
	SET_TABBARS(state, data) {
		state.tabbars = data
	},
	SET_TEACH(state, data) {
		console.log(data,'data');
		state.teach = data
	},
}

Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	strict: debug,
	plugins: []
})

export default store
