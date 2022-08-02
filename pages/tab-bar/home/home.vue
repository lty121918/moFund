<template>
	<view>
		<index ref="index" :num="num" v-show="isTeach==2" />
		<class ref="calsses" :num="num2" v-show="isTeach==1" />
	</view>
</template>

<script>
	import Index from './index.vue'
	import Class from '../class/class.vue'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		components: {
			Index,
			Class
		},
		data() {
			return {
				num:0,
				num2:0
			}
		},
		onShow() {
			if(this.isTeach==2){
				this.num++
			} else {
				this.num2++
			}
			// 为了处理切换会员端和教师端 会有一闪而过的卡顿
			
		},
		computed: {},
		created() {
			// 初次进入获取地理位置 增加判断如果没有Authorization 不去执行 
			const Authorization = this.$utils.util.getCache('Authorization');
			if (Authorization) {
				this.getLocation()
			}
		},
		methods: {}
	}
</script>
