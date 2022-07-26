<template>
	<view>
		<index ref="index" v-if="isTeach==2" />
		<class ref="calss" v-if="isTeach==1" />
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

			this.$nextTick(() => {
				setTimeout(() => {
					let ref = this.$refs['index'] || this.$refs['class']
					console.log(ref);
					ref && ref.getMounted()
				}, 800)
			})
		},
		computed: {},
		created() {
			// 初次进入获取地理位置
			const Authorization = this.$utils.util.getCache('Authorization');
			if (Authorization) {
				this.getLocation()
			}
		},
		methods: {}
	}
</script>
