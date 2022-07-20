import CONFIG from "../config/config";
class UserInfo {
	constructor() {}
	/**
	 * @description 获取用户信息
	 * @param {function} callback 成功回调
	 * @memberof Util
	 */
	getSystemInfo(callback) {
		uni.getSystemInfo({
			success(res) {
				callback(res);
			},
			fail(err) {
				console.error(err);
			}
		});
	}
	/**
	 * @description 设置缓存
	 * @param {*} key 缓存名称
	 * @param {*} val 缓存值
	 * @memberof Util
	 */
	setCache(key, val) {
		uni.setStorageSync(CONFIG.CACHE_PREFIX + key, val);
	}
	/**
	 * 重新登录
	 */
	login(msg = '重新登录') {
		uni.redirectTo({
			url: '/pages/login/login'
		});
		this.setCache('Authorization', '');
		this.setCache('login', false);
		setTimeout(function() {
			// this.showMsgModal('温馨提示', msg);
		}, 300)
	}
	// 监听网络状态
	getNetwork() {
		return new Promise((resolve) => {
			uni.getNetworkType({
				success: function(res) {
					console.log(res.networkType);
					resolve(res.networkType)
				}
			});
		})
	}
}
export default UserInfo
