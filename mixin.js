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
		...mapGetters(['campus', 'location', 'city', 'userInfo']),
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
				let isTeach = this.isTeach == 1 ? 2 : 1
				this.isTeach = this.$utils.util.setCache('role', isTeach)
				this.isTeach = isTeach
				this.SET_TEACH(isTeach)
				this.$utils.router.swtTo(this.$page.Home)
			}

		},
		// 社区初始化
		getInit() {
			console.log('重置/更新');
		},
		/**
		 * @function 微信支付
		 */
		wxPay() {
			const orderInfo = {
				"appid": "wx499********7c70e", // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
				"noncestr": "c5sEwbaNPiXAF3iv", // 随机字符串
				"package": "Sign=WXPay", // 固定值
				"partnerid": "148*****52", // 微信支付商户号
				"prepayid": "wx202254********************fbe90000", // 统一下单订单号 
				"timestamp": 1597935292, // 时间戳（单位：秒）
				"sign": "A842B45937F6EFF60DEC7A2EAA52D5A0" // 签名，这里用的 MD5/RSA 签名
			};
			uni.requestPayment({
				"provider": "wxpay",
				"orderInfo": orderInfo,
				success: function(res) {
					const rawdata = JSON.parse(res.rawdata);
					console.log("支付成功");
				},
				fail: function(err) {
					console.log('支付失败:' + JSON.stringify(err));
				}
			})
		},
		getLocation() {
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
							longitude: res.longitude
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
															uni.getLocation({
																success: res => {}
															});
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
										}
									});
								}
							}
						});
						reject(e)
					}
				});
			})
		}
	},
}

export default minxin
