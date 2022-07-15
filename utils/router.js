/**
 * 页面路由
 * @date 2020年12月15日
 */

class Router {
	constructor() {}

	/**
	 * @description 页面跳转
	 * @date 2019年06月19日
	 * @param {*} url 跳转链接
	 * @memberof Router
	 */
	navTo(url, row = {}) {
		let str = ``;
		for (let item in row) {
			str += `${item}=${row[item]}&`;
		}
		console.log('navTo', str);
		uni.navigateTo({
			url: `${url}?${str}`
		})
	}
	/**
	 *  @description 返回上一级 并且修改上一级页面的数据
	 */
	navBackData(row = {}, delta) {
		delta = delta == undefined ? 1 : delta;
		let pages = getCurrentPages(); //获取跳转的所有页面
		let nowPage = pages[pages.length - 1]; //当前页
		let prevPage = pages[pages.length - 2]; //上一页
		prevPage.$vm //上一页的this
		for (let item in row) {
			prevPage.$vm[item] = row[item]
		}
		uni.navigateBack({
		 delta
		}); //这个是返回上级第一个页面， delta等于2的时候跳过上个页面返回再上一个页面
	}
	/**
	 * @description 关闭当前页跳转
	 * @date 2019年06月19日
	 * @param {*} url 跳转链接
	 * @memberof Router
	 */
	redTo(url, row = {}) {
		let str = ``;
		for (let item in row) {
			str += `${item}=${row[item]}&`;
		}
		uni.redirectTo({
			url: `${url}?${str}`
		})
	}

	/**
	 * @description 关闭所有页面跳转
	 * @date 2019年06月19日
	 * @param {*} url 跳转链接
	 * @memberof Router
	 */
	relTo(url, row = {}) {
		let str = ``;
		for (let item in row) {
			str += `${item}=${row[item]}&`;
		}
		console.log(str);
		uni.reLaunch({
			url: `${url}?${str}`
		})
	}

	/**
	 * @description 返回
	 * @date 2019年06月19日
	 * @param {*} delta 要返回的层数
	 * @memberof Router
	 */
	navBack(delta) {
		delta = delta == undefined ? 1 : delta;
		uni.navigateBack({
			delta
		})
	}
	/**
	 * @description 返回上层并刷新
	 * @date 2019年08月09日
	 * @param {*} delta 要返回的层数
	 * getData:返回页面的刷新方法
	 * @memberof Router
	 */
	navBackRefesh(delta) {
		delta = delta == undefined ? 1 : delta;
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - (delta + 1)];
		prevPage.getData();
		wx.navigateBack({
			delta: delta
		})

	}
	/**
	 * @description 页面跳转
	 * @date 2019年06月19日
	 * @param {*} url 跳转链接
	 * @memberof Router
	 */
	swtTo(url) {
		wx.switchTab({
			url
		})
	}
	other(url, id, envVersion = 'release') {
		console.log(url);
		uni.navigateToMiniProgram({
			appId: id,
			path: url,
			envVersion: envVersion,
			success: res => {
				// 打开成功
				console.log("打开成功", res);
			},
			fail: err => {
				console.log(err);
			}
		});
	}
}
export default Router
