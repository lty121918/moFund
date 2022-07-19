<template>
	<view>
		<index ref="index" v-if="isTeach==2" />
		<class  ref="calss" v-if="isTeach==1" />
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
			this.$nextTick(()=>{
				let ref = this.$refs['index'] || this.$refs['class']
				console.log(ref);
				ref.getMounted()
			})
		},
		computed: {
		},
		created() {
			// 初次进入获取地理位置
			const self = this
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					self.SET_STORAGE({
						data: {
							latitude: res.latitude,
							longitude: res.longitude
						},
						str:'location'
					})
				},
				fail: function(e) {
					console.log(e);
				}
			});
		},
		methods: {}
	}
</script>
