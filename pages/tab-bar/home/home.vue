<template>
	<view>
		<index ref="index" v-if="isTeach==2" />
		<class ref="calsses" v-if="isTeach==1" />
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
			return {}
		},
		onShow() {
			// 为了处理切换会员端和教师端 会有一闪而过的卡顿
			this.$nextTick(() => {
				setTimeout(() => {
					let ref = this.$refs['index'] || this.$refs['calsses']
					console.log('ref',ref);
					// 调用两个组件里面预留的方法
					ref && ref.getMounted()
				}, 800)
			})
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
