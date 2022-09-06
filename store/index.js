import Vuex from 'vuex'
import Vue from 'vue'
const debug = process.env.NODE_ENV !== 'production'
import CONFIG from "../config/config";
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
	],

	campus: null,
	location: {
		latitude: null,
		longitude: null
	},
	userInfo: {},
	Authorization: '',
	city: [],
	classStatus: {
		0: '拼班中',
		1: '待开课(拼班完成)',
		2: '拼班未成功',
		3: '开班中',
		4: '解散（到期结课）',
		5: '解散（团长解散）',
		6: '解散（人数不足）'
	},
	shareInfo:{},//分享信息
	avatar:require('@/static/avatar.png')
	// 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'

}

const getters = {
	active: state => state.active,
	animate: state => state.animate,
	tabbars: state => state.tabbars,
	teach: state => state.teach,
	campus: state => state.campus,
	location: state => state.location,
	userInfo: state => state.userInfo,
	Authorization: state => state.Authorization,
	city: state => state.city,
	classStatus: state => state.classStatus,
	avatar: state => state.avatar,
	shareInfo:state => state.shareInfo
	

}

const mutations = {
	SET_STORAGE(state, {
		data = null,
		str = 'campus',
		type = 'Object'
	}) {
		if (data) {
			state[str] = data;
			if (type == 'Object' && str != 'Authorization') {
				uni.setStorageSync(CONFIG.CACHE_PREFIX + str, JSON.stringify(data));
			} else {
				uni.setStorageSync(CONFIG.CACHE_PREFIX + str, data);
			}

		} else {
			if (uni.getStorageSync(CONFIG.CACHE_PREFIX + str)) {
				if (type == 'Object' && str != 'Authorization') {
					state[str] = JSON.parse(uni.getStorageSync(CONFIG.CACHE_PREFIX + str));
				} else {
					state[str] = uni.getStorageSync(CONFIG.CACHE_PREFIX + str)
				}

			}
		}
	},
	SET_ACTIVE(state, data) {
		state.active = data
	},
	SET_TABBARS(state, data) {
		state.tabbars = data
	},
	SET_TEACH(state, data) {
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
