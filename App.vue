<script>
	const _locationChangeFn = function(res) {
		console.log('location change', res)
	}
	export default {
		onLaunch: function() {
			wx.onLocationChange(_locationChangeFn)

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			wx.offLocationChange(_locationChangeFn)
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "./index.scss";
	/*每个页面公共css */
</style>
