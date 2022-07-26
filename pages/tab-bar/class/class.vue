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
				<!-- 	班级状态 0：拼班中 1：待开课(拼班完成) 2：拼班未成功 3：开班中 
				4：解散（到期结课）5：解散（团长解散）、6：解散（人数不足） -->
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
			const active = 'class'
			if (this.active !== active) {
				this.SET_ACTIVE(active)
			}
			uni.setNavigationBarTitle({
				title: '班级'
			})
			this.getTeach()
		},
		created() {
			
		},
		mounted() {
		},
		methods: {
			getMounted(){
				setTimeout(()=>{
					this.$refs.yList.init()
				},300)
			},
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
							data = res.data || []
							data = data.filter(item=>item.classStatus==0 || item.classStatus==1)
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
