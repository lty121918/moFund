<template>
	<view class="wallet">
		<view class="wallet-mony text-c">
			<view class="wallet-mony-text">余额</view>
			<view class="mt28">
				<text class="fz44">￥</text>
				<text class="fz76 fwb">{{userInfo.remainingSum}}</text>
			</view>
			<view class="mt28 flex-cc" v-if="isTeach==2">
				<view class="wallet-mony-button" @click="handleWithdrawal">
					提现
				</view>
				<view class="wallet-mony-button wallet-mony-button2 ml32" @click="handleRecharge">
					充值
				</view>
			</view>
			<view class="mt28 flex-cc" v-if="isTeach==1" @click="handleWithdrawal">
				<view class="wallet-mony-button wallet-mony-button3">
					提现
				</view>
			</view>
		</view>
		<view class="wallet-content-item">
			<view class="wallet-tab">
				<view class="wallet-tab-item" @click="handleTab(1)" :class="[active==1?'wallet-tab-active':'']">全部
				</view>
				<view class="wallet-tab-item" @click="handleTab(2)" :class="[active==2?'wallet-tab-active':'']">支出
				</view>
				<view class="wallet-tab-item" @click="handleTab(3)" :class="[active==3?'wallet-tab-active':'']">收入
				</view>
			</view>
			<y-list ref="yList" scrollClass="wallet-scroll" :setData="search" :params="{active}">
				<template slot-scope="{data}">
					<view v-for="(item,index) in data" :key="index">
						<wallet-item :item="item" @change="handleShow"></wallet-item>
					</view>
				</template>
			</y-list>
		</view>
		<recharge ref="recharge" />
		<withdrawal ref="withdrawal" />
	</view>
</template>

<script>
	import WalletItem from './wallet-item.vue'
	import Recharge from '@/components/Recharge/Recharge.vue'
	import Withdrawal from '../components/Withdrawal/Withdrawal.vue'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		components: {
			WalletItem,
			Recharge,
			Withdrawal
		},
		data() {
			return {
				active: 1, //  1 2 3
				isTeach: false
			}
		},
		computed: {},
		created() {

		},
		mounted() {
			this.$refs.yList.init()
			this.getData()
			
		},
		methods: {
			getData() {
				console.log('获取我的数据');
				this.$http['mine'].getUserInfo().then(res=>{
					console.log(res);
					if(res.code==200){
						const result= Object.assign(this.userInfo,res.data)
						this.SET_STORAGE({str:'userInfo',data:result})
					}
				})
			},
			handleTab(val) {
				this.active = val
				setTimeout(()=>{
					this.$refs.yList.init()
				},300)
			},
			handleRecharge() {
				this.$refs.recharge.handleShow()
			},
			handleWithdrawal() {
				this.$refs.withdrawal.handleShow()
			},
			// 模拟请求数据
			search(val) {
				const self = this
				return new Promise(async (resolve, reject) => {
					let data = []
					let income = ''
					if (val.active == 2) {
						income = false
					} else if (val.active == 3) {
						income = true
					}
					const res = await self.$http['mine'].getTrade({
						income
					})
					if(res.code==200){
						data = res.data
					}
					resolve({
						data,
						totalRows: 10
					})
				})
			},
		}
	}
</script>
<style>
	.wallet-scroll {
		height: calc(100vh - 60px - 350rpx);
	}
</style>
<style lang="scss" scoped>
	.wallet {
		min-height: 100vh;
		background: #EEF1FA;
		box-sizing: border-box;
		background-image: url('~@/static/mine/bg-wallet.png');
		background-repeat: no-repeat;
		background-size: 100% 456rpx;

		// background-position: 0 -170rpx;
		&-mony {
			height: 350rpx;
			color: #FFFFFF;

			&-text {
				padding-top: 34rpx;
				font-size: 40rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;

			}

			&-button {
				width: 232rpx;
				height: 72rpx;
				border-radius: 16rpx;
				border: 2rpx solid #FFFFFF;
				text-align: center;
				line-height: 72rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}

			&-button2 {
				background-color: white;
				color: #DE501F;
			}

			&-button3 {
				width: 348rpx;
				background-color: white;
				color: #DE501F;
			}
		}

		&-tab {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			&-item {
				padding: 32rpx;
				font-weight: 600;
				font-size: 28rpx;
			}

			&-active {
				position: relative;
				color: #DE501F;

				&:before {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 20rpx;
					margin-left: -12rpx;
					width: 24rpx;
					height: 4rpx;
					background: #DE501F;
					border-radius: 3rpx;
				}
			}
		}

		&-content {
			&-item {
				margin-left: 32rpx;
				width: 686rpx;
				background: #FFFFFF;
				border-radius: 14rpx;
			}
		}
	}
</style>
