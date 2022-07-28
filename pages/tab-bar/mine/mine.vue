<template>
	<view class="mine">

		<view class="mine-head">
			<view class="mine-head-flex">
				<image class="mine-head-img" :src="userInfo.avatar" mode="aspectFit"></image>
				<view>
					<view>
						<text class="mine-head-name">{{userInfo.name}}</text>
						<text class="mine-head-role" v-if="isTeach==2">家长</text>
						<text class="mine-head-role mine-head-role2" v-if="isTeach==1">教练</text>
					</view>
					<view class="mine-head-balance">
						<image class="mine-head-balance-img" src="/static/mine/balance.png" mode="aspectFit"></image>
						<text>账户余额：￥{{userInfo.remainingSum}}</text>
					</view>
				</view>
			</view>
			<view class="mine-head-switch" @click="setTeach">
				<image class="mine-head-switch-img" src="/static/mine/switch.png" mode="aspectFit"></image>
				<text>切换身份</text>
			</view>
			<view class="mine-nav" v-if="isTeach==2">
				<view class="mine-nav-item" @click="$utils.router.navTo($page.Order)">
					<image class="mine-nav-img1" src="/static/mine/order.png" mode="aspectFit"></image>
					<view>我的订单</view>
				</view>
				<view class="mine-nav-item" @click="$utils.router.navTo($page.MyClass)">
					<image class="mine-nav-img2" src="/static/mine/competition.png" mode="aspectFit"></image>
					<view>我的拼班</view>
				</view>
				<view class="mine-nav-item" @click="$utils.router.navTo($page.Student)">
					<image class="mine-nav-img3" src="/static/mine/student.png" mode="aspectFit"></image>
					<view>我的学员</view>
				</view>
				<view class="mine-nav-item" @click="$utils.router.navTo($page.Wallet)">
					<image class="mine-nav-img4" src="/static/mine/wallet.png" mode="aspectFit"></image>
					<view>我的钱包</view>
				</view>
			</view>
			<view class="mine-operation mine-operation2" v-if="isTeach==1" >
				<view class="mine-operation-item mine-operation-item2" @click="$utils.router.navTo($page.Wallet)">
					<view class="mine-operation-item-left">
						<image class="mine-operation-item-img" src="/static/mine/balance2.png" mode="aspectFit"></image>
						<text>我的钱包</text>
					</view>
					<uni-icons type="right" color="#141D3D" size="24" />
				</view>
				<!-- <view class="mine-operation-item mine-operation-item2">
					<view class="mine-operation-item-left">
						<image class="mine-operation-item-img" src="/static/mine/guestbook.png" mode="aspectFit"></image>
						<text>社区留言板</text>
					</view>
					<uni-icons type="right" color="#141D3D" size="24" />
				</view> -->
			</view>
		</view>

		<view class="mine-operation" v-if="isTeach==2" >
			<view class="mine-operation-item" @click="$utils.router.navTo($page.Declare)">
				<view class="mine-operation-item-left">
					<image class="mine-operation-item-img" src="/static/mine/declare.png" mode="aspectFit"></image>
					<text>我的申报</text>
				</view>
				<uni-icons type="right" color="#141D3D" size="24" />
			</view>
			<!-- <view class="mine-operation-item">
				<view class="mine-operation-item-left">
					<image class="mine-operation-item-img" src="/static/mine/match.png" mode="aspectFit"></image>
					<text>我的赛事</text>
				</view>
				<uni-icons type="right" color="#141D3D" size="24" />
			</view>
			<view class="mine-operation-item mine-operation-item2">
				<view class="mine-operation-item-left">
					<image class="mine-operation-item-img" src="/static/mine/guestbook.png" mode="aspectFit"></image>
					<text>社区留言板</text>
				</view>
				<uni-icons type="right" color="#141D3D" size="24" />
			</view> -->
		</view>

		<view v-if="isTeach==2" class="mine-operation">
			<view class="mine-operation-item mine-operation-item2" @click="$utils.router.navTo($page.Coach)">
				<view class="mine-operation-item-left">
					<image class="mine-operation-item-img" src="/static/mine/apply.png" mode="aspectFit"></image>
					<text>成为教练</text>
				</view>
				<uni-icons type="right" color="#141D3D" size="24" />
			</view>
		</view>

		<page-tabpars></page-tabpars>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		data() {
			return {
				isGetData: false, // 数据加载
				// userInfo:{}
			}
		},
		computed: {
			...mapGetters(['active']),
		},
		onShow() {
			this.getData()
		},
		created() {
			const active = 'mine'
			if (this.active !== active) {
				this.SET_ACTIVE(active)
			}
			// console.log('身份验证',this.$utils.validate.validateIdNum('350623199611085735'));
			// 获取数据

		},
		methods: {
			...mapMutations(['SET_ACTIVE']),
			// 模拟请求数据
			getData() {
				console.log('获取我的数据');
				this.$http['mine'].getUserInfo().then(res=>{
					console.log(res);
					if(res.code==200){
						if(res.data.avatar.indexOf('http')==ss-1){
							res.data.avatar = this.$url + res.data.avatar
						}
						const result= Object.assign(this.userInfo,res.data)
						this.SET_STORAGE({str:'userInfo',data:result})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		font-family: SourceHanSansSC-Bold, SourceHanSansSC;
		background: #EEF1FA;
		min-height: 100vh;

		&-head {
			position: relative;
			padding: 20rpx 32rpx 0 32rpx;
			margin-bottom: 66rpx;
			height: 366rpx;
			background-image: url('~@/static/mine/bg.png');
			background-repeat: no-repeat;
			background-size: 100% 562rpx;
			background-position: 0 -196rpx;

			&-flex {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
			}

			&-img {
				margin-right: 28rpx;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}

			&-name {
				height: 48rpx;
				font-size: 32rpx;
				font-family: SourceHanSansSC-Bold, SourceHanSansSC;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 48rpx;
			}

			&-role {
				display: inline-block;
				margin-left: 16rpx;
				min-width: 72rpx;
				height: 32rpx;
				text-align: center;
				background: linear-gradient(180deg, #FFCA3F 0%, #ED8A00 100%);
				border-radius: 12rpx 12rpx 12rpx 0rpx;
				border: 2rpx solid #FFFFFF;
				font-size: 24rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 34rpx;
			}

			&-role2 {
				background: linear-gradient(180deg, #40549C 0%, #141D3D 100%);
			}

			&-balance {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: 22rpx;
				padding: 0 20rpx;
				height: 56rpx;
				line-height: 56rpx;
				background: rgba(255, 255, 255, 0.15);
				border-radius: 12rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;

				&-img {
					margin-right: 18rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}

			&-switch {
				position: absolute;
				right: 0;
				top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 160rpx;
				height: 52rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 200rpx 0rpx 0rpx 200rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #FFFFFF;

				&-img {
					margin-right: 10rpx;
					width: 22rpx;
					height: 18rpx;
				}
			}
		}

		// -=-============
		&-nav {
			position: absolute;
			left: 32rpx;
			bottom: -26rpx;
			display: flex;
			justify-content: space-around;
			width: 686rpx;
			height: 186rpx;
			text-align: center;
			background: #FFFFFF;
			border-radius: 14rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #141D3D;

			&-item {
				display: flex;
				flex-flow: column;
				justify-content: center;
				align-items: center;
				width: 25%;
			}

			&-img1 {
				margin-bottom: 20rpx;
				width: 64rpx;
				height: 62rpx;
			}

			&-img2 {
				margin-bottom: 20rpx;
				width: 68rpx;
				height: 62rpx;
			}

			&-img3 {
				margin-bottom: 22rpx;
				width: 62rpx;
				height: 60rpx;
			}

			&-img4 {
				margin-bottom: 26rpx;
				width: 64rpx;
				height: 56rpx;
			}
		}

		// 操作栏
		&-operation2{
			position: absolute;
			left: 0;
			bottom: -66rpx;
		}
		&-operation {
			margin-bottom: 40rpx;
			margin-left: 32rpx;
			width: 686rpx;
			// height: 312rpx;
			background: #FFFFFF;
			border-radius: 14rpx;

			&-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 32rpx;
				height: 102rpx;
				border-bottom: 2rpx solid rgba(20, 29, 61, 0.05);

				&-left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 28rpx;
					font-weight: 400;
					color: #141D3D;
				}

				&-img {
					margin-right: 16rpx;
					width: 36rpx;
					height: 36rpx;
				}
			}

			&-item2 {
				border-bottom: none
			}
		}
	}
</style>
