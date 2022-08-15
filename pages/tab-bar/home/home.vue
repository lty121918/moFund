<template>
	<view>
		<index ref="homeIndex" v-if="isTeach==2" />
		<class ref="calsses" v-if="isTeach==1" />
		<view class="home-official" :style="{'bottom':isIphoneX?`calc(50px + ${safeAreaHeight}px)`:'50px' }">
			<official-account></official-account>
		</view>
	</view>
</template>

<script>
	import Index from './index.vue'
	import Class from '../class/class.vue'
	import mixin from '@/mixin.js'
	import bus from '@/utils/bus.js'
	export default {
		mixins: [mixin],
		components: {
			Index,
			Class
		},
		data() {
			return {
				isShow: true
			}
		},
	
		computed: {},
		created() {
			// 初次进入获取地理位置 增加判断如果没有Authorization 不去执行 
			const Authorization = this.$utils.util.getCache('Authorization');
			if (Authorization) {
				this.getLocation(false)
			}
		},
		methods: {
			Ginit() {
				console.log('2deeeeeeeeeeeeeeeeeeeeeeeeee');
				this.$nextTick(()=>{
					console.log('教师',this.isTeach);
					if(this.isTeach==1){
						bus.$emit('getMounted2')
					} else if(this.isTeach==2){
						bus.$emit('getMounted')
					}
					
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.home-official{
		position: fixed;
		z-index: 999;
		left: 0;
		width: 100%;
	}
</style>
