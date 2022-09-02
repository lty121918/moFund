<template>
	<view class="class">
		<view v-if="isTeach==1">
			<view v-for="item in dataList" :key="item.campusName">
				<!-- 教师端 -->
				<view class="home-title">
					<view class="home-title-item">
						<image class="home-title-img" src="/static/home/icon.png" mode="aspectFill"></image>
						<text>{{item.campusName}}</text>
					</view>
					<view class="class-title">
						<view class="class-title-item">
							<text>待开课: </text>
							<text class="color pl12">{{item.wait}}</text>
						</view>
						<view class="">
							<text>进行中: </text>
							<text class="color pl12">{{item.conduct}}</text>
						</view>
					</view>
				</view>
				<!-- 教师端 end-->
				<view v-for="row in item.classWxPageVOList" :key="row.classId">
					<class-item :data="row" :classStatus="classStatus" :isTeach="isTeach"></class-item>
				</view>

			</view>

		</view>
		<view v-if="isTeach==2">
			<view v-for="(item,index) in data" :key="index">
				<class-item :data="item" :classStatus="classStatus" :isTeach="isTeach"></class-item>
			</view>
		</view>
		<view class="default-empty" v-if="(isTeach==2&& data.length===0) || isTeach==1&& dataList.length===0">
			<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
			</image>
			<view class="">暂无数据</view>
		</view>
		<page-tabpars></page-tabpars>
	</view>
</template>

<script>
	import ClassItem from '@/components/ClassItem/ClassItem.vue'
	import mixin from '@/mixin.js'
	import bus from '@/utils/bus.js'
	import {
		debounce
	} from "@/utils/lodash.js";
	export default {
		mixins: [mixin],
		components: {
			ClassItem
		},
		data() {
			return {
				data: [],
				dataList: []
			}
		},

		computed: {},
		onShow() {
			this.getMounted()
		},
		created() {
			bus.$on('getMounted2', () => {
				console.log('执行');
				this.getTeach()
				this.getMounted()
			})
		},
		// 分享给朋友
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '班级',
				path: `${this.$page.Class}`
			}
		},
		onShareTimeline(res) { //分享到朋友圈
			return {
				title: '班级',
				path: `${this.$page.Class}` //分享默认打开是小程序首页
			}
		},
		methods: {
			getMounted: debounce(function() {
				uni.setNavigationBarTitle({
					title: '班级'
				})
				this.search({
					isTeach: this.isTeach
				})
			}),
			// 模拟请求数据
			search(val) {
				const date1 = new Date().getTime()
				const self = this
				console.log('class请求');
				const {
					getClassStudentPage,
					getClassList
				} = self.$http['classes']
				let getData = getClassList
				if (val.isTeach == 1) {
					getData = getClassStudentPage
				}
				getData({
					...val
				}).then(res => {
					let data = []
					if (res.code == 200) {
						data = res.data || []
						let list = []
						if (val.isTeach == 1) {
							data.forEach(item => {
								item.classWxPageVOList = item.classWxPageVOList || []
								item['wait'] = 0
								item['conduct'] = 0
								item.classWxPageVOList.forEach(row => {
									row = self.setItem(row)
								})
								const wait = item.classWxPageVOList.filter(ls => ls.classStatus == 1)
								const conduct = item.classWxPageVOList.filter(ls => ls.classStatus == 3)
								item['wait'] = wait.length
								item['conduct'] = conduct.length

							})
							this.dataList = data
						} else {
							// data = data.filter(item => item.classStatus == 0 || item.classStatus ==
							// 	1 || item.classStatus == 3)
							data.forEach(item => {
								item = self.setItem(item)
							})
							this.data = data
						}


						const date2 = new Date().getTime()
						console.log(`执行时间:${(date2-date1)/1000}秒`);
					}


				})
			},
			setItem(item) {
				const self = this
				if (item.coverImage.indexOf('http') == -1) {
					item.coverImage = self.$url + item.coverImage
				}
				item.startPeriod = self.$utils.dateTime.getLocalTime(
					`2022-01-01 ${item.startPeriod}`, 'hh:mm')
				item.endPeriod = self.$utils.dateTime.getLocalTime(
					`2022-01-01 ${item.endPeriod}`,
					'hh:mm')
				item['weekCodeName'] = self.$utils.dateTime.filteDay(item.weekCode)
				if (item.classStatus != 0 && item.classStatus != 1 && item.classStatus !=3) {
					item.nextCLassTime = -1
				}
				if (item.nextCLassTime && item.nextCLassTime != -1) {
					item.nextCLassTime = self.$utils.dateTime.getLocalTime(
						item.nextCLassTime,
						'yyyy-MM-dd hh:mm')
				}
				return item
			}

		},
	}
</script>

<style lang="scss" scoped>
	.class {
		padding: 32rpx 0;
		min-height: 100vh;
		box-sizing: border-box;
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
		padding-top: 0;
	}
</style>
