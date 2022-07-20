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
			
			this.$nextTick(()=>{
				setTimeout(()=>{
					let ref = this.$refs['index'] || this.$refs['class']
					console.log(ref);
					ref&&ref.getMounted()
				},800)
			})
		},
		computed: {
		},
		created() {
			// 初次进入获取地理位置
			this.getLocation()
			if(this.city.length==0){
				this.$http['common'].getlocation().then(res=>{
					if(res.code==200){
						this.SET_STORAGE({
							str: 'city',
							data:res.data
						})
					}
				})
			}
			
		},
		methods: {}
	}
</script>
