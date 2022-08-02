<template>
	<view class="class">
		<view v-if="isTeach==1">
			<view v-for="item in data" :key="item.campusName">
				<!-- 教师端 -->
				<view class="home-title">
					<view class="home-title-item">
						<image class="home-title-img" src="/static/home/icon.png" mode="aspectFit"></image>
						<text>{{item.campusName}}</text>
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
		<view class="default-empty" v-if="data.length===0">
			<image class="default-empty-image" :src="require('@/static/notData.png')" mode="widthFix">
			</image>
			<view class="">暂无数据</view>
		</view>
		<page-tabpars></page-tabpars>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
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
			}
		},
		
		computed: {
			...mapGetters(['active']),
		},
		onShow() {
			this.getMounted()
		},
		created() {
			bus.$on('getMounted2',()=>{
				console.log('执行');
				this.getTeach()
				this.getMounted()
			})
		},
		methods: {
			getMounted:debounce(function() {
				const active = 'class'
				if (this.active !== active) {
					this.SET_ACTIVE(active)
				}
				uni.setNavigationBarTitle({
					title: '班级'
				})
				
				this.search({
					isTeach: this.isTeach
				})
			}),
			...mapMutations(['SET_ACTIVE']),
			// 模拟请求数据
			search(val) {
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
							data.classWxPageVOList = data.classWxPageVOList || []
							list = data.classWxPageVOList
						} else {
							data = data.filter(item => item.classStatus == 0 || item.classStatus ==
								1 || item.classStatus == 3)
							list = data

						}
						list.forEach(item => {
							item.coverImage = self.url + item.coverImages
							item.startPeriod = self.$utils.dateTime.getLocalTime(
								`2022-01-01 ${item.startPeriod}`, 'hh:mm')
							item.endPeriod = self.$utils.dateTime.getLocalTime(
								`2022-01-01 ${item.endPeriod}`,
								'hh:mm')
							item['weekCodeName'] = self.$utils.dateTime.filteDay(item.weekCode)
							if (item.nextCLassTime) {
								item.nextCLassTime = self.$utils.dateTime.getLocalTime(
									item.nextCLassTime,
									'yyyy-MM-dd hh:mm')
							}
						})
						if (val.isTeach == 1) {
							data.classWxPageVOList = list
						} else {
							data = list

						}
						this.data = data

					}


				})
			},

		}
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
		padding-bottom: 0;
	}
</style>
