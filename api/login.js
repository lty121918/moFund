
import { post,get } from './http/index'
import apis from '@/apis'

export const login = params => {
	return post(apis._auth_wx_login, params)
}
// 退出登录
export const authLogout = params => post(apis._auth_logout, params)

// 首登修改密码
export const updPwd = data => {
	return new Promise((resolve, reject) => {
		uni.request({
			method:'POST',
			url: `${apis._account_relative_update_pwd}`, 
			data: data,
			header: {
				'Authorization': 'Bearer ' + data.accessToken,
				// 'content-type': 'application/x-www-form-urlencoded'
			},
			complete: () => {},
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

// 获取路由权限
export const menuTree = params => get(apis._account_relative_auth_menu_tree_platform)

