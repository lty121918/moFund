<template>
	<view class="class">

		<y-list ref="yList" :setData="search">
			<template slot-scope="{data}">
				<view v-for="(item,index) in data" :key="index">
					<class-item :data="item" :classStatus="classStatus" :isTeach="isTeach"></class-item>
				</view>
			</template>
		</y-list>
	</view>
</template>

<script>
	import ClassItem from '@/components/ClassItem/ClassItem.vue'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		components: {
			ClassItem
		},
		data() {
			return {}
		},
		computed: {
		},
		onShow() {
			setTimeout(()=>{
				this.$refs.yList.init()
			},300)
		},
		created() {
			
		},
		mounted() {
		},
		methods: {
			// 模拟请求数据
			search(val) {
				const self = this
				console.log('class请求');
				return new Promise(async (resolve, reject) => {
					self.$http['classes'].getClassList({
						...val
					}).then(res => {
						let data = []
						if (res.code == 200) {
							data = res.data || []
						}
						resolve({
							data,
							totalRows: 10
						})
					})

				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.class {
		min-height: 100vh;
		background: #EEF1FA;

		&-title {
			display: flex;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #141D3D;

			&-item {
				margin-right: 40rpx;
			}
		}
	}

	.home-title {
		padding-bottom: 0;
	}
</style>
