<template>
	<lb-tabbar ref="tabbar" :value="active">
		<lb-tabbar-item v-for="item in tabbars" :key="item.name" :name="item.name"
			:icon="item.name==active?item.iconActive:item.icon" :info="item.info" :raisede="item.raisede"
			icon-prefix="iconfont" @click="handleTabbarItemClick">
			{{ item.text }}
		</lb-tabbar-item>
	</lb-tabbar>
</template>

<script>
	import lbTabbar from '@/components/OneTabbar/OneTabbar.vue'
	import lbTabbarItem from '@/components/OneTabbar/OneTabbarItem.vue'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			lbTabbar,
			lbTabbarItem
		},
		data() {
			return {
				active:'home'
			}
		},
		watch: {
			$route: {
				immediate: true,
				handler(to) {
					let tabbars = this.$store.state.tabbars
					let routes = getCurrentPages() //获取当前页面栈
					let curRoute = routes[routes.length - 1].route //获取当前页面的路由
					const list = tabbars.filter(item => {
						return `/${curRoute}` == item.path
					})
					let isTeach = this.teach
					if(list.length>0){
						this.active = list[0].name
						// if (isTeach == 1 && list[0].name=='home') {
						// 	this.active = 'class'
						// } else {
						// 	this.active = list[0].name
						// }
					}
				}
			},
			// teach(newVal){
			// 	if (newVal == 1) {
			// 		this.active = 'class'
			// 	} else {
			// 		this.active = 'home'
			// 	}
			// },
		},
		computed: {
			...mapGetters([ 'animate', 'teach']),

			tabbars() {
				let isTeach = this.teach
				let tabbars = this.$store.state.tabbars
				console.log('tabbars 1是2否 教练', isTeach);
				if (isTeach == 2) {
					return tabbars
				} else {
					const list = tabbars.filter(item => {
						return ['class', 'mine'].indexOf(item.name) > -1
					})
					console.log(list);
					return list
				}
			}
		},
	
		created() {
			this.SET_STORAGE({
				str: 'active',
				type: 'string'
			})
		},
		methods: {
			...mapMutations(['SET_ACTIVE', 'SET_STORAGE']),
			handleTabbarItemClick(e) {
				console.log('click::', e)
				const name = e.name
				// this.SET_ACTIVE(name)
				this.SET_STORAGE({
					data: name,
					str: 'active',
					type: 'string'
				})
				const tabbar = this.tabbars.find(item => item.name === name)
				uni.switchTab({
					url: tabbar.path,
					success: () => {
						// 切换后重新设置，因为不在在触发页面的created生命周期
						// this.SET_ACTIVE(name)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
