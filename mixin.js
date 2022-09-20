//新建一个js文件用于混入
const SAFE_AREA_INSET_BOTTOM = 34
import {
	mapMutations,
	mapGetters
} from 'vuex'
import {
	utils
} from '@/utils/index.js';
import {
		debounce,throttle
	} from "@/utils/lodash.js";
const minxin = {
	data() {
		return {
			isIphoneX: false,
			safeAreaInsetBottom: true, //底部高度
			isTeach: '', // 是否教练 1是2不是
			authorization: null,
			officialAccount:false,
			queryParams: {
				row: 10,
				page: 1, //第几页
			},
			isMore:false
		}
	},
	watch: {
		campus: {
			handler(newValue, oldValue) {
				this.getInit()
			},
			/**
			 * 监听对象属性值发生变化是需要设置deep为true，deep表示深度监听。
			 * 数组不需要深度监听；在watch中不要使用箭头函数，因为箭头函数中的this是指向当前作用域。
			 */
			deep: true,
			/**
			 * 值为true则表示在watch中声明的时候，就立即执行handler方法，
			 * 值为false，则和一般使用watch一样，在数据发生变化的时候才执行handler。
			 */
			// immediate: true 
		}
	},
	computed: {
		...mapGetters(['campus', 'location', 'city', 'userInfo', 'classStatus', 'avatar', 'shareInfo']),
		safeAreaHeight() {
			return this.isIphoneX && this.safeAreaInsetBottom ? SAFE_AREA_INSET_BOTTOM : 0 // 苹果X等机型安全区高度
		},
	},
	onShow() {
		this.authorization = utils.util.getCache('Authorization');
		this.SET_STORAGE({
			str: 'campus'
		})
		this.SET_STORAGE({
			str: 'location'
		})
		this.SET_STORAGE({
			str: 'city'
		})
		this.SET_STORAGE({
			str: 'userInfo'
		})
		this.getTeach()
		this.Ginit()
	},
	onload(e) {
		console.log('1222', e)

	},
	created() {
		wx.showShareMenu({
			// withShareTicket: true,
			menus: ["shareAppMessage", 'shareTimeline']
		})
		const res = uni.getSystemInfoSync()
		const {
			model,
			statusBarHeight
		} = res
		if (
			(model.indexOf('iPhone') > -1 && statusBarHeight > 20) ||
			model.indexOf('iPhone X') > -1 ||
			model.indexOf('iPhone 1') > -1
		) {
			this.isIphoneX = true
		}
	},
	// 分享给朋友
	onShareAppMessage(res) {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			// title:'订单列表',
			path: `/${this.$mp.page.route}`
		}
	},
	onShareTimeline(res) { //分享到朋友圈
		return {
			// title: '订单列表',
			path: `/${this.$mp.page.route}` //分享默认打开是小程序首页
		}
	},
	methods: {
		Ginit() {
			// 空壳
			// console.log('路由', uni.getLaunchOptionsSync());
		},
		...mapMutations(['SET_TEACH', 'SET_STORAGE']),
		getTeach() {
			let isTeach = this.$utils.util.getCache('role')
			console.log('Mixin->1是2否教练', isTeach);
			if (isTeach == null || isTeach == '') {
				this.isTeach = 2
				this.$utils.util.setCache('role', this.isTeach)
			} else {
				isTeach == 1 ? uni.hideShareMenu() : ''
				this.isTeach = isTeach
			}
			this.SET_TEACH(this.isTeach)
		},
		async setTeach() {
			const res = await this.$http['mine'].roleSwitching()
			if (res.code == 200) {
				let isTeach = res.data.isCoach ? 1 : 2
				this.isTeach = this.$utils.util.setCache('role', isTeach)
				this.isTeach = isTeach
				this.SET_TEACH(isTeach)
				this.SET_STORAGE({
					str: 'Authorization',
					data: res.data.accessToken
				})
				if (isTeach == 2) {
					this.$utils.router.swtTo(this.$page.Home)
				} else {
					this.$utils.router.swtTo(this.$page.Class)
				}

			}

		},
		async setTeachLogin(shareInfo) {
			const res = await this.$http['mine'].roleSwitching()
			if (res.code == 200) {
				let isTeach = res.data.isCoach ? 1 : 2
				this.isTeach = this.$utils.util.setCache('role', isTeach)
				this.isTeach = isTeach
				this.SET_TEACH(isTeach)
				this.SET_STORAGE({
					str: 'Authorization',
					data: res.data.accessToken
				})
				if (isTeach == 2) {
					this.$utils.router.redTo(this.$page.OrderInfo, shareInfo)
				}

			}

		},
		// 社区初始化
		getInit() {
			console.log('重置/更新');
		},
		/**
		 * @function 微信支付
		 */
		wxPay(val) {
			return new Promise(async (resolve, reject) => {
				console.log('val', val);
				let orderInfo = {
					// appid: val.appId, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
					// noncestr: val.nonceStr, // 随机字符串
					// package: "Sign=WXPay", // 固定值
					// signType: val.signType, // 微信支付商户号
					// timeStamp: val.timeStamp,
					// paySign: val.paySign, 
				};
				wx.requestPayment({
					timeStamp: val.timeStamp,
					nonceStr: val.nonceStr,
					package: val.packageValue,
					signType: val.signType,
					paySign: val.paySign,
					success: function(res) {
						// const rawdata = JSON.parse(res.rawdata);
						console.log("支付成功");
						resolve(true)
					},
					fail: function(err) {
						console.log('支付失败:' + JSON.stringify(err));
						resolve(false)
					}
				})
				// uni.requestPayment({
				// 	provider: "wxpay",
				// 	orderInfo:val,
				// 	success: function(res) {
				// 		const rawdata = JSON.parse(res.rawdata);
				// 		console.log("支付成功");
				// 	},
				// 	fail: function(err) {
				// 		console.log('支付失败:' + JSON.stringify(err));
				// 	}
				// })
			})
		},
		getPlayStatus(payOrderNo) {
			return new Promise(async (resolve, reject) => {
				let res = await this.$http['mine'].getPayStatus({
					payOrderNo
				})
				if (res.code == 200) {
					resolve(res.data)
				}
				resolve({})
			})

		},
		getLocation(isShow = true) {
			const self = this
			return new Promise((resolve, reject) => {
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						self.SET_STORAGE({
							data: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							str: 'location'
						})
						resolve({
							latitude: res.latitude,
							longitude: res.longitude,
							type: 'success'
						})
					},
					fail: function(e) {
						console.log('报错信息',e);
						uni.getSetting({
							success: res => {
								if (typeof(res.authSetting['scope.userLocation']) !=
									'undefined' && !res.authSetting[
										'scope.userLocation']) {
									// 用户拒绝了授权
									if (isShow) {
										uni.showModal({
											title: '提示',
											content: '您拒绝了定位权限，将无法使用社区定位功能',
											success: res => {
												if (res.confirm) {
													// 跳转设置页面
													uni.openSetting({
														success: res => {
															if (res
																.authSetting[
																	'scope.userLocation'
																]
															) {
																// 授权成功，重新定位
																// uni.getLocation({
																// 	success: res => {}
																// });
															} else {
																// 没有允许定位权限
																uni.showToast({
																	title: '您拒绝了定位权限，将无法使用社区定位功能',
																	icon: 'none'
																});
															}
														}

													});
												}
												self.SET_STORAGE({
													data: {
														latitude: '30.555175310610363',
														longitude: '114.31188993115236'
													},
													str: 'location'
												})
												resolve({
													latitude: '30.555175310610363',
													longitude: '114.31188993115236'
												})
											}
										});
									} else {
										
										self.SET_STORAGE({
											data: {
												latitude: '30.555175310610363',
												longitude: '114.31188993115236'
											},
											str: 'location'
										})
										resolve({
											latitude: '30.555175310610363',
											longitude: '114.31188993115236'
										})
									}
								} else {
									const LOCATiION = self.SET_STORAGE({
										str: 'location'
									})
									if(LOCATiION&&LOCATiION.latitude){
										resolve(LOCATiION)
									} else {
										self.SET_STORAGE({
											data: {
												latitude: '30.555175310610363',
												longitude: '114.31188993115236'
											},
											str: 'location'
										})
										resolve({
											latitude: '30.555175310610363',
											longitude: '114.31188993115236'
										})
									}
									
									
								}
							}
						});

						// reject(e)
					}
				});
			})
		},
		getSettingLocal() {
			const self = this
			return new Promise((resolve, reject) => {
				uni.getSetting({
					success: res => {
						if (typeof(res.authSetting['scope.userLocation']) !=
							'undefined' && !res.authSetting[
								'scope.userLocation']) {
							// 用户拒绝了授权
							resolve(1)


						} else {
							resolve(3)
						}
					}
				});
			})
		},



		onLaunch(val) {
			return new Promise(async (resolve) => {
				const {
					Login,
					Home,
					Map,
					Course,
					CourseDetail,
					Evaluate,
					PieceList,
					Search,
					OrderInfo,
					Mine
				} = this.$config.ROUTER_LIST
				const currentList = [
					Mine,Login, Home, Map, Course, 
					CourseDetail, Evaluate, PieceList, Search, OrderInfo,
				]
				let routes = getCurrentPages() //获取当前页面栈
				let curRoute = routes[routes.length - 1].route //获取当前页面的路由
				let isLogin = currentList.indexOf(`/${curRoute}`) > -1
				console.log(isLogin, 'isLogin');
				const Authorization = utils.util.getCache('Authorization');
				if (Authorization || isLogin) {
					let isTeach = utils.util.getCache('role')
					if (isTeach == 1) {
						await this.setTeachApp()
					}
					resolve()
				} else {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			})

		},
		async setTeachApp(url, str) {
			const res = await this.$http['mine'].roleSwitching()
			if (res.code == 200) {
				let isTeach = res.data.isCoach ? 1 : 2
				this.isTeach = this.$utils.util.setCache('role', isTeach)
				this.isTeach = isTeach
				this.SET_TEACH(isTeach)
				this.SET_STORAGE({
					str: 'Authorization',
					data: res.data.accessToken
				})

			}
		},
		
		getAttention(){
			
		},
		init() {
			let self = this;
			const query = uni.createSelectorQuery().in(this);
			query.select('#official_account').boundingClientRect(data => {
				if (data&&data.width && data.height) {
					self.officialAccount = true
				} else {
					self.officialAccount = false;
				}
			}).exec();
		},
		// 加载数据
		lower: throttle(function(e) {
			if (this.queryParams.page * this.queryParams.row >= this.queryParams.total) {
				this.isMore = true
				console.log(`暂无更多加载`) //current
				return false
			}
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			this.isRequest().then((res) => {
				console.log(`加载成功`) //current
				this.$forceUpdate() //二维数组，开启强制渲染
			})
		}, 1000),
		// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
		isRequest() {
			return new Promise((resolve, reject) => {
				var that = this
				setTimeout(async () => {
					uni.hideLoading()
					if (this.queryParams.page * this.queryParams.row >= this.queryParams
						.total) {
						this.isMore = true
					} else {
						this.queryParams.page++
						await this.search()
					}
					resolve()
				}, 1000)
			})
		},
		
	},
}

export default minxin
