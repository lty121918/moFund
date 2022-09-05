<script>
	// import mixin from '@/mixin.js'
	const _locationChangeFn = function(res) {
		console.log('location change', res)
	}
	export default {
		// mixins: [mixin],
		onShow: function(options) {
		
		},
		onLaunch: function(options) {
			// this.onLaunch(options)

		},
		
		onHide: function() {
			// wx.offLocationChange(_locationChangeFn)
			console.log('App Hide')
		},
		methods: {
			
		}
	}
</script>

<style>
	@import "./index.scss";
	/*每个页面公共css */
</style>
