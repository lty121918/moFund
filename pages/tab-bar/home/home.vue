<template>
	<view>
		<index v-if="isTeach==2"/>
		<class v-if="isTeach==1"/>
	</view>
</template>

<script>
	import Index from './index.vue'
	import Class from '../class/class.vue'
	import mixin from '@/mixin.js'
	export default {
		mixins: [mixin],
		components:{Index,Class},
		data() {
			return {}
		},
		onShow() {
			console.log(this.community);
		},
		computed: {},
		created() {},
		methods: {}
	}
</script>
