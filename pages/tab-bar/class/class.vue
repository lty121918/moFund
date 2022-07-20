<template>
	<view class="class">

		<y-list ref="yList" :setData="search">
			<template slot-scope="{data}">
				<!-- 教师端 -->
				<view class="home-title" v-if="isTeach==1">
					<view class="home-title-item">
						<image class="home-title-img" src="/static/home/icon.png" mode="aspectFit"></image>
						<text>热门活动</text>
					</view>
					<view class="class-title">
						<view class="class-title-item">
							<text>待开课: </text>
							<text class="color pl12">0</text>
						</view>
						<view class="">
							<text>进行中: </text>
							<text class="color pl12">1</text>
						</view>
					</view>
				</view>
				<!-- 教师端 end-->
				<view v-for="(item,index) in data" :key="index">
					<class-item :data="item"></class-item>
				</view>
			</template>
		</y-list>
		<page-tabpars></page-tabpars>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import ClassItem from './class-item.vue'
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
			...mapGetters(['active']),
		},
		onShow() {
			this.getMounted()
		},
		created() {
			const active = 'class'
			if (this.active !== active) {
				this.SET_ACTIVE(active)
			}
			uni.setNavigationBarTitle({
				title: '班级'
			})
			this.getTeach()

		},
		mounted() {
		},
		methods: {
			getMounted(){this.$refs.yList.init()},
			...mapMutations(['SET_ACTIVE']),
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
							res.data.forEach(item=>{
								data.push(item)
							})
								
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
