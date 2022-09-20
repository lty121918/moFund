<template>
	<view class="order">
		<view class="order-tab">
			<view class="order-tab-item" @click="handleTab(1)" :class="[active==1?'order-tab-active':'']">全部订单</view>
			<view class="order-tab-item" @click="handleTab(2)" :class="[active==2?'order-tab-active':'']">消费订单</view>
			<view class="order-tab-item" @click="handleTab(3)" :class="[active==3?'order-tab-active':'']">充值订单</view>
		</view>
		<!-- @lower="lower" -->
		<YList :data="data" :isMore="isMore"  scrollClass="scroll-class2">
			<view v-for="(item,index) in data" :key="index">
				<order-item :item="item" @change="handleShow"></order-item>
			</view>
		</YList>
		<!-- <view class="default-empty" v-if="data.length===0">
			<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
			</image>
			<view class="">暂无数据</view>
		</view> -->
		<!-- 订单评价 -->
		<popup-eval ref="popupEval" @change="search" />
	</view>
</template>

<script>
	import OrderItem from './order-item.vue'
	import mixin from '@/mixin.js'
	import PopupEval from '../components/PopupEval/PopupEval.vue'
	export default {
		components: {
			OrderItem,
			PopupEval
		},
		mixins: [mixin],
		data() {
			return {
				active: 1,
				data: [],
				activeList: []
			}
		},
		computed: {},
		created() {

		},
		mounted() {
			this.onLaunch().then(res => {
				this.search()
			})

		},

		methods: {
			/**
			 * @function Tab切换方法
			 * @param {Object} val
			 */
			handleTab(val) {
				this.active = val
				this.data = this.activeList[val] || []
				this.queryParams.pages = 1
				this.search()
			},
			/**
			 * @function 打开评价评分方法
			 * @param {Object} item
			 */
			handleShow(item) {
				let isCheck = false
				if (item.isEvaluation) {
					isCheck = true
				}
				this.$refs.popupEval.handleShow({
					...item,
					isCheck
				})
			},
			// 模拟请求数据
			async search() {
				const self = this
				return new Promise(async (resolve, reject) => {
					let data = []
					const {
						getOrder,
						getOrderConsume,
						getOrderInvest
					} = self.$http['mine']
					let res;
					const active = self.active
					if (self.active == 1) {
						res = await getOrder(self.queryParams)
					} else if (self.active == 2) {
						res = await getOrderConsume(self.queryParams)
					} else if (self.active == 3) {
						res = await getOrderInvest(self.queryParams)
					}
					if (res.code == 200) {
						console.log(self.active, active);
						if (self.active != active) {
							return false
						}
						res.data.forEach(item => {
							if (self.active == 1) {
								if (item.wxFtbOrderVO) {
									data.push({
										...item.wxFtbOrderVO,
										type: 'invest'
									})
								} else {
									data.push({
										...item.wxOrderVO,
										coverImage: self.$url + item.wxOrderVO.coverImage,
										type: 'consume'
									})
								}
							} else {
								data.push({
									...item,
									coverImage: self.$url + item.coverImage,
									type: self.active == 2 ? 'consume' : 'invest'
								})
							}
						})
						
						let tempList = self.data
						if (self.queryParams.pages == 1) {
							tempList = data
						} else {
							tempList = tempList.concat(data)
						}
						self.queryParams.total = res.data.total
						self.activeList[active] = tempList
						self.data = tempList
						self.$forceUpdate()
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.order {
		// min-height: 100vh;
		// padding-bottom:32rpx ;
		background: #EEF1FA;
		box-sizing: border-box;

		&-tab {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0rpx 32rpx 0rpx 32rpx;

			&-item {
				padding: 30rpx;
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
					margin-left: -24rpx;
					width: 24rpx;
					height: 4rpx;
					background: #DE501F;
					border-radius: 3rpx;
				}
			}
		}
	}
</style>
