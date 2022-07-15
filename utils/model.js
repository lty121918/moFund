class Model {
	constructor() {}
	/**
	 * @description 原生模态框
	 * @param {string} [title='温馨提示'] 标题
	 * @param {*} content 内容
	 * @param {*} confirmCallback
	 * @param {boolean} [showCancel=false]
	 * @param {*} cancelCallback
	 * @param {string} [confirmText='确定']
	 * @param {string} [cancelText='取消']
	 * @param {string} [confirmColor='#3cc51f']
	 * @param {string} [cancelColor='#000000']
	 * @memberof Util
	 */
	showMsgModal(val) {
		
		const {
			confirmCallback,
			cancelCallback
		} = val
		val.title = val.title || '温馨提示';
		val.content = val.content || '返回有误';
		val.showCancel = val.showCancel || false
		val.confirmText = val.confirmText || "确定"
		val.cancelText = val.cancelText || "取消"
		val.confirmColor = val.confirmColor || "#D40000"
		val.cancelColor = val.cancelColor || "#666666"
		uni.showModal({
			...val,
			success(res) {
				if (res.confirm) {
					if (typeof confirmCallback == "function") {
						confirmCallback();
					}
				} else if (res.cancel) {
					if (typeof cancelCallback == "function") {
						cancelCallback();
					}
				}
			},
			fail(err) {
				console.log(err.errMsg);
			}
		});
	}

	/**
	 * @description 封装uni.showToast
	 * @param {*} title
	 * @param {number} [duration=1500]
	 * @param {string} [icon='none']
	 * @param {boolean} [mask=true]
	 * @param {*} successCallback
	 * @param {*} image
	 * @param {*} failCallback
	 * @memberof Util
	 */
	showToast(
		title,
		duration = 1500,
		icon = "none",
		mask = true,
		successCallback,
		image,
		failCallback
	) {
		uni.showToast({
			title,
			icon,
			duration,
			mask,
			image,
			success() {
				if (typeof successCallback == "function") {
					setTimeout(() => {
						successCallback();
					}, duration);
				}
			},
			fail() {
				if (typeof failCallback == "function") {
					failCallback();
				}
			}
		});
	}

	/**
	 * @description 封装 uni.hideToast
	 * @memberof Util
	 */
	hideToast() {
		uni.hideToast();
	}

	/**
	 * @description 隐藏自定义loading
	 * @param {*} page 页面Page类
	 * @memberof Util
	 */
	hideLoading(page) {
		try {
			page.loading.hide();
		} catch (error) {
			page.loading = page.selectComponent("#loading");
			this.hideLoading(page);
		}
	}

	/**
	 * @description 显示自定义loading
	 * @param {*} page 页面Page类
	 * @memberof Util
	 */
	showLoading(page) {
		try {
			// page.loading.show();
			uni.showLoading({
				title: 'Loading...',
			})
		} catch (error) {
			// page.loading = page.selectComponent("#loading");
			this.showLoading(page);
		}
	}
	/**
	 * @description 提示语
	 * @param {*} date 日期格式
	 * @returns 2019-06-19 00:00
	 * @memberof Util
	 */
	tip(msg) {
		uni.showToast({
			icon: 'none',
			title: msg
		})
	}
}
export default Model
