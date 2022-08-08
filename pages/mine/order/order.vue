<template>
	<view class="order">
		<view class="order-tab">
			<view class="order-tab-item" @click="handleTab(1)" :class="[active==1?'order-tab-active':'']">全部订单</view>
			<view class="order-tab-item" @click="handleTab(2)" :class="[active==2?'order-tab-active':'']">消费订单</view>
			<view class="order-tab-item" @click="handleTab(3)" :class="[active==3?'order-tab-active':'']">充值订单</view>
		</view>
		<view v-for="(item,index) in data" :key="index">
			<order-item :item="item" @change="handleShow"></order-item>
		</view>
		<view class="default-empty" v-if="data.length===0">
			<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
			</image>
			<view class="">暂无数据</view>
		</view>
		<!-- 订单评价 -->
		<popup-eval ref="popupEval" @change="search"/>
	</view>
</template>

<script>
	import OrderItem from './order-item.vue'
	import PopupEval from '../components/PopupEval/PopupEval.vue'
	export default {
		components: {
			OrderItem,
			PopupEval
		},
		data() {
			return {
				active: 1,
				data: []
			}
		},
		computed: {},
		created() {

		},
		mounted() {
			this.search()
		},
		methods: {
			/**
			 * @function Tab切换方法
			 * @param {Object} val
			 */
			handleTab(val) {
				this.active = val
				this.search()
			},
			/**
			 * @function 打开评价评分方法
			 * @param {Object} item
			 */
			handleShow(item) {
				let isCheck = false
				if(item.isEvaluation){
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
				let data = []
				const {
					getOrder,
					getOrderConsume,
					getOrderInvest
				} = self.$http['mine']
				let res;
				if (self.active == 1) {
					res = await getOrder()
				} else if (self.active == 2) {
					res = await getOrderConsume()
				} else if (self.active == 3) {
					res = await getOrderInvest()
				}
				if (res.code == 200) {

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
									coverImages : item.coverImage,
									coverImage: self.$url + item.wxOrderVO.coverImage,
									type: 'consume'
								})
							}
						} else {
							data.push({
								...item,
								coverImage: self.$url + item.coverImage,
								coverImages : item.coverImage,
								type: self.active == 2 ? 'consume' : 'invest'
							})
						}
					})
					this.data = data
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.order {
		min-height: 100vh;
		padding-bottom:32rpx ;
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
