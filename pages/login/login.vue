<!-- 蓝色登录页面2 -->
<template>
	<view class="login">
		<view class="login-content">
			<image class="login-content-img" src="/static/login/logo.png" mode="widthFix"></image>
			<view class="fz40">极光体育申请获得以下权限</view>
			<view class="color666 mt32">获得你的公开信息（昵称、头像等）</view>
			<button class="login-button" type="primary" open-type="getPhoneNumber" @getphonenumber="getphonenumber"
				size="mini">授 权</button>
		</view>
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
	export default {
		name: "login",
		mixins: [mixin],
		components: {},
		data() {
			return {};
		},
		onLoad() {},
		onReady() {},
		methods: {
			...mapMutations(['SET_STORAGE']),
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
				this.SET_STORAGE({str:'Authorization',data:data.accessToken})
				console.log('登录TOKEN:');
				console.log('Bearer ' + data.accessToken);
				uni.setClipboardData({
					data: 'Bearer ' + data.accessToken,
					success: function() {
					},
					
				});
				this.SET_STORAGE({str:'userInfo',data})
				// console.log('1是2否教练', isTeach);
				this.$utils.util.setCache('role', data.isCoach ? 1 : 2)
					this.$utils.router.swtTo(this.$page.Home)
				
				
			},
			getphonenumber: debounce(function(e) {
				const self = this
				wx.getUserInfo({
				  success: function(log) {
				   console.log(log.userInfo);
					uni.login({
						success: res => {
							console.log('CODE：', e.detail.code, 'JS_CODE：', res.code)
							if (!e.detail.code) {
								return false
							}
							self.getLocation().then(async ()=>{
								const data = await self.$http['login'].login({
									code: e.detail.code,
									jsCode: res.code,
									avatarUrl:log.userInfo.avatarUrl,
									nickname:log.userInfo.nickName
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
			height: 812rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 32rpx;
			text-align: center;

			&-img {
				margin-top: 42rpx;
				margin-bottom: 136rpx;
				width: 314rpx;
				height: 248rpx;
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
</style>
