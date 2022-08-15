//新建一个js文件用于混入
const SAFE_AREA_INSET_BOTTOM = 34
import {
	mapMutations,
	mapGetters
} from 'vuex'
const minxin = {
	data() {
		return {
			isIphoneX: false,
			safeAreaInsetBottom: true, //底部高度
			isTeach: '', // 是否教练 1是2不是
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

	created() {
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
	methods: {
		Ginit() {
			// 空壳
		},
		...mapMutations(['SET_TEACH', 'SET_STORAGE']),
		getTeach() {
			let isTeach = this.$utils.util.getCache('role')
			console.log('1是2否教练', isTeach);
			if (isTeach == null || isTeach == '') {
				this.isTeach = 2
				this.$utils.util.setCache('role', this.isTeach)
			} else {
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
						console.log(e);
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
		}

	},
}

export default minxin
