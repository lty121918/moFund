<!-- 蓝色登录页面2 -->
<template>
	<view class="login">
		<view class="login-content">
			<image class="login-content-img" src="/static/login/logo2.png" mode="widthFix"></image>
			<view class="fz40">向日葵体育申请获得以下权限</view>
			<view class="color666 mt32">(获得您的手机号)</view>
			<button v-if="isSubmit" class="login-button" type="primary"
				open-type="getPhoneNumber" @getphonenumber="getphonenumber" size="mini">授 权</button>
			<button v-else class="login-button" type="primary" @click="getphonenumber2" size="mini">授 权</button>
			<view class="tip-box flex" v-if="protocolData.length > 0" @click="changeBox">
				<view v-if="!isSubmit" class="attendance-check">
				</view>
				<image v-if="isSubmit" class="attendance-check" src="/static/checkbox.png" mode="widthFix">
				</image>
				<view>登录即视为您同意</view>
				<view class="blue" @click.stop="showModal(protocolData[0],1)">《{{protocolData[0].protocolTitle}}》</view>
				<view v-if="protocolData[1]">及</view>
				<view class="blue" @click.stop="showModal(protocolData[1],2)" v-if="protocolData[1]">
					《{{protocolData[1].protocolTitle}}》</view>
			</view>
		</view>
		<Protocol ref="protocol" />
	</view>
</template>
<script>
	import {
		debounce
	} from "@/utils/lodash.js";
	import {
		mapMutations
	} from 'vuex'
	import mixin from '@/mixin.js'
	import Protocol from './components/Protocol/Protocol.vue'
	import {
		protocolData
	} from './login.js'
	export default {
		name: "login",
		mixins: [mixin],
		components: {
			Protocol
		},
		data() {
			return {
				protocolData,
				isSubmit: false,
				type: null
			};
		},
		onLoad(e) {
			this.type = e.type
			this.SET_STORAGE({
				str: 'shareInfo'
			})
		},
		onReady() {},
		methods: {
			...mapMutations(['SET_STORAGE']),
			changeBox(){
				this.isSubmit = !this.isSubmit
			},
			// 协议展示
			showModal(protocol, val) {
				this.$refs.protocol.toggle(protocol)
			},
			//当前登录按钮操作
			login(data) {
				try {
					uni.showToast({
						title: data.msg,
						icon: "none",
					});
					console.log(data);
					if (data.code === 200) {
						this.nextToHome(data.data)
					}
				} catch (e) {
					console.log(e);
				}
			},
			async nextToHome(data) {
				// this.$utils.util.setCache("Authorization", data.accessToken)
				this.SET_STORAGE({
					str: 'Authorization',
					data: data.accessToken
				})
				console.log('登录TOKEN:');
				console.log('Bearer ' + data.accessToken);

				this.SET_STORAGE({
					str: 'userInfo',
					data
				})
				this.$utils.util.setCache('role', data.isCoach ? 1 : 2)
				if(this.type=='this'){
					if (data.isCoach) {
						this.setTeachApp()
					}
					this.$utils.router.navBack()
					return false
				}
				if (this.shareInfo.classId) {
					if (data.isCoach) {
						this.setTeachLogin(this.shareInfo)
						// this.$utils.router.redTo(this.$page.ClassDetail, this.shareInfo)
					} else {
						this.$utils.router.redTo(this.$page.OrderInfo, this.shareInfo)
					}

				} else {
					
					if (!data.isCoach) {
						this.$utils.router.swtTo(this.$page.Home, {
							type: '1'
						})
					} else {
						this.$utils.router.swtTo(this.$page.Class)
					}
					
				}



			},
			getphonenumber2: debounce(function(e) {
				const self = this
				if (!self.isSubmit) {
					self.$utils.model.showToast('需您阅读《用户服务协议》、《隐私政策》。')
					return false
				}
			}),
			getphonenumber: debounce(function(e) {
				const self = this
				if (!self.isSubmit) {
					self.$utils.model.showToast('需您阅读《用户服务协议》、《隐私政策》。')
					return false
				}
				wx.getUserInfo({
					success: function(log) {
						console.log(log.userInfo);
						uni.login({
							success: res => {
								console.log('CODE：', e.detail.code, 'JS_CODE：', res.code)
								if (!e.detail.code) {
									return false
								}
								self.getLocation().then(async () => {
									const data = await self.$http['login']
										.login({
											code: e.detail.code,
											jsCode: res.code,
											avatarUrl: log.userInfo
												.avatarUrl,
											nickname: log.userInfo.nickName
										});
									self.login(data);
								})

							},
						});
					}
				})
			}, 500),
		},
	};
</script>

<style scoped lang="scss">
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-image: url(~@/static/login/bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;

		&-content {
			padding: 32rpx;
			width: 690rpx;
			// height: 812rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 32rpx;
			text-align: center;

			&-img {

				margin-top: 168rpx;
				margin-bottom: 194rpx;
				width: 538rpx;
				height: 96rpx;
				// margin-top: 42rpx;
				// margin-bottom: 136rpx;
				// width: 314rpx;
				// height: 248rpx;
			}
		}

		&-button {
			margin-top: 100rpx;
			width: 626rpx;
			height: 92rpx;
			background: #DE501F;
			border-radius: 16rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 92rpx;
		}
	}

	.flex {
		display: flex;
	}

	.tip-box {
		margin-top: 32rpx;
		width: 100%;
		// height: 60rpx;
		align-items: center;
		justify-content: center;
		z-index: 100;
		flex-wrap: wrap;
		// line-height: 30rpx;
	}

	.blue {
		color: #3B94FF;
	}
	.attendance {
		&-check {
			margin-right: 24rpx;
			flex-shrink: 0;
			width: 36rpx;
			height: 36rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			border: 2rpx solid #E7E8EB;
		}
	}
</style>
