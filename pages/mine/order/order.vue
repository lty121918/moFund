<template>
	<view class="order">
		<view class="order-tab">
			<view class="order-tab-item" @click="handleTab(1)" :class="[active==1?'order-tab-active':'']">全部订单</view>
			<view class="order-tab-item" @click="handleTab(2)" :class="[active==2?'order-tab-active':'']">消费订单</view>
			<view class="order-tab-item" @click="handleTab(3)" :class="[active==3?'order-tab-active':'']">充值订单</view>
		</view>
		<y-list ref="yList" scrollClass="order-scroll" :setData="search">
			<template slot-scope="{data}">
				<view v-for="(item,index) in data" :key="index">
					<order-item @change="handleShow"></order-item>
				</view>

			</template>
		</y-list>
		
		<!-- 订单评价 -->
		<popup-eval ref="popupEval"/>
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
			}
		},
		computed: {},
		created() {

		},
		mounted() {
			this.$refs.yList.init()
		},
		methods: {
			/**
			 * @function Tab切换方法
			 * @param {Object} val
			 */
			handleTab(val) {
				this.active = val
			},
			/**
			 * @function 打开评价评分方法
			 * @param {Object} item
			 */
			handleShow(item) {
				this.$refs.popupEval.handleShow(item)
			},
			// 模拟请求数据
			search() {
				return new Promise(async (resolve, reject) => {
					let data = []
					for (let i = 0; i < 100; i++) {
						data.push({})
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
	.order-scroll {
		height: calc(100vh - 49px);
	}
</style>
<style lang="scss" scoped>
	.order {
		min-height: 100vh;
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
